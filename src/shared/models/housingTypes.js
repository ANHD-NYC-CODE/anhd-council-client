import moment from 'moment'

import {
  rentRegulatedProgramOptions,
  dateComparisonOptions,
  amountComparisonOptions,
} from 'shared/utilities/filterUtils'
import ParamSet from 'shared/classes/ParamSet'
import ParamMap from 'shared/classes/ParamMap'

import MultiTypeFieldGroup from 'AdvancedSearch/FilterComponent/Group/MultiTypeFieldGroup'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import ComparisonFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/ComparisonFieldSet'

import DateField from 'AdvancedSearch/FilterComponent/Field/DateField'
import IntegerField from 'AdvancedSearch/FilterComponent/Field/IntegerField'

import MultiSelectField from 'AdvancedSearch/FilterComponent/Field/MultiSelectField'
1
import { getApiMap } from 'shared/utilities/classUtils'

export const ALLTYPES = databaseObject => ({
  apiMap: getApiMap('ALL_TYPES'),
  id: 'ALL_TYPES',
  schema: {},
})

export const RENTSTABILIZED = databaseObject => ({
  apiMap: getApiMap('RENT_STABILIZED'),
  id: 'RENT_STABILIZED',
  schema: {
    rsunitslost: new ParamSet({
      component: MultiTypeFieldGroup,
      label: 'Units Lost',
      createType: 'ALL_RANGE_ONE',
      defaults: [
        new ParamMap({
          component: ComparisonFieldSet,
          baseComponent: IntegerField,
          type: 'PERCENT',
          role: 'PRIMARY',
          paramNoun: 'units lost',
          valueSuffix: '%',
          validations: {
            min: 0,
            max: 100,
          },
          field: 'rsunitslost',
          comparison: 'gte',
          value: '25',
        }),
        new ParamMap({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          type: 'YEAR',
          role: 'LIMITER',
          props: {
            type: 'number',
          },
          validations: {
            min: 2007,
            max: (databaseObject || {}).version,
          },
          rangeKey: 'rsUnitsRange',
          rangePosition: 1,
          defaultOptions: dateComparisonOptions({
            comparisonValues: ['start', 'between'],
            labels: ['After', 'Range'],
            type: 'DATE',
            rangeKey: 'rsUnitsRange',
          }),
          field: 'rsunitslost',
          comparison: 'start',
          value: '2010',
        }),
        new ParamMap({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          type: 'YEAR',
          role: 'LIMITER',
          paramNoun: 'units',
          props: {
            type: 'number',
          },
          validations: {
            min: 2007,
            max: (databaseObject || {}).version,
          },
          rangeKey: 'rsUnitsRange',
          rangePosition: 2,
          defaultOptions: dateComparisonOptions({
            comparisonValues: ['start', 'between'],
            labels: ['After', 'Range'],
            type: 'DATE',
            rangeKey: 'rsUnitsRange',
          }),
          field: 'rsunitslost',
          comparison: 'end',
          value: '2017',
        }),
      ],
    }),
  },
})

export const RENTREGULATED = databaseObject => ({
  apiMap: getApiMap('RENT_REGULATED'),
  id: 'RENT_REGULATED',

  schema: {
    coresubsidyrecord__programname: new ParamSet({
      component: MultiTypeFieldGroup,
      label: 'Program',
      createType: 'ONE',
      defaults: [
        new ParamMap({
          defaultOptions: rentRegulatedProgramOptions(),
          component: GenericFieldSet,
          baseComponent: MultiSelectField,
          type: 'MULTI-TEXT',
          role: '',
          paramNoun: 'program(s)',
          field: 'coresubsidyrecord__programname',
          comparison: 'any',
          value: '',
        }),
      ],
    }),

    coresubsidyrecord__enddate: new ParamSet({
      component: MultiTypeFieldGroup,
      label: 'Expiration',
      createType: 'ONE',
      defaults: [
        new ParamMap({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          type: 'DATE',
          role: '',
          valuePrefix: 'expiring',
          props: {
            type: 'date',
          },
          defaultOptions: dateComparisonOptions({
            comparisonValues: ['lte', 'between', 'gte'],
            labels: ['Before', 'Range', 'After'],
            type: 'DATE',
            rangeKey: 'expirationRangeKey',
          }),
          rangeKey: 'expirationRangeKey',
          rangePosition: 1,
          field: 'coresubsidyrecord__enddate',
          comparison: 'lte',
          value: moment(moment.now())
            .add(1, 'Y')
            .format('YYYY-MM-DD'),
        }),
        new ParamMap({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          type: 'DATE',
          role: '',
          valuePrefix: 'expiring',
          props: {
            type: 'date',
          },
          defaultOptions: dateComparisonOptions({
            comparisonValues: ['lte', 'between', 'gte'],
            labels: ['Before', 'Range', 'After'],
            type: 'DATE',
            rangeKey: 'expirationRangeKey',
          }),
          rangeKey: 'expirationRangeKey',
          rangePosition: 2,
          field: 'coresubsidyrecord__enddate',
          comparison: 'gte',
          value: moment(moment.now()).format('YYYY-MM-DD'),
        }),
      ],
    }),
  },
})

export const SMALLHOMES = databaseObject => ({
  apiMap: getApiMap('SMALL_HOMES'),
  id: 'SMALL_HOMES',
  schema: {
    unitsres: new ParamSet({
      component: MultiTypeFieldGroup,
      label: 'Residential Units',
      createType: 'ONE',
      defaults: [
        new ParamMap({
          component: ComparisonFieldSet,
          baseComponent: IntegerField,
          type: 'AMOUNT',
          role: '',
          paramNoun: 'units',
          defaultOptions: amountComparisonOptions({ comparisonValues: ['lte', 'exact'], type: 'INTEGER' }),
          field: 'unitsres',
          comparison: 'lte',
          value: '6',
          validations: {
            min: 1,
            max: 6,
          },
        }),
      ],
    }),
  },
})

export const MARKETRATE = databaseObject => ({
  apiMap: getApiMap('MARKET_RATE'),
  id: 'MARKET_RATE',
  schema: {},
})

export const PUBLICHOUSING = databaseObject => ({
  apiMap: getApiMap('PUBLIC_HOUSING'),
  id: 'PUBLIC_HOUSING',
  schema: {},
})

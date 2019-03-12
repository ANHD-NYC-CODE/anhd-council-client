import moment from 'moment'

import { rentRegulatedProgramOptions, comparisonOptions } from 'shared/utilities/filterUtils'
import { ParameterMapSet } from 'shared/classes/ParameterMapSet'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
import { ApiMap } from 'shared/classes/ApiMap'

import MultiTypeFieldGroup from 'AdvancedSearch/FilterComponent/Group/MultiTypeFieldGroup'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import ComparisonFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/ComparisonFieldSet'

import DateField from 'AdvancedSearch/FilterComponent/Field/DateField'
import IntegerField from 'AdvancedSearch/FilterComponent/Field/IntegerField'

import MultiSelectField from 'AdvancedSearch/FilterComponent/Field/MultiSelectField'
import { LanguageModule } from 'shared/classes/LanguageModule'

export const ALLTYPES = {
  apiMap: new ApiMap({ name: 'All' }),
  id: 'ALL_TYPES',
  schema: {},
}

export const RENTSTABILZED = {
  apiMap: new ApiMap({ name: 'Rent Stabilized', queryName: 'rs' }),
  id: 'RENT_STABILIZED',
  schema: {
    rsunitslost: new ParameterMapSet({
      component: MultiTypeFieldGroup,
      props: {
        label: 'Rent Stabilized Units Lost',
        newButtonLabel: 'Add Units Lost +',
      },
      allowActions: true,
      createType: 'ALL_RANGE_ONE',
      defaults: [
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: IntegerField,
          languageModule: new LanguageModule({
            type: 'AMOUNT',
            noun: 'rent stabilized unit',
            shortNoun: 'rs units',
            propertyAdjective: 'that lost',
            valueSuffix: '%',
          }),
          props: {
            minValue: 0,
            maxValue: 100,
          },
          field: 'rsunitslost',
          comparison: 'gte',
          value: '25',
          type: 'PERCENT',
        }),
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          props: {
            type: 'number',
            minValue: 2007,
          },
          languageModule: new LanguageModule({ type: 'YEAR', noun: '' }),
          rangeKey: 'rsUnitsRange',
          rangePosition: 1,
          defaultOptions: comparisonOptions(['start', 'between'], ['Since', 'Range'], 'DATE', 'rsUnitsRange'),
          field: 'rsunitslost',
          comparison: 'start',
          value: '2010',
        }),
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          languageModule: new LanguageModule({ type: 'YEAR', noun: 'units' }),
          props: {
            type: 'number',
            minValue: 2007,
          },
          rangeKey: 'rsUnitsRange',
          rangePosition: 2,
          defaultOptions: comparisonOptions(['start', 'between'], ['Since', 'Range'], 'DATE', 'rsUnitsRange'),
          field: 'rsunitslost',
          comparison: 'end',
          value: '2017',
        }),
      ],
    }),
  },
}

export const RENTREGULATED = {
  apiMap: new ApiMap({ name: 'Rent Regulated', queryName: 'rr' }),
  id: 'RENT_REGULATED',

  schema: {
    coresubsidyrecord__programname: new ParameterMapSet({
      component: MultiTypeFieldGroup,
      props: {
        label: 'Program Name',
        newButtonLabel: 'Add Program +',
      },
      allowActions: true,
      createType: 'ONE',
      defaults: [
        new ParameterMapping({
          defaultOptions: rentRegulatedProgramOptions(),
          component: GenericFieldSet,
          baseComponent: MultiSelectField,
          languageModule: new LanguageModule({ type: 'TEXT', noun: 'Program(s)', propertyAdjective: 'with' }),
          field: 'coresubsidyrecord__programname',
          comparison: 'any',
          value: '',
        }),
      ],
    }),

    coresubsidyrecord__enddate: new ParameterMapSet({
      component: MultiTypeFieldGroup,
      props: {
        label: 'Expiration Date',
        newButtonLabel: 'Add Expiration +',
      },
      allowActions: true,
      createType: 'ONE',
      defaults: [
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          props: {
            type: 'date',
          },
          defaultOptions: comparisonOptions(
            ['lte', 'between', 'gte'],
            ['Before', 'Range', 'After'],
            'DATE',
            'expirationRangeKey'
          ),
          languageModule: new LanguageModule({ type: 'DATE', noun: '', propertyAdjective: 'expiring' }),
          rangeKey: 'expirationRangeKey',
          rangePosition: 1,
          field: 'coresubsidyrecord__enddate',
          comparison: 'lte',
          value: moment(moment.now())
            .add(1, 'Y')
            .format('YYYY-MM-DD'),
        }),
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          props: {
            type: 'date',
          },
          defaultOptions: comparisonOptions(
            ['lte', 'between', 'gte'],
            ['Before', 'Range', 'After'],
            'DATE',
            'expirationRangeKey'
          ),
          languageModule: new LanguageModule({ type: 'DATE', noun: '', propertyAdjective: 'expiring' }),
          rangeKey: 'expirationRangeKey',
          rangePosition: 2,
          field: 'coresubsidyrecord__enddate',
          comparison: 'gte',
          value: moment(moment.now()).format('YYYY-MM-DD'),
        }),
      ],
    }),
  },
}

export const SMALLHOMES = {
  apiMap: new ApiMap({ name: 'Small Homes', queryName: 'sh' }),
  id: 'SMALL_HOMES',
  schema: {
    unitsres: new ParameterMapSet({
      component: MultiTypeFieldGroup,
      props: {
        label: 'Number of residential units',
        newButtonLabel: 'Add Residential Units +',
      },
      allowActions: true,
      createType: 'ONE',
      defaults: [
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: IntegerField,
          defaultOptions: comparisonOptions(['lte', 'exact'], null, 'INTEGER'),
          field: 'unitsres',
          comparison: 'lte',
          value: '6',
          props: {
            minValue: 1,
            maxValue: 6,
          },
          languageModule: new LanguageModule({ noun: 'units', propertyAdjective: 'with' }),
        }),
      ],
    }),
  },
}

export const MARKETRATE = {
  apiMap: new ApiMap({ name: 'Market Rate', queryName: 'mr' }),
  id: 'MARKET_RATE',
  schema: {},
}

export const PUBLICHOUSING = {
  apiMap: new ApiMap({ name: 'Public Housing', queryName: 'ph' }),
  id: 'PUBLIC_HOUSING',
  schema: {},
}

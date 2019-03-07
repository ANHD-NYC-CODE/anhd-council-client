import moment from 'moment'

import { rentRegulatedProgramOptions, comparisonOptions } from 'shared/utilities/filterUtils'
import { ParameterMapSet } from 'shared/classes/ParameterMapSet'
import { ParameterMapping } from 'shared/classes/ParameterMapping'

import MultiTypeFieldGroup from 'AdvancedSearch/Filter/Group/MultiTypeFieldGroup'
import GenericFieldSet from 'AdvancedSearch/Filter/FieldSet/GenericFieldSet'
import ComparisonFieldSet from 'AdvancedSearch/Filter/FieldSet/ComparisonFieldSet'

import DateField from 'AdvancedSearch/Filter/Field/DateField'
import IntegerField from 'AdvancedSearch/Filter/Field/IntegerField'
import PercentField from 'AdvancedSearch/Filter/Field/PercentField'

import MultiSelectField from 'AdvancedSearch/Filter/Field/MultiSelectField'
import { LanguageModule } from 'shared/classes/LanguageModule'

export const RENTSTABILZED = {
  name: 'Rent Stabilized',
  queryName: 'rs',
  constant: 'RENT_STABILIZED',
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
          baseComponent: PercentField,
          languageModule: new LanguageModule({
            type: 'AMOUNT',
            noun: 'rent stabilized unit',
            propertyAdjective: 'that lost',
            valueSuffix: '%',
          }),
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
          },
          languageModule: new LanguageModule({ type: 'YEAR', noun: '' }),
          rangeKey: 'rsUnitsRange',
          rangePosition: 1,
          defaultOptions: comparisonOptions(['start', 'between'], ['Since', 'Between'], 'DATE', 'rsUnitsRange'),
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
          },
          rangeKey: 'rsUnitsRange',
          rangePosition: 2,
          defaultOptions: comparisonOptions(['start', 'between'], ['Since', 'Between'], 'DATE', 'rsUnitsRange'),
          field: 'rsunitslost',
          comparison: 'end',
          value: '2017',
        }),
      ],
    }),
  },
}

export const RENTREGULATED = {
  name: 'Rent Regulated',
  queryName: 'rr',
  constant: 'RENT_REGULATED',

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
          languageModule: new LanguageModule({ type: 'TEXT', noun: '', propertyAdjective: 'with' }),
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
            ['Before', 'Between', 'After'],
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
            ['Before', 'Between', 'After'],
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
  name: 'Small Homes',
  queryName: 'sh',
  constant: 'SMALL_HOMES',
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
          languageModule: new LanguageModule({ noun: 'units', propertyAdjective: 'with' }),
        }),
      ],
    }),
  },
}

export const MARKETRATE = {
  name: 'Market Rate',
  queryName: 'mr',
  constant: 'MARKET_RATE',
  schema: {},
}

export const PUBLICHOUSING = {
  name: 'Public Housing',
  queryName: 'ph',
  constant: 'PUBLIC_HOUSING',
  schema: {},
}

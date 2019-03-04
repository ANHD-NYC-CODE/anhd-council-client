import moment from 'moment'

import { rentRegulatedProgramOptions, comparisonOptions } from 'shared/utilities/filterUtils'
import { BaseSetFilter } from 'shared/classes/BaseSetFilter'
import { ParameterMapSet } from 'shared/classes/ParameterMapSet'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
import IntegerFieldSet from 'AdvancedSearch/Filter/IntegerFieldSet'
import TextFieldSet from 'AdvancedSearch/Filter/TextFieldSet'
import DateFieldSet from 'AdvancedSearch/Filter/DateFieldSet'

export const RENTSTABILZED = {
  name: 'Rent Stabilized',
  queryName: 'rs',
  constant: 'RENT_STABILIZED',
  schema: {
    rsunitslost: new ParameterMapSet({
      setComponent: new BaseSetFilter({
        type: 'MULTITYPE',
        label: 'Rent Stabilized Units Lost',
        newButtonLabel: 'Add Units Lost +',
      }),
      defaults: [
        new ParameterMapping({ component: IntegerFieldSet, field: 'rsunitslost', comparison: 'gte', value: '25' }),
        new ParameterMapping({
          component: DateFieldSet,
          field: 'rsunitslost',
          comparison: 'start',
          value: moment(moment.now())
            .subtract(1, 'Y')
            .format('YYYY-MM-DD'),
        }),
        new ParameterMapping({
          component: DateFieldSet,
          field: 'rsunitslost',
          comparison: 'end',
          value: moment(moment.now())
            .subtract(1, 'Y')
            .format('YYYY-MM-DD'),
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
      setComponent: new BaseSetFilter({
        type: 'MULTISELECT',
        label: 'Program Name',
        newButtonLabel: 'Add Program +',
        defaultOptions: rentRegulatedProgramOptions(),
      }),
      defaults: [
        new ParameterMapping({
          component: TextFieldSet,
          field: 'coresubsidyrecord__programname',
          comparison: 'any',
          value: '',
        }),
      ],
    }),

    coresubsidyrecord__enddate: new ParameterMapSet({
      setComponent: new BaseSetFilter({
        type: 'DATE',
        label: 'Expiration Date',
        newButtonLabel: 'Add Expiration +',
        defaultOptions: comparisonOptions(['lte', 'between', 'gte'], ['Before', 'Between', 'After'], 'DATE'),
      }),
      paramMaps: [],
      defaults: [
        new ParameterMapping({
          component: DateFieldSet,
          field: 'coresubsidyrecord__enddate',
          comparison: 'lte',
          value: moment(moment.now())
            .add(2, 'Y')
            .format('YYYY-MM-DD'),
        }),
        new ParameterMapping({
          component: DateFieldSet,
          field: 'coresubsidyrecord__enddate',
          comparison: 'gte',
          value: moment(moment.now())
            .add(1, 'Y')
            .format('YYYY-MM-DD'),
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
      setComponent: new BaseSetFilter({
        type: 'INTEGER',
        label: 'Number of residential units',
        newButtonLabel: 'Add Residential Units +',
        defaultOptions: comparisonOptions(['lte', 'exact'], null, 'INTEGER'),
      }),

      defaults: [
        new ParameterMapping({ component: IntegerFieldSet, field: 'unitsres', comparison: 'lte', value: '6' }),
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

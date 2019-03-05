import moment from 'moment'

import { rentRegulatedProgramOptions, comparisonOptions } from 'shared/utilities/filterUtils'
import { ParameterMapSet } from 'shared/classes/ParameterMapSet'
import { ParameterMapping } from 'shared/classes/ParameterMapping'

import TextFieldGroup from 'AdvancedSearch/Filter/TextFieldGroup'
import IntegerFieldGroup from 'AdvancedSearch/Filter/IntegerFieldGroup'
import DateFieldGroup from 'AdvancedSearch/Filter/DateFieldGroup'
import MultiTypeFieldGroup from 'AdvancedSearch/Filter/MultiTypeFieldGroup'

import GenericFieldSet from 'AdvancedSearch/Filter/GenericFieldSet'
import ComparisonFieldSet from 'AdvancedSearch/Filter/ComparisonFieldSet'

import DateField from 'AdvancedSearch/Filter/DateField'
import IntegerField from 'AdvancedSearch/Filter/IntegerField'
import MultiSelectField from 'AdvancedSearch/Filter/MultiSelectField'

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
      defaults: [
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: IntegerField,
          field: 'rsunitslost',
          comparison: 'gte',
          value: '25',
        }),
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          props: {
            type: 'tel',
          },
          defaultOptions: comparisonOptions(['start', 'between', 'end'], ['Since', 'Between'], 'DATE'),
          field: 'rsunitslost',
          comparison: 'start',
          value: moment(moment.now())
            .subtract(1, 'Y')
            .format('YYYY-MM-DD'),
        }),
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          props: {
            type: 'tel',
          },
          defaultOptions: comparisonOptions(['start', 'between', 'end'], ['Since', 'Between'], 'DATE'),
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
      component: TextFieldGroup,
      props: {
        label: 'Program Name',
        newButtonLabel: 'Add Program +',
      },
      defaults: [
        new ParameterMapping({
          defaultOptions: rentRegulatedProgramOptions(),
          component: GenericFieldSet,
          baseComponent: MultiSelectField,
          field: 'coresubsidyrecord__programname',
          comparison: 'any',
          value: '',
        }),
      ],
    }),

    coresubsidyrecord__enddate: new ParameterMapSet({
      component: DateFieldGroup,
      props: {
        label: 'Expiration Date',
        newButtonLabel: 'Add Expiration +',
      },
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
            'expirationRange'
          ),
          rangeKey: 'expirationRange',
          rangePosition: 1,
          field: 'coresubsidyrecord__enddate',
          comparison: 'lte',
          value: moment(moment.now())
            .add(2, 'Y')
            .format('YYYY-MM-DD'),
        }),
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          props: {
            type: 'date',
          },
          rangeKey: 'expirationRange',
          rangePosition: 2,
          defaultOptions: comparisonOptions(
            ['lte', 'between', 'gte'],
            ['Before', 'Between', 'After'],
            'DATE',
            'expirationRange'
          ),
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
      component: IntegerFieldGroup,
      props: {
        label: 'Number of residential units',
        newButtonLabel: 'Add Residential Units +',
      },
      defaults: [
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: IntegerField,
          defaultOptions: comparisonOptions(['lte', 'exact'], null, 'INTEGER'),
          field: 'unitsres',
          comparison: 'lte',
          value: '6',
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

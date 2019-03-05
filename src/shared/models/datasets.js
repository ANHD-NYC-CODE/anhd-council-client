import moment from 'moment'

import { comparisonOptions } from 'shared/utilities/filterUtils'
import { ParameterMapSet } from 'shared/classes/ParameterMapSet'
import { ParameterMapping } from 'shared/classes/ParameterMapping'

import MultiTypeFieldGroup from 'AdvancedSearch/Filter/Group/MultiTypeFieldGroup'
import ComparisonFieldSet from 'AdvancedSearch/Filter/FieldSet/ComparisonFieldSet'

import DateField from 'AdvancedSearch/Filter/Field/DateField'
import IntegerField from 'AdvancedSearch/Filter/Field/IntegerField'

export const HPDVIOLATIONS = {
  name: 'HPD Violations',
  queryName: 'hpdviolations',
  url: '/hpdviolations/',
  model: 'hpdviolation',
  constant: 'HPD_VIOLATIONS',
  schema: {
    hpdviolations: new ParameterMapSet({
      component: MultiTypeFieldGroup,
      props: {
        label: 'HPD Violations',
        newButtonLabel: '',
      },
      autoCreate: true,
      createType: 'ALL_RANGE_ONE',
      defaults: [
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: IntegerField,
          field: 'hpdviolations',
          comparison: 'gte',
          value: '5',
        }),
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          props: {
            type: 'date',
          },
          rangeKey: 'hpdviolationsRange',
          rangePosition: 1,
          defaultOptions: comparisonOptions(
            ['gte', 'between', 'lte'],
            ['Since', 'Between', 'Before'],
            'DATE',
            'hpdviolationsRange'
          ),
          field: 'hpdviolations__approveddate',
          comparison: 'gte',
          value: moment(moment.now())
            .subtract(1, 'Y')
            .format('YYYY-MM-DD'),
        }),
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          props: {
            type: 'date',
          },
          rangeKey: 'hpdviolationsRange',
          rangePosition: 2,
          defaultOptions: comparisonOptions(
            ['gte', 'between', 'lte'],
            ['Since', 'Between', 'Before'],
            'DATE',
            'hpdviolationsRange'
          ),
          field: 'hpdviolations__approveddate',
          comparison: 'lte',
          value: moment(moment.now())
            .add(1, 'Y')
            .format('YYYY-MM-DD'),
        }),
      ],
    }),
  },
}

import moment from 'moment'
import * as p from 'AdvancedSearch/utilities/parsers'
import { LanguageModule } from 'shared/classes/LanguageModule'
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
          languageModule: new LanguageModule({ type: 'AMOUNT', noun: 'HPD Violation' }),
          field: 'hpdviolations__count',
          comparison: 'gte',
          value: '5',
        }),
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          languageModule: new LanguageModule({ type: 'DATE', noun: 'HPD Violation' }),
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
          languageModule: new LanguageModule({ type: 'DATE', noun: 'HPD Violation' }),
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

export const DOBVIOLATIONS = {
  name: 'DOB Violations',
  queryName: 'dobviolations',
  url: '/dobviolations/',
  model: 'dobviolation',
  constant: 'DOB_VIOLATIONS',
  schema: {
    dobviolations: new ParameterMapSet({
      component: MultiTypeFieldGroup,
      props: {
        label: 'DOB Violations',
        newButtonLabel: '',
      },
      autoCreate: true,
      createType: 'ALL_RANGE_ONE',
      defaults: [
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: IntegerField,
          languageModule: new LanguageModule({ type: 'AMOUNT', noun: 'DOB Violation' }),
          field: 'dobviolations__count',
          comparison: 'gte',
          value: '5',
        }),
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          languageModule: new LanguageModule({ type: 'DATE', noun: 'DOB Violation' }),
          props: {
            type: 'date',
          },
          rangeKey: 'dobviolationsRange',
          rangePosition: 1,
          defaultOptions: comparisonOptions(
            ['gte', 'between', 'lte'],
            ['Since', 'Between', 'Before'],
            'DATE',
            'dobviolationsRange'
          ),
          field: 'dobviolations__issuedate',
          comparison: 'gte',
          value: moment(moment.now())
            .subtract(1, 'Y')
            .format('YYYY-MM-DD'),
        }),
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          languageModule: new LanguageModule({ type: 'DATE', noun: 'DOB Violation' }),
          props: {
            type: 'date',
          },
          rangeKey: 'dobviolationsRange',
          rangePosition: 2,
          defaultOptions: comparisonOptions(
            ['gte', 'between', 'lte'],
            ['Since', 'Between', 'Before'],
            'DATE',
            'dobviolationsRange'
          ),
          field: 'dobviolations__issuedate',
          comparison: 'lte',
          value: moment(moment.now())
            .add(1, 'Y')
            .format('YYYY-MM-DD'),
        }),
      ],
    }),
  },
}

export const ECBVIOLATIONS = {
  name: 'ECB Violations',
  queryName: 'ecbviolations',
  url: '/ecbviolations/',
  model: 'ecbviolation',
  constant: 'ECB_VIOLATIONS',
  schema: {
    ecbviolations: new ParameterMapSet({
      component: MultiTypeFieldGroup,
      props: {
        label: 'ECB Violations',
        newButtonLabel: '',
      },
      autoCreate: true,
      createType: 'ALL_RANGE_ONE',
      defaults: [
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: IntegerField,
          languageModule: new LanguageModule({ type: 'AMOUNT', noun: 'ECB Violation' }),
          field: 'ecbviolations__count',
          comparison: 'gte',
          value: '5',
        }),
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          languageModule: new LanguageModule({ type: 'DATE', noun: 'ECB Violation' }),
          props: {
            type: 'date',
          },
          rangeKey: 'ecbviolationsRange',
          rangePosition: 1,
          defaultOptions: comparisonOptions(
            ['gte', 'between', 'lte'],
            ['Since', 'Between', 'Before'],
            'DATE',
            'ecbviolationsRange'
          ),
          field: 'ecbviolations__issuedate',
          comparison: 'gte',
          value: moment(moment.now())
            .subtract(1, 'Y')
            .format('YYYY-MM-DD'),
        }),
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          languageModule: new LanguageModule({ type: 'DATE', noun: 'ECB Violation' }),
          props: {
            type: 'date',
          },
          rangeKey: 'ecbviolationsRange',
          rangePosition: 2,
          defaultOptions: comparisonOptions(
            ['gte', 'between', 'lte'],
            ['Since', 'Between', 'Before'],
            'DATE',
            'ecbviolationsRange'
          ),
          field: 'ecbviolations__issuedate',
          comparison: 'lte',
          value: moment(moment.now())
            .add(1, 'Y')
            .format('YYYY-MM-DD'),
        }),
      ],
    }),
  },
}

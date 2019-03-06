import moment from 'moment'
import { LanguageModule } from 'shared/classes/LanguageModule'
import { ParameterMapSet } from 'shared/classes/ParameterMapSet'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
import MultiTypeFieldGroup from 'AdvancedSearch/Filter/Group/MultiTypeFieldGroup'
import ComparisonFieldSet from 'AdvancedSearch/Filter/FieldSet/ComparisonFieldSet'

import DateField from 'AdvancedSearch/Filter/Field/DateField'
import IntegerField from 'AdvancedSearch/Filter/Field/IntegerField'

export const constantToQueryName = constant => {
  return `${constant.replace('_', '').toLowerCase()}s`
}

export const constantToName = (constant, plural = true) => {
  return `${constant
    .split('_')
    .map(string => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    })
    .join(' ')}${plural ? 's' : ''}`
}

export const constructDefaultSchema = ({ constant = '', dateFieldQuery = '', amountFieldQuery = '' } = {}) => {
  return {
    [constantToQueryName(constant)]: new ParameterMapSet({
      component: MultiTypeFieldGroup,
      props: {
        label: constantToName(constant),
        newButtonLabel: '',
      },
      allowActions: false,
      createType: 'ALL_RANGE_ONE',
      defaults: [
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: IntegerField,
          languageModule: new LanguageModule({ type: 'AMOUNT', noun: constantToName(constant, false) }),
          field: `${constantToQueryName(constant)}${amountFieldQuery ? '__' + amountFieldQuery : ''}`,
          comparison: 'gte',
          value: '5',
        }),
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          languageModule: new LanguageModule({ type: 'DATE', noun: constantToName(constant, false) }),
          props: {
            type: 'date',
          },
          rangeKey: `${constantToQueryName(constant)}Range`,
          rangePosition: 1,
          defaultOptions: comparisonOptions(
            ['gte', 'between', 'lte'],
            ['Since', 'Between', 'Before'],
            'DATE',
            `${constantToQueryName(constant)}Range`
          ),
          field: `${constantToQueryName(constant)}${dateFieldQuery ? '__' + dateFieldQuery : ''}`,
          comparison: 'gte',
          value: moment(moment.now())
            .subtract(1, 'Y')
            .format('YYYY-MM-DD'),
        }),
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          languageModule: new LanguageModule({ type: 'DATE', noun: constantToName(constant, false) }),
          props: {
            type: 'date',
          },
          rangeKey: `${constantToQueryName(constant)}Range`,
          rangePosition: 2,
          defaultOptions: comparisonOptions(
            ['gte', 'between', 'lte'],
            ['Since', 'Between', 'Before'],
            'DATE',
            'hpdviolationsRange'
          ),
          field: `${constantToQueryName(constant)}${dateFieldQuery ? '__' + dateFieldQuery : ''}`,
          comparison: 'lte',
          value: moment(moment.now())
            .add(1, 'Y')
            .format('YYYY-MM-DD'),
        }),
      ],
    }),
  }
}

export const rentRegulatedProgramOptions = () => {
  const rentRegulatedPrograms = [
    '420-c Tax Incentive Program',
    '421a Affordable',
    '421a Tax Incentive Program',
    '421-g Tax Incentive Program',
    'Article 8A/HRP',
    'Federal Public Housing',
    'Inclusionary Housing',
    'J-51 Tax Incentive',
    'LAMP - HDC',
    'LIHTC 4%',
    'LIHTC 9%',
    'LIHTC Year 15',
    'Loan Management Set-Aside',
    'Mitchell-Lama',
    'Multi-Family Program',
    'Neighborhood Entrepreneur Program',
    'Neighborhood Redevelopment Program',
    'NYCHA - Mixed Financing',
    'Other HPD Programs',
    'Other HUD Financing',
    'Other HUD Project-Based Rental Assistance',
    'Participation Loan Program',
    'Project-Based Section 8',
    'Project Rental Assistance Contract / 202',
    'Section 202/8',
    'Section 221d(3) and Section 221d(4) Mortgage Insurance',
    'Section 223(f)',
    'Section 8 - RAD',
    'TPT',
  ]

  return rentRegulatedPrograms.map(program => ({ name: 'value', value: program, label: program }))
}

export const comparisonOptions = (comparisons, labels, type, rangeKey) => {
  if (type && !type.toUpperCase().match(/(DATE|INTEGER)/)) {
    throw 'Pass either DATE or INTEGER into comparison options'
  }

  if (!(labels && labels.length)) labels = []

  const dateLabels = {
    gte: 'Since',
    between: 'Between',
    lte: 'Before',
  }

  const integerLabels = {
    lte: 'At most',
    exact: 'Exactly',
    gte: 'At least',
  }

  let defaultLabels
  if (type && !labels.length) {
    switch (type.toUpperCase()) {
      case 'DATE':
        defaultLabels = dateLabels
        break
      case 'INTEGER':
        defaultLabels = integerLabels
        break
      default:
        defaultLabels = integerLabels
    }
  } else {
    defaultLabels = integerLabels
  }

  return comparisons.map((comparison, index) => ({
    name: 'comparison',
    value: comparison,
    label: labels[index] || defaultLabels[comparison],
    rangeKey: rangeKey,
  }))
}
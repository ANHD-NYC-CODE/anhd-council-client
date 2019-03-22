import moment from 'moment'
import { LanguageModule } from 'shared/classes/LanguageModule'
import { ParameterMapSet } from 'shared/classes/ParameterMapSet'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
import MultiTypeFieldGroup from 'AdvancedSearch/FilterComponent/Group/MultiTypeFieldGroup'
import ComparisonFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/ComparisonFieldSet'

import DateField from 'AdvancedSearch/FilterComponent/Field/DateField'
import IntegerField from 'AdvancedSearch/FilterComponent/Field/IntegerField'

import { capitalizeWords } from 'shared/utilities/languageUtils'

const pluralize = constant => {
  return constant.toUpperCase().endsWith('Y') ? constant.slice(0, -1) + 'ies' : constant + 's'
}

export const constantToQueryName = constant => {
  return `${pluralize(constant.replace(/_/g, '').toLowerCase())}`
}

export const constantToModelName = constant => {
  return `${constant.replace(/_/g, '').toLowerCase()}`
}

export const constantToName = ({ constant = '', plural = true, capitalizeDepartment = true } = {}) => {
  const constantTokens = constant.split('_')
  if (capitalizeDepartment && constantTokens.length > 1) {
    const tokens = constantTokens.map(string => {
      return capitalizeWords(string)
    })
    tokens[0] = tokens[0].toUpperCase()
    return `${plural ? pluralize(tokens.join(' ')) : tokens.join(' ')}`
  } else {
    const name = constant
      .split('_')
      .map(string => {
        return capitalizeWords(string)
      })
      .join(' ')
    return `${plural ? pluralize(name) : name}`
  }
}

export const constructDefaultSchema = ({
  constant = '',
  apiField = undefined,
  defaultDate = '',
  amountFieldQuery = '',
  defaultAmount = '',
  capitalizeDepartment = true,
  noun = undefined,
  amountNoun = undefined,
  amountShortNoun = undefined,
  amountValuePrefix = undefined,
  amountValueSuffix = undefined,
  amountPropertyAdjective = undefined,
  datePropertyAdjective = undefined,
  dateMax = undefined,
  hiddenParamMap = undefined,
} = {}) => {
  return {
    [constantToQueryName(constant)]: new ParameterMapSet({
      component: MultiTypeFieldGroup,
      props: {
        label: constantToName({ constant, capitalizeDepartment }),
        newButtonLabel: '',
      },
      allowActions: false,
      createType: 'ALL_RANGE_ONE',
      defaults: [
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: IntegerField,
          type: 'AMOUNT',
          languageModule: new LanguageModule({
            noun:
              amountNoun !== undefined ? amountNoun : constantToName({ constant, plural: false, capitalizeDepartment }),
            shortNoun: amountShortNoun,
            propertyAdjective: amountPropertyAdjective || 'have',
            valuePrefix: amountValuePrefix,
            valueSuffix: amountValueSuffix,
          }),
          field: `${apiField ? apiField : constantToQueryName(constant)}${
            amountFieldQuery ? '__' + amountFieldQuery : ''
          }`,
          comparison: 'gte',
          validations: {
            min: 0,
          },
          value: defaultAmount || '5',
        }),
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          type: 'DATE',
          languageModule: new LanguageModule({
            noun: noun !== undefined ? noun : constantToName({ constant, plural: false, capitalizeDepartment }),
            propertyAdjective: datePropertyAdjective,
          }),
          props: {
            type: 'date',
          },
          validations: {
            max: dateMax,
          },
          rangeKey: `${constantToQueryName(constant)}Range`,
          rangePosition: 1,
          defaultOptions: comparisonOptions(
            ['gte', 'between', 'lte'],
            ['Since', 'Range', 'Before'],
            'DATE',
            `${constantToQueryName(constant)}Range`
          ),
          field: `${apiField ? apiField : constantToQueryName(constant)}__${getDatasetDateField(constant)}`,
          comparison: 'gte',
          value:
            defaultDate ||
            moment(moment.now())
              .subtract(1, 'Y')
              .format('YYYY-MM-DD'),
        }),
        new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: DateField,
          type: 'DATE',
          languageModule: new LanguageModule({
            noun: noun !== undefined ? noun : constantToName({ constant, plural: false, capitalizeDepartment }),
            propertyAdjective: datePropertyAdjective,
          }),
          props: {
            type: 'date',
          },
          validations: {
            max: dateMax,
          },
          rangeKey: `${constantToQueryName(constant)}Range`,
          rangePosition: 2,
          defaultOptions: comparisonOptions(
            ['gte', 'between', 'lte'],
            ['Since', 'Range', 'Before'],
            'DATE',
            `${constantToQueryName(constant)}Range`
          ),
          field: `${apiField ? apiField : constantToQueryName(constant)}__${getDatasetDateField(constant)}`,
          comparison: 'lte',
          value:
            defaultDate ||
            moment(moment.now())
              .add(1, 'Y')
              .format('YYYY-MM-DD'),
        }),
        hiddenParamMap,
      ].filter(m => m),
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
    between: 'Range',
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

export const getDatasetDateField = datasetConstant => {
  switch (datasetConstant) {
    case 'PROPERTY':
      return 'bbl'
    case 'HPD_VIOLATION':
      return 'approveddate'
    case 'DOB_VIOLATION':
      return 'issuedate'
    case 'ECB_VIOLATION':
      return 'issuedate'
    case 'HPD_COMPLAINT':
      return 'receiveddate'
    case 'HPD_PROBLEM':
      return 'problemid'
    case 'DOB_COMPLAINT':
      return 'dateentered'
    case 'EVICTION':
      return 'executeddate'
    case 'ACRIS_REAL_MASTER':
      return 'docdate'
    case 'ACRIS_REAL_PARTY':
      return 'documentid'
    case 'PROPERTY_SALE_BY_AMOUNT':
      return 'documentid__docdate'
    case 'PROPERTY_SALE_BY_COUNT':
      return 'documentid__docdate'
    case 'FORECLOSURE':
      return 'fileddate'
    case 'DOB_ISSUED_PERMIT':
      return 'issuedate'
    case 'DOB_FILED_PERMIT':
      return 'prefilingdate'
    case 'HOUSING_LITIGATION':
      return 'caseopendate'
    case 'HPD_REGISTRATION':
      return 'enddate'
    default:
      return 'id'
  }
}

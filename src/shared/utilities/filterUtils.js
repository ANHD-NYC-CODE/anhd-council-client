import moment from 'moment'
import { LanguageModule } from 'shared/classes/LanguageModule'
import { ParameterMapSet } from 'shared/classes/ParameterMapSet'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
import MultiTypeFieldGroup from 'AdvancedSearch/FilterComponent/Group/MultiTypeFieldGroup'
import ComparisonFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/ComparisonFieldSet'

import DateField from 'AdvancedSearch/FilterComponent/Field/DateField'
import IntegerField from 'AdvancedSearch/FilterComponent/Field/IntegerField'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import HiddenField from 'AdvancedSearch/FilterComponent/Field/HiddenField'

import { capitalizeWords } from 'shared/utilities/languageUtils'

const pluralize = constant => {
  return constant.toUpperCase().endsWith('Y') ? constant.slice(0, -1) + 'ies' : constant + 's'
}

export const constantToQueryName = constant => {
  return `${pluralize(constant.replace(/_/g, '').toLowerCase())}`
}

export const constantToModelName = constant => {
  if (!constant) return
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

export const createAdvancedSearchFilters = ({ resourceModels } = {}) => {
  return [
    {
      resourceModel: resourceModels['HPD_VIOLATION'],
      schema: constructCountSchema({
        resourceModel: resourceModels['HPD_VIOLATION'],
        constant: 'HPD_VIOLATION',
        amountFieldQuery: 'count',
      }),
      languageModule: new LanguageModule({
        noun: constantToName({ constant: 'HPD_VIOLATION', capitalizeDepartment: true, plural: true }),
      }),
    },
    {
      resourceModel: resourceModels['DOB_VIOLATION'],
      schema: constructCountSchema({
        resourceModel: resourceModels['DOB_VIOLATION'],
        constant: 'DOB_VIOLATION',
        amountFieldQuery: 'count',
        capitalizeDepartment: true,
      }),
      languageModule: new LanguageModule({
        noun: constantToName({ constant: 'DOB_VIOLATION', capitalizeDepartment: true, plural: true }),
      }),
    },
    {
      resourceModel: resourceModels['ECB_VIOLATION'],
      schema: constructCountSchema({
        constant: 'ECB_VIOLATION',
        resourceModel: resourceModels['ECB_VIOLATION'],
        amountFieldQuery: 'count',
        capitalizeDepartment: true,
      }),
      languageModule: new LanguageModule({
        noun: constantToName({ constant: 'ECB_VIOLATION', capitalizeDepartment: true, plural: true }),
      }),
    },
    {
      resourceModel: resourceModels['HPD_COMPLAINT'],
      schema: constructCountSchema({
        resourceModel: resourceModels['HPD_COMPLAINT'],
        constant: 'HPD_COMPLAINT',
        amountFieldQuery: 'count',
        capitalizeDepartment: true,
      }),
      languageModule: new LanguageModule({
        noun: constantToName({ constant: 'HPD_COMPLAINT', capitalizeDepartment: true, plural: true }),
      }),
    },
    {
      resourceModel: resourceModels['DOB_COMPLAINT'],
      schema: constructCountSchema({
        resourceModel: resourceModels['DOB_COMPLAINT'],
        constant: 'DOB_COMPLAINT',
        amountFieldQuery: 'count',
        capitalizeDepartment: true,
      }),
      languageModule: new LanguageModule({
        noun: constantToName({ constant: 'DOB_COMPLAINT', capitalizeDepartment: true, plural: true }),
      }),
    },
    {
      resourceModel: resourceModels['DOB_FILED_PERMIT'],
      schema: constructCountSchema({
        resourceModel: resourceModels['DOB_FILED_PERMIT'],
        constant: 'DOB_FILED_PERMIT',
        apiField: 'doblegacyfiledpermits',
        amountFieldQuery: 'count',
        capitalizeDepartment: true,
        defaultAmount: 5,
      }),
      languageModule: new LanguageModule({
        noun: constantToName({ constant: 'DOB_FILED_PERMIT', capitalizeDepartment: true, plural: true }),
      }),
    },
    {
      resourceModel: resourceModels['DOB_ISSUED_PERMIT'],
      schema: constructCountSchema({
        resourceModel: resourceModels['DOB_ISSUED_PERMIT'],
        constant: 'DOB_ISSUED_PERMIT',
        amountFieldQuery: 'count',
        capitalizeDepartment: true,
        defaultAmount: 5,
      }),
      languageModule: new LanguageModule({
        noun: constantToName({ constant: 'DOB_ISSUED_PERMIT', capitalizeDepartment: true, plural: true }),
      }),
    },
    {
      resourceModel: resourceModels['EVICTION'],
      schema: constructCountSchema({
        resourceModel: resourceModels['EVICTION'],
        constant: 'EVICTION',
        amountFieldQuery: 'count',
        capitalizeDepartment: false,
        defaultAmount: 1,
      }),
      languageModule: new LanguageModule({
        noun: constantToName({ constant: 'EVICTION', capitalizeDepartment: false, plural: true }),
      }),
    },
    {
      resourceModel: resourceModels['HOUSING_LITIGATION'],
      schema: constructCountSchema({
        resourceModel: resourceModels['HOUSING_LITIGATION'],
        constant: 'HOUSING_LITIGATION',
        amountFieldQuery: 'count',
        capitalizeDepartment: false,
        defaultAmount: 1,
      }),
      languageModule: new LanguageModule({
        noun: constantToName({ constant: 'HOUSING_LITIGATION', capitalizeDepartment: false, plural: true }),
      }),
    },
    {
      resourceModel: resourceModels['LISPENDEN'],
      schema: constructCountSchema({
        resourceModel: resourceModels['LISPENDEN'],
        constant: 'LISPENDEN',
        apiField: 'lispendens',
        amountFieldQuery: 'count',
        defaultAmount: '1',
        capitalizeDepartment: false,
        hiddenParamMap: new ParameterMapping({
          component: GenericFieldSet,
          baseComponent: HiddenField,
          resourceModel: resourceModels['PROPERTY_SALE_BY_AMOUNT'],
          field: 'lispendens__type',
          comparison: '',
          value: 'foreclosure',
        }),
      }),
      languageModule: new LanguageModule({
        noun: constantToName({ constant: 'FORECLOSURE', capitalizeDepartment: false, plural: true }),
      }),
    },
    {
      resourceModel: resourceModels['PROPERTY_SALE_BY_AMOUNT'],
      schema: constructCountSchema({
        resourceModel: resourceModels['PROPERTY_SALE_BY_AMOUNT'],
        constant: 'PROPERTY_SALE_BY_AMOUNT',
        apiField: 'acrisreallegals',
        amountFieldQuery: 'documentid__count',
        amountNoun: '',
        // amountValuePrefix: '$',
        defaultAmount: '1',
        extraParamMap: new ParameterMapping({
          component: ComparisonFieldSet,
          baseComponent: IntegerField,
          resourceModel: resourceModels['PROPERTY_SALE_BY_AMOUNT'],
          type: 'AMOUNT',
          valuePrefix: '$',
          field: 'documentid__docamount',
          comparison: 'gte',
          value: '1000000',
        }),
      }),
      languageModule: new LanguageModule({
        noun: constantToName({ constant: 'PROPERTY_SALE_BY_AMOUNT', capitalizeDepartment: false, plural: false }),
      }),
    },
    {
      resourceModel: resourceModels['PROPERTY_SALE_BY_COUNT'],
      schema: constructCountSchema({
        resourceModel: resourceModels['PROPERTY_SALE_BY_COUNT'],
        constant: 'PROPERTY_SALE_BY_COUNT',
        apiField: 'acrisreallegals',
        amountFieldQuery: 'documentid__count',
        defaultAmount: 2,
        amountNoun: 'times',
      }),
      languageModule: new LanguageModule({
        noun: constantToName({ constant: 'PROPERTY_SALE_BY_COUNT', capitalizeDepartment: false, plural: false }),
      }),
    },
  ]
}

export const constructCountSchema = ({
  resourceModel,
  constant = '',
  apiField = undefined,
  defaultDate = '',
  amountFieldQuery = '',
  defaultAmount = '',
  capitalizeDepartment = true,
  amountValuePrefix = undefined,
  amountValueSuffix = undefined,
  dateMax = undefined,
  hiddenParamMap = undefined,
  extraParamMap = undefined,
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
          resourceModel,
          component: ComparisonFieldSet,
          baseComponent: IntegerField,
          type: 'AMOUNT',
          role: 'PRIMARY',
          valuePrefix: amountValuePrefix,
          valueSuffix: amountValueSuffix,
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
          resourceModel,
          type: 'DATE',
          role: 'LIMITER',
          component: ComparisonFieldSet,
          baseComponent: DateField,
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
          resourceModel,
          type: 'DATE',
          role: 'LIMITER',
          component: ComparisonFieldSet,
          baseComponent: DateField,
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
        extraParamMap,
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
    case 'LISPENDEN':
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

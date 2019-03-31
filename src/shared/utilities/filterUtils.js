import moment from 'moment'

import ParamSet from 'shared/classes/ParamSet'
import ParamMap from 'shared/classes/ParamMap'
import MultiTypeFieldGroup from 'AdvancedSearch/FilterComponent/Group/MultiTypeFieldGroup'
import PrimaryComparisonFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/PrimaryComparisonFieldSet'

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
  if (!Object.keys(resourceModels).length) return
  return [
    {
      resourceModel: resourceModels['HPD_VIOLATION'],
    },
    {
      resourceModel: resourceModels['DOB_VIOLATION'],
    },
    {
      resourceModel: resourceModels['ECB_VIOLATION'],
    },
    {
      resourceModel: resourceModels['HPD_COMPLAINT'],
    },
    {
      resourceModel: resourceModels['DOB_COMPLAINT'],
    },
    {
      resourceModel: resourceModels['DOB_FILED_PERMIT'],
    },
    {
      resourceModel: resourceModels['DOB_ISSUED_PERMIT'],
    },
    {
      resourceModel: resourceModels['EVICTION'],
    },
    {
      resourceModel: resourceModels['HOUSING_LITIGATION'],
    },
    {
      resourceModel: resourceModels['LISPENDEN'],
    },
    {
      resourceModel: resourceModels['ACRIS_REAL_MASTER'],
    },
  ]
}

export const constructCountParamSet = ({
  resourceModel,
  defaultDate = '',
  defaultAmount = 5,
  amountValuePrefix = undefined,
  amountValueSuffix = undefined,
  dateMax = undefined,
  hiddenParamMap = undefined,
  extraParamMap = undefined,
} = {}) => {
  return new ParamSet({
    component: MultiTypeFieldGroup,
    createType: 'ALL_RANGE_ONE',
    defaults: [
      new ParamMap({
        resourceModel,
        component: PrimaryComparisonFieldSet,
        baseComponent: IntegerField,
        type: 'AMOUNT',
        role: 'PRIMARY',
        valuePrefix: amountValuePrefix,
        valueSuffix: amountValueSuffix,
        field: 'count',
        comparison: 'gte',
        validations: {
          min: 0,
        },
        value: defaultAmount,
      }),
      new ParamMap({
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
        rangeKey: `${resourceModel.urlPath}Range`,
        rangePosition: 1,
        defaultOptions: dateComparisonOptions(
          ['gte', 'between', 'lte'],
          ['After', 'Range', 'Before'],
          'DATE',
          `${resourceModel.urlPath}Range`
        ),
        field: `${getDatasetDateField(resourceModel.resourceConstant)}`,
        comparison: 'gte',
        value:
          defaultDate ||
          moment(moment.now())
            .subtract(1, 'Y')
            .format('YYYY-MM-DD'),
      }),
      new ParamMap({
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
        rangeKey: `${resourceModel.urlPath}Range`,
        rangePosition: 2,
        defaultOptions: dateComparisonOptions(
          ['gte', 'between', 'lte'],
          ['After', 'Range', 'Before'],
          'DATE',
          `${resourceModel.urlPath}Range`
        ),
        field: `${getDatasetDateField(resourceModel.resourceConstant)}`,
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
  })
}

export const constructSingleMapParamSet = ({
  resourceModel,
  baseComponent = IntegerField,
  valuePrefix = undefined,
  valueSuffix = undefined,
  paramNoun,
  paramMapType = 'AMOUNT',
  defaultOptions = undefined,
  paramMapRole = '',
  paramMapField = '',
  paramMapValue = 5,
  paramMapComparison = '',
  paramSetLabel = '',
} = {}) => {
  return new ParamSet({
    component: MultiTypeFieldGroup,
    createType: 'ALL_RANGE_ONE',
    label: paramSetLabel,
    defaults: [
      new ParamMap({
        resourceModel,
        component: ComparisonFieldSet,
        baseComponent,
        type: paramMapType,
        role: paramMapRole,
        paramNoun,
        valuePrefix,
        valueSuffix,
        defaultOptions,
        field: paramMapField,
        comparison: paramMapComparison,
        value: paramMapValue,
        validations: {
          min: 0,
        },
      }),
    ],
  })
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

export const dateComparisonOptions = ({
  comparisonValues = ['gte', 'between', 'lte'],
  labels = ['After', 'Between', 'Before'],
  rangeKey,
} = {}) => {
  return comparisonValues.map((value, index) => ({
    name: 'comparison',
    value,
    label: labels[index],
    rangeKey: rangeKey,
  }))
}

export const amountComparisonOptions = ({
  comparisonValues = ['gte', 'exact', 'lte'],
  labels = ['At least', 'Exactly', 'At most'],
  rangeKey,
} = {}) => {
  return comparisonValues.map((value, index) => ({
    name: 'comparison',
    value,
    label: labels[index],
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
      return 'docdate'
    case 'PROPERTY_SALE_BY_AMOUNT':
      return 'docdate'
    case 'PROPERTY_SALE_BY_COUNT':
      return 'docdate'
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

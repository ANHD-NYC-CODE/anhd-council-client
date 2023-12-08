import * as c from 'shared/constants'
import ParamSet from 'shared/classes/ParamSet'
import ParamMap from 'shared/classes/ParamMap'
import MultiTypeFieldGroup from 'AdvancedSearch/FilterComponent/Group/MultiTypeFieldGroup'
import PrimaryComparisonFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/PrimaryComparisonFieldSet'

import ComparisonFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/ComparisonFieldSet'

import RangeFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/RangeFieldSet'

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
      resourceModel: resourceModels['FORECLOSURE'],
    },
    {
      resourceModel: resourceModels['PSFORECLOSURE'],
    },
    {
      resourceModel: resourceModels['ACRIS_REAL_MASTER'],
    },
    {
      resourceModel: resourceModels['TAX_LIEN'],
    },
    {
      resourceModel: resourceModels['CONH_RECORD'],
    },
    {
      resourceModel: resourceModels['AEP_BUILDING'],
    },
    {
      resourceModel: resourceModels['OCA_HOUSING_COURT'],
    }
  ]
}

export const constructCountDateParamSet = ({
  resourceModel,
  paramSetLabel = '',
  amountComponent = PrimaryComparisonFieldSet,
  amountParamNoun = '',
  amountType = 'AMOUNT',
  amountRole = 'PRIMARY',
  amountValuePrefix = undefined,
  amountValueSuffix = undefined,
  amountField = 'count',
  amountValue = 5,
  amountValidations = {
    min: 1,
  },
  dateType = 'DATE',
  dateRole = 'LIMITER',
  dateField = undefined,
  dateLowComparison = 'gte',
  dateHighComparison = 'lte',
  dateLowValue = c.CUSTOM_DEFAULT_START_DATE,
  dateHighValue = c.CUSTOM_DEFAULT_END_DATE,
  dateOptions = rangeComparisonOptions({
    comparisonValues: ['gte', 'between', 'lte'],
    labels: ['Since', 'Between', 'Before'],
    rangeKey: 'DATE',
  }),
  dateValidations = {},
  hiddenParamMap = undefined,
  extraParamMap = undefined,
} = {}) => {
  return new ParamSet({
    component: MultiTypeFieldGroup,
    createType: 'ALL_RANGE_ONE',
    label: paramSetLabel,
    defaults: [
      new ParamMap({
        resourceModel,
        component: amountComponent,
        baseComponent: IntegerField,
        type: amountType,
        role: amountRole,
        paramNoun: amountParamNoun,
        valuePrefix: amountValuePrefix,
        valueSuffix: amountValueSuffix,
        field: amountField,
        comparison: 'gte',
        validations: amountValidations,
        value: amountValue,
      }),
      new ParamMap({
        resourceModel,
        type: dateType,
        role: dateRole,
        component: ComparisonFieldSet,
        baseComponent: DateField,
        validations: dateValidations,
        rangeKey: `${paramSetLabel}-${resourceModel.urlPath}-Range`,
        rangePosition: 1,
        defaultOptions: dateOptions,
        field: dateField || `${getDatasetDateField(resourceModel.resourceConstant)}`,
        comparison: dateLowComparison,
        value: dateLowValue,
      }),
      new ParamMap({
        resourceModel,
        type: dateType,
        role: dateRole,
        component: ComparisonFieldSet,
        baseComponent: DateField,
        validations: dateValidations,
        rangeKey: `${paramSetLabel}-${resourceModel.urlPath}-Range`,
        rangePosition: 2,
        defaultOptions: dateOptions,
        field: dateField || `${getDatasetDateField(resourceModel.resourceConstant)}`,
        comparison: dateHighComparison,
        value: dateHighValue,
      }),
      extraParamMap,
      hiddenParamMap,
    ].filter(m => m),
  })
}

export const constructSingleMapParamSet = ({
  resourceModel,
  component = ComparisonFieldSet,
  baseComponent = IntegerField,
  valuePrefix = undefined,
  valueSuffix = undefined,
  paramNoun,
  inputClass,
  paramMapType = 'AMOUNT',
  defaultOptions = undefined,
  paramMapRole = 'MODIFIER',
  paramMapField = '',
  paramMapValue = 5,
  paramMapComparison = '',
  comparisonPrefix = '',
  paramSetLabel = '',
  validations,
} = {}) => {
  return new ParamSet({
    component: MultiTypeFieldGroup,
    createType: 'ALL_RANGE_ONE',
    label: paramSetLabel,
    defaults: [
      new ParamMap({
        resourceModel,
        component,
        baseComponent,
        type: paramMapType,
        role: paramMapRole,
        paramNoun,
        inputClass,
        comparisonPrefix,
        valuePrefix,
        valueSuffix,
        defaultOptions,
        field: paramMapField,
        comparison: paramMapComparison,
        value: paramMapValue,
        validations,
      }),
    ],
  })
}

//comparehere
export const constructDateRangeParamSet = ({
  resourceModel,
  paramSetLabel = '',
  dateType = 'DATE',
  dateRole = 'LIMITER',
  dateField = undefined,
  dateLowComparison = 'gte',
  dateHighComparison = 'lte',
  dateLowValue = c.CUSTOM_DEFAULT_START_DATE,
  dateHighValue = c.CUSTOM_DEFAULT_END_DATE,
  dateOptions = rangeComparisonOptions({
    comparisonValues: ['gte', 'between', 'lte'],
    labels: ['Since', 'Between', 'Before'],
    rangeKey: 'DATE',
  }),
  dateValidations = {},
  comparisonPrefix = '',
  dateValuePrefix = '',
} = {}) => {
  return new ParamSet({
    component: MultiTypeFieldGroup,
    createType: 'ALL_RANGE_ONE',
    label: paramSetLabel,
    defaults: [
      new ParamMap({
        resourceModel,
        type: dateType,
        role: dateRole,
        component: ComparisonFieldSet,
        baseComponent: DateField,
        validations: dateValidations,
        rangeKey: `${paramSetLabel}-${resourceModel.urlPath}-Range`,
        rangePosition: 1,
        defaultOptions: dateOptions,
        field: dateField || `${getDatasetDateField(resourceModel.resourceConstant)}`,
        comparison: dateLowComparison,
        comparisonPrefix,
        value: dateLowValue,
        valuePrefix: dateValuePrefix,
      }),
      new ParamMap({
        resourceModel,
        type: dateType,
        role: dateRole,
        component: ComparisonFieldSet,
        baseComponent: DateField,
        validations: dateValidations,
        rangeKey: `${paramSetLabel}-${resourceModel.urlPath}-Range`,
        rangePosition: 2,
        defaultOptions: dateOptions,
        field: dateField || `${getDatasetDateField(resourceModel.resourceConstant)}`,
        comparison: dateHighComparison,
        comparisonPrefix,
        value: dateHighValue,
        valuePrefix: dateValuePrefix,
      }),
    ].filter(m => m),
  })
}

export const constructRangeParamSet = ({
  resourceModel,
  paramSetLabel = '',
  paramNoun = '',
  paramMapRole = 'LIMITER',
  paramMapField = undefined,
  lowComparison = 'gte',
  highComparison = 'lte',
  lowValue = c.CUSTOM_DEFAULT_START_DATE,
  highValue = c.CUSTOM_DEFAULT_END_DATE,
  defaultOptions = rangeComparisonOptions({
    comparisonValues: ['gte', 'between', 'lte', 'gt', 'lt'],
    labels: ['At least', 'Between', 'At most', 'Greater than', 'Less than'],
    rangeKey: 'RANGE',
  }),
  comparisonPrefix = '',
  valuePrefix = '',
  validations = {},
} = {}) => {
  return new ParamSet({
    component: MultiTypeFieldGroup,
    createType: 'ALL_RANGE_ONE',
    label: paramSetLabel,
    defaults: [
      new ParamMap({
        resourceModel,
        type: 'AMOUNT',
        role: paramMapRole,
        field: paramMapField,
        component: ComparisonFieldSet,
        baseComponent: IntegerField,
        rangeKey: `${paramSetLabel}-${resourceModel.urlPath}-Range`,
        rangePosition: 1,
        defaultOptions,
        paramMapField,
        paramNoun,
        comparison: lowComparison,
        comparisonPrefix,
        value: lowValue,
        valuePrefix,
        validations,
      }),
      new ParamMap({
        resourceModel,
        type: 'AMOUNT',
        role: paramMapRole,
        field: paramMapField,
        component: ComparisonFieldSet,
        baseComponent: IntegerField,
        rangeKey: `${paramSetLabel}-${resourceModel.urlPath}-Range`,
        rangePosition: 2,
        defaultOptions,
        paramMapField,
        paramNoun,
        comparison: highComparison,
        comparisonPrefix,
        value: highValue,
        valuePrefix,
        validations,
      }),
    ].filter(m => m),
  })
}



export const constructAmountRangeParamSet = ({
  resourceModel,
  // component = ComparisonFieldSet,
  paramSetLabel = '',
  paramNoun = '',
  paramType = 'AMOUNT',
  paramMapRole = 'LIMITER',
  paramMapField = undefined,
  lowComparison = 'gt',
  highComparison = 'lt',
  // lowComparison = 'gte',
  // highComparison = 'lte',
  lowValue = 1,
  highValue = 5,
  amountOptions = rangeComparisonOptions({
    comparisonValues: ['gt', 'between', 'lt'],
    labels: ['Greater than', 'Between', 'Less than'],
    // rangeKey: 'RANGE',
    rangeKey: 'AMOUNTRANGE',
  }),
  comparisonPrefix = '',
  valuePrefix = '',
  validations = {},
} = {}) => {
  return new ParamSet({
    component: MultiTypeFieldGroup,
    createType: 'ALL_RANGE_ONE',
    label: paramSetLabel,
    defaults: [
      new ParamMap({
        resourceModel,
        type: paramType,
        role: paramMapRole,
        field: paramMapField,
        // component: component,
        component: ComparisonFieldSet,
        baseComponent: IntegerField,
        rangeKey: `${paramSetLabel}-${resourceModel.urlPath}-Range`,
        rangePosition: 1,
        defaultOptions: amountOptions,
        paramMapField,
        paramNoun,
        comparison: lowComparison,
        comparisonPrefix,
        value: lowValue,
        valuePrefix: valuePrefix,
        validations,
      }),
      new ParamMap({
        resourceModel,
        type: paramType,
        role: paramMapRole,
        field: paramMapField,
        // component: component,
        component: ComparisonFieldSet,
        baseComponent: IntegerField,
        rangeKey: `${paramSetLabel}-${resourceModel.urlPath}-Range`,
        rangePosition: 2,
        defaultOptions: amountOptions,
        paramMapField,
        paramNoun,
        comparison: highComparison,
        comparisonPrefix,
        value: highValue,
        valuePrefix: valuePrefix,
        validations,
      }),
    ].filter(m => m),
  })
}




export const rentRegulatedProgramOptions = () => {
  const rentRegulatedPrograms = [
    '420-c Tax Incentive Program',
    '421a Affordable',
    '421-a Tax Incentive Program',
    '421-g Tax Incentive Program',
    'Article 8A/HRP',
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

export const comparisonOptions = ({ comparisonValues = [], labels = [], name = 'comparison', rangeKey } = {}) => {
  return comparisonValues.map((value, index) => ({
    name,
    value,
    label: labels[index],
    rangeKey: rangeKey,
  }))
}

export const rangeComparisonOptions = ({
  comparisonValues = ['gte', 'between', 'lte'],
  labels = ['Since', 'Between', 'Before'],
  rangeKey,
} = {}) => {
  return comparisonValues.map((value, index) => ({
    name: 'comparison',
    value,
    label: labels[index],
    rangeKey,
  }))
}

export const amountComparisonOptions = ({
  comparisonValues = ['gte', 'exact', 'lte', 'gt', 'lt'],
  labels = ['At least', 'Exactly', 'At most', 'Greater than', 'Less than'],
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
      return 'receiveddate'
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
    case 'FORECLOSURE':
      return 'date_added'
    case 'PSFORECLOSURE':
      return 'dateadded'
    case 'OCA_HOUSING_COURT':
      return 'fileddate';
    case 'DOB_ISSUED_PERMIT':
      return 'issuedate'
    case 'DOB_FILED_PERMIT':
      return 'datefiled'
    case 'HOUSING_LITIGATION':
      return 'caseopendate'
    case 'HPD_REGISTRATION':
      return 'enddate'
    default:
      return 'id'
  }
}

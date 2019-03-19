import moment from 'moment'
import { toast } from 'react-toastify'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'
import * as d from 'shared/models/datasets'
import * as ht from 'shared/models/housingTypes'
import { DataRequest } from 'shared/classes/DataRequest'
import { getApiMap } from 'shared/utilities/classUtils'
import { TableConfig } from 'shared/classes/TableConfig'
import { ApiMap } from 'shared/classes/ApiMap'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
import { Dataset } from 'shared/classes/Dataset'
import { housingTypeCodeToName } from 'shared/utilities/languageUtils'
import { constantToModelName, constantToQueryName } from 'shared/utilities/filterUtils'
import { alertMapFilterdates } from 'shared/utilities/componentUtils'

import { getUrlFormattedParamMaps } from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'

import LookupProfileSummary from 'Lookup/LookupProfileSummary'

const ERROR_400_MESSAGE = 'Incorrect username or password.'
const ERROR_401_MESSAGE = 'Please login for access.'
const ERROR_404_MESSAGE = 'Not found.'
const ERROR_500_MESSAGE = 'Oops, something went wrong.'
const ERROR_408_MESSAGE = 'The request timed out after 2 minutes. Try again?'

export const handleActionDispatch = (dispatch, constant, requestId) => {
  dispatch(loadingActions.handleRequest(constant, requestId))
  dispatch(errorActions.handleClearErrors(constant))
}

const findErrorKeyValue = (status, data) => {
  if (!data) return ERROR_500_MESSAGE
  try {
    if (status === 400) {
      return ERROR_400_MESSAGE
    } else if (status === 401) {
      return ERROR_401_MESSAGE
    } else if (status === 404) {
      return ERROR_404_MESSAGE
    } else if (status === 500) {
      return ERROR_500_MESSAGE
    }
    return data.detail || data.non_field_errors[0] || data.refresh[0] || ERROR_500_MESSAGE
  } catch (err) {
    return ERROR_500_MESSAGE
  }
}

export const handleCatchError = (error, type, dispatch, requestId) => {
  let errorMessage = ''
  let errorStatus = ''
  if (!error.response) {
    if (error.status === 504 || (error.message && error.message.toUpperCase().match(/(TIME)/))) {
      errorMessage = ERROR_408_MESSAGE
      errorStatus = 408
    } else if (error.status === 504) {
      errorMessage = ERROR_500_MESSAGE
      errorStatus = error.status
    } else {
      errorMessage = ERROR_500_MESSAGE
      errorStatus = 500
    }
  } else {
    errorStatus = error.response.status
    if (error.response.status === 500) {
      errorMessage = error.response.data.results
    } else if (error.response.status > 200) {
      errorMessage = findErrorKeyValue(error.response.status, error.response.data)
    }
  }
  dispatch(errorActions.handleFailure(type, errorStatus, errorMessage))

  toast.error(`Error: ${errorStatus} - ${errorMessage}`)

  dispatch(loadingActions.handleCompletedRequest(type, requestId))
}

export const constructActionKey = constants => {
  return constants.filter(c => c).join('_')
}

export const constructSimplePropertyParams = params => {
  // Takes an objects like:
  // { type: 'hpdviolations', comparison: 'gte', value: 10, startDate: '2017-01-01', endDate: '2018-01-01'}
  // And converts it to url param object:
  // { hpdviolations__gte: 10, hpdviolations__start: '2017-01-01', hpdviolations__end: '2018-01-01'}
  return {
    [`${params.type}__${params.comparison}`]: params.value,
    [`${params.type}__start`]: params.startDate,
    [`${params.type}__end`]: params.endDate,
  }
}

export const setupHousingTypeModels = datasets => {
  return Object.keys(ht)
    .map(constant => {
      let databaseObject
      switch (constant) {
        case 'RENTSTABILIZED':
          databaseObject = datasets.find(object => (object.model_name || {}).toUpperCase() === 'CORESUBSIDYRECORD')
          break
        default:
          databaseObject = undefined
          break
      }
      return new Dataset({ model: ht[constant](databaseObject) })
    })
    .filter(ht => ht)
}

export const setupDatasetModels = datasets => {
  return Object.keys(d)
    .map(constant => {
      let databaseObject
      switch (constant) {
        case 'PROPERTY_SALE_BY_COUNT':
          databaseObject = datasets.find(object => (object.model_name || {}).toUpperCase() === 'ACRISREALLEGAL')
          break
        case 'PROPERTY_SALE_BY_AMOUNT':
          databaseObject = datasets.find(object => (object.model_name || {}).toUpperCase() === 'ACRISREALLEGAL')
          break
        case 'FORECLOSURE':
          databaseObject = datasets.find(object => (object.model_name || {}).toUpperCase() === 'LISPENDEN')
          break
        default:
          databaseObject = datasets.find(
            object => (object.model_name || {}).toUpperCase() === constantToModelName(constant).toUpperCase()
          )
      }
      if (databaseObject) {
        return new Dataset({ model: d[constant](databaseObject) })
      }
    })
    .filter(ds => !!ds)
}

export const newBuildingRequest = ({ type = undefined, bin = undefined, resourceConstant = undefined }) => {
  return new DataRequest({
    type: type,
    apiMaps: [
      new ApiMap({ constant: 'BUILDING', resourceId: bin }),
      resourceConstant ? getApiMap(resourceConstant) : undefined,
    ].filter(a => !!a),
    tableConfig: new TableConfig({ resourceConstant: resourceConstant }),
  })
}

export const newPropertyRequest = ({
  type = undefined,
  bbl = undefined,
  resourceConstant = undefined,
  tableComponent = undefined,
} = {}) => {
  return new DataRequest({
    type: type,
    apiMaps: [
      new ApiMap({ constant: 'PROPERTY', resourceId: bbl, name: 'Properties' }),
      resourceConstant ? getApiMap(resourceConstant) : undefined,
      type === 'LOOKUP_PROFILE' ? new ApiMap({ queryName: 'summary' }) : undefined,
    ].filter(a => !!a),
    tableConfig: new TableConfig({ resourceConstant: resourceConstant, component: tableComponent }),
  })
}

export const newLookupRequests = ({ bbl, bin } = {}) => {
  return [
    newPropertyRequest({ type: 'LOOKUP_PROFILE', bbl: bbl, tableComponent: LookupProfileSummary }),
    !bin ? newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'ACRIS_REAL_MASTER' }) : null,
    !bin ? newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'EVICTION' }) : null,
    !bin ? newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'FORECLOSURE' }) : null,
    bin
      ? newBuildingRequest({ type: 'LOOKUP_FILTER', bin: bin, resourceConstant: 'HPD_VIOLATION' })
      : newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'HPD_VIOLATION' }),
    bin
      ? newBuildingRequest({ type: 'LOOKUP_FILTER', bin: bin, resourceConstant: 'HPD_COMPLAINT' })
      : newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'HPD_COMPLAINT' }),
    bin
      ? newBuildingRequest({ type: 'LOOKUP_FILTER', bin: bin, resourceConstant: 'DOB_VIOLATION' })
      : newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'DOB_VIOLATION' }),
    bin
      ? newBuildingRequest({ type: 'LOOKUP_FILTER', bin: bin, resourceConstant: 'DOB_COMPLAINT' })
      : newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'DOB_COMPLAINT' }),
    bin
      ? newBuildingRequest({ type: 'LOOKUP_FILTER', bin: bin, resourceConstant: 'ECB_VIOLATION' })
      : newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'ECB_VIOLATION' }),
    bin
      ? newBuildingRequest({ type: 'LOOKUP_FILTER', bin: bin, resourceConstant: 'DOB_ISSUED_PERMIT' })
      : newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'DOB_ISSUED_PERMIT' }),
    bin
      ? newBuildingRequest({ type: 'LOOKUP_FILTER', bin: bin, resourceConstant: 'DOB_FILED_PERMIT' })
      : newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'DOB_FILED_PERMIT' }),
    bin
      ? newBuildingRequest({ type: 'LOOKUP_FILTER', bin: bin, resourceConstant: 'HOUSING_LITIGATION' })
      : newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'HOUSING_LITIGATION' }),
  ].filter(r => !!r)
}

export const newGeographyRequest = ({
  type = undefined,
  geographyType = undefined,
  geographyId,
  resourceConstant = undefined,
  defaultValue = 10,
} = {}) => {
  return new DataRequest({
    type: type,
    apiMaps: [
      new ApiMap({ constant: geographyType, resourceId: geographyId }),
      new ApiMap({ constant: 'PROPERTY', name: 'Properties' }),
    ],
    paramMaps: [
      new ParameterMapping({
        resourceConstant,
        type: 'AMOUNT',
        field: constantToQueryName(resourceConstant),
        comparison: 'gte',
        value: defaultValue,
      }),
      new ParameterMapping({
        resourceConstant,
        type: 'DATE',
        field: `${constantToQueryName(resourceConstant)}__start`,
        comparison: '',
        value: alertMapFilterdates()[0],
      }),
    ],
    tableConfig: new TableConfig({ resourceConstant: 'PROPERTY' }),
  })
}

export const newGeographyHousingTypeRequest = ({
  type = undefined,
  geographyType = undefined,
  geographyId,
  paramValue = undefined,
} = {}) => {
  return new DataRequest({
    type: type,
    requestConstant: `${type}_${paramValue.toUpperCase()}`,
    apiMaps: [
      new ApiMap({ constant: geographyType, resourceId: geographyId }),
      new ApiMap({ constant: 'PROPERTY', name: `${housingTypeCodeToName(paramValue)}` }),
    ],
    paramMaps: [
      new ParameterMapping({
        type: 'TEXT',
        field: 'housingtype',
        comparison: '',
        value: paramValue,
      }),
    ],
    tableConfig: new TableConfig({ resourceConstant: 'PROPERTY' }),
  })
}

export const newMapRequests = ({ geographyType, geographyId } = {}) => {
  return [
    newGeographyRequest({ type: 'MAP_FILTER', geographyType, geographyId, resourceConstant: 'HPD_VIOLATION' }),
    newGeographyHousingTypeRequest({ type: 'GEOGRAPHY_HOUSING_TYPE', geographyType, geographyId, paramValue: 'rs' }),
    newGeographyHousingTypeRequest({ type: 'GEOGRAPHY_HOUSING_TYPE', geographyType, geographyId, paramValue: 'rr' }),
    newGeographyHousingTypeRequest({ type: 'GEOGRAPHY_HOUSING_TYPE', geographyType, geographyId, paramValue: 'sh' }),
    newGeographyHousingTypeRequest({ type: 'GEOGRAPHY_HOUSING_TYPE', geographyType, geographyId, paramValue: 'mr' }),
    newGeographyHousingTypeRequest({ type: 'GEOGRAPHY_HOUSING_TYPE', geographyType, geographyId, paramValue: 'ph' }),
    newGeographyRequest({
      type: 'MAP_FILTER',
      geographyType,
      geographyId,
      resourceConstant: 'DOB_COMPLAINT',
      defaultValue: 2,
    }),
    newGeographyRequest({
      type: 'MAP_FILTER',
      geographyType,
      geographyId,
      resourceConstant: 'HPD_COMPLAINT',
      defaultValue: 5,
    }),
    newGeographyRequest({
      type: 'MAP_FILTER',
      geographyType,
      geographyId,
      resourceConstant: 'EVICTION',
      defaultValue: 1,
    }),
    newGeographyRequest({
      type: 'MAP_FILTER',
      geographyType,
      geographyId,
      resourceConstant: 'DOB_ISSUED_PERMIT',
      defaultValue: 1,
    }),
  ]
}

export const newAdvancedSearchRequest = ({ geographyType, geographyId, advancedSearch } = {}) => {
  const paramMaps = getUrlFormattedParamMaps(advancedSearch)
  return new DataRequest({
    type: 'ADVANCED_SEARCH',
    resourceConstant: 'PROPERTY_ADVANCED_SEARCH',
    apiMaps: [
      new ApiMap({ constant: geographyType, resourceId: geographyId }),
      new ApiMap({ constant: 'PROPERTY', name: 'Custom Search' }),
    ],
    paramMaps: paramMaps,
    tableConfig: new TableConfig({ resourceConstant: 'PROPERTY' }),
  })
}

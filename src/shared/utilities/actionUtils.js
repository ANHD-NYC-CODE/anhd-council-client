import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'
import { toast } from 'react-toastify'
import * as d from 'shared/models/datasets'
import * as ht from 'shared/models/housingTypes'
import { DataRequest } from 'shared/classes/DataRequest'

import { ApiMap } from 'shared/classes/ApiMap'

import { Dataset } from 'shared/classes/Dataset'
import { constantToModelName } from 'shared/utilities/filterUtils'

const ERROR_400_MESSAGE = 'Incorrect username or password.'
const ERROR_401_MESSAGE = 'Please login for access.'
const ERROR_404_MESSAGE = 'Not found.'
const ERROR_500_MESSAGE = 'Oops, something went wrong.'
const TIMEOUT_MESSAGE = 'Sorry, the request timed out. Perhaps try a simpler query?'

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
    if (error.message && error.message.toUpperCase().match(/(TIMEOUT)/)) {
      errorMessage = TIMEOUT_MESSAGE
      errorStatus = 504
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
    .filter(ds => ds)
}

export const newBuildingRequest = ({ buildingId, resourceConstant }) => {
  return new DataRequest({
    apiMaps: [
      new ApiMap({ constant: 'BUILDING', resourceId: buildingId }),
      resourceConstant ? new ApiMap({ constant: resourceConstant }) : null,
    ].filter(a => a),
  })
}

export const newPropertyRequest = ({ propertyId, resourceConstant } = {}) => {
  return new DataRequest({
    apiMaps: [
      new ApiMap({ constant: 'PROPERTY', queryName: 'properties', resourceId: propertyId }),
      new ApiMap({ constant: resourceConstant }),
    ],
  })
}

export const newLookupRequests = ({ propertyId, buildingId } = {}) => {
  return [
    newPropertyRequest({ propertyId }),
    newPropertyRequest({ propertyId, resourceConstant: 'ACRISREALMASTER' }),
    newPropertyRequest({ propertyId, resourceConstant: 'EVICTION' }),
    newPropertyRequest({ propertyId, resourceConstant: 'FORECLOSURE' }),
    buildingId
      ? newBuildingRequest({ buildingId, resourceConstant: 'HPD_VIOLATION' })
      : newPropertyRequest({ propertyId, resourceConstant: 'HPD_VIOLATION' }),
    buildingId
      ? newBuildingRequest({ buildingId, resourceConstant: 'HPD_COMPLAINT' })
      : newPropertyRequest({ propertyId, resourceConstant: 'HPD_COMPLAINT' }),
    buildingId
      ? newBuildingRequest({ buildingId, resourceConstant: 'DOB_VIOLATION' })
      : newPropertyRequest({ propertyId, resourceConstant: 'DOB_VIOLATION' }),
    buildingId
      ? newBuildingRequest({ buildingId, resourceConstant: 'DOB_COMPLAINT' })
      : newPropertyRequest({ propertyId, resourceConstant: 'DOB_COMPLAINT' }),
    buildingId
      ? newBuildingRequest({ buildingId, resourceConstant: 'ECB_VIOLATION' })
      : newPropertyRequest({ propertyId, resourceConstant: 'ECB_VIOLATION' }),
    buildingId
      ? newBuildingRequest({ buildingId, resourceConstant: 'DOB_ISSUED_PERMIT' })
      : newPropertyRequest({ propertyId, resourceConstant: 'DOB_ISSUED_PERMIT' }),
    buildingId
      ? newBuildingRequest({ buildingId, resourceConstant: 'DOB_FILED_PERMIT' })
      : newPropertyRequest({ propertyId, resourceConstant: 'DOB_FILED_PERMIT' }),
    buildingId
      ? newBuildingRequest({ buildingId, resourceConstant: 'HOUSING_LITIGATION' })
      : newPropertyRequest({ propertyId, resourceConstant: 'HOUSING_LITIGATION' }),
  ].filter(r => r)
}

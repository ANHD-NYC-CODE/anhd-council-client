import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'
import { toast } from 'react-toastify'

const ERROR_400_MESSAGE = 'Incorrect username or password.'
const ERROR_401_MESSAGE = 'Please login for access.'
const ERROR_404_MESSAGE = 'Not found.'
const ERROR_500_MESSAGE = 'Oops, something went wrong.'

export const handleActionDispatch = (dispatch, constant) => {
  dispatch(loadingActions.handleRequest(constant))
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

export const handleCatchError = (error, type, dispatch) => {
  let errorMessage = ''
  let errorStatus = ''
  if (!error.response) {
    errorMessage = ERROR_500_MESSAGE
    errorStatus = 500
  } else if (error.response.status === 500) {
    errorMessage = error.response.data.results
  } else if (error.response.status > 200) {
    errorMessage = findErrorKeyValue(error.response.status, error.response.data)
  }
  errorStatus = error.response.status
  dispatch(errorActions.handleFailure(type, errorStatus, errorMessage))
  toast.error(`Error: ${error.response.status} - ${errorMessage}`)
  dispatch(loadingActions.handleCompletedRequest(type))
}

export const constructActionKey = (constant, params) => {
  if (!params) return constant
  const { type, value, comparison, sinceDate, endDate } = params
  return [constant, type, comparison, value, sinceDate, endDate]
    .filter(el => el)
    .map(el => el.toUpperCase())
    .join('_')
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

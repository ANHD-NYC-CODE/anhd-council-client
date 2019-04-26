import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'
import * as c from 'shared/constants'
import { toast } from 'react-toastify'

const ERROR_400_MESSAGE = 'Incorrect username or password.'
const ERROR_401_MESSAGE = 'Please login for access.'
const ERROR_404_MESSAGE = 'Not found.'
const ERROR_500_MESSAGE = 'Oops, something went wrong.'
const ERROR_502_MESSAGE = 'The app is temporarily down for maintenance.'
const ERROR_408_MESSAGE = 'The request timed out after 2 minutes. Try again?'

export const handleActionDispatch = (dispatch, constant, requestId) => {
  dispatch(loadingActions.handleRequest(constant, requestId))
  dispatch(errorActions.handleClearErrors(constant))
}

const findErrorKeyValue = (status, data) => {
  if (!data) return ERROR_500_MESSAGE
  try {
    switch (status) {
      case 400:
        if (data['email'] && data['email'].includes('user request with this email already exists.')) {
          return `We already have an account request for this email. Please email ${
            c.CONTACT_EMAIL
          } if you need to check your status.`
        } else if (data['errors'] && data['errors'].length) {
          return data['errors'].map((error, index) => {
            return `${error}`
          })
        } else {
          return ERROR_400_MESSAGE
        }

      case 401:
        return ERROR_401_MESSAGE
      case 404:
        return ERROR_404_MESSAGE
      case 500:
        return ERROR_500_MESSAGE
      case 502:
        return ERROR_502_MESSAGE
      default:
        return data.detail || data.non_field_errors || data.refresh || ERROR_500_MESSAGE
    }
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
      errorMessage = findErrorKeyValue(error.status, error)
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

  dispatch(loadingActions.handleCompletedRequest(type, requestId))
  handleToast(errorStatus, errorMessage)
}

export const handleToast = (errorStatus, errorMessage) => {
  switch (errorStatus) {
    case 502:
      toast.error(errorMessage)
      break
    default:
      return
  }
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

import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'
import { toast } from 'react-toastify'

const ERROR_400_MESSAGE = 'Incorrect username or password.'
const ERROR_401_MESSAGE = 'Please login for access.'
const ERROR_404_MESSAGE = 'Not found.'
const ERROR_500_MESSAGE = 'Oops, something went wrong.'

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
  if (!error.response) {
    errorMessage = ERROR_500_MESSAGE
  } else if (error.response.status === 500) {
    errorMessage = error.response.data.results
  } else if (error.response.status > 200) {
    errorMessage = findErrorKeyValue(error.response.status, error.response.data)
  }
  dispatch(errorActions.handleFailure(type, error.response.status, errorMessage))
  toast.error(`Error: ${error.response.status} - ${errorMessage}`)
  dispatch(loadingActions.handleCompletedRequest(type))
}

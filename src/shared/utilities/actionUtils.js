import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'

const ERROR_500_MESSAGE = 'Oops, something went wrong.'

const findErrorKeyValue = data => {
  if (!data) return ERROR_500_MESSAGE
  try {
    return data.detail || data.non_field_errors[0] || data.refresh[0] || ERROR_500_MESSAGE
  } catch (err) {
    return ERROR_500_MESSAGE
  }
}

export const handleCatchError = (error, type, dispatch) => {
  dispatch(loadingActions.handleCompletedRequest(type))
  if (!error.response) {
    dispatch(errorActions.handleFailure(type, 500, ERROR_500_MESSAGE))
  } else if (error.response.status === 500) {
    dispatch(errorActions.handleFailure(type, error.response.status, error.response.data.results))
  } else if (error.response.status > 200) {
    dispatch(errorActions.handleFailure(type, error.response.status, findErrorKeyValue(error.response.data)))
  }
}

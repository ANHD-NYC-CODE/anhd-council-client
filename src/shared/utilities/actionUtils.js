import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'

const findErrorKeyValue = data => {
  return data.detail || data.non_field_errors[0] || 'unknown'
}

export const handleCatchError = (error, type, dispatch) => {
  dispatch(loadingActions.handleCompletedRequest(type))
  if (!error.response) {
    dispatch(errorActions.handleFailure(type, 500, 'unknown'))
  } else if (error.response.status === 500) {
    dispatch(errorActions.handleFailure(type, error.response.status, error.response.data.results))
  } else if (error.response.status > 200) {
    dispatch(errorActions.handleFailure(type, error.response.status, findErrorKeyValue(error.response.data)))
  }
}

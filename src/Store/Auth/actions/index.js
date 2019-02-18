import { Axios } from 'shared/utilities/Axios'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'
import { TOKEN_URL, REFRESH_TOKEN_URL } from 'shared/constants/urls'
import { GET_TOKEN } from 'shared/constants/actions'
import { handleCatchError } from 'shared/utilities/actionUtils'

export const HANDLE_GET_USER = 'HANDLE_GET_USER'
export const HANDLE_USER_LOGIN_SUCCESS = 'HANDLE_USER_LOGIN_SUCCESS'
export const HANDLE_USER_LOGOUT = 'HANDLE_USER_LOGOUT'

export const handleGetToken = response => {
  return {
    type: HANDLE_USER_LOGIN_SUCCESS,
    data: response.data,
  }
}

export const handleGetUser = response => {
  return {
    type: HANDLE_GET_USER,
    data: response.data,
  }
}

export const handleUserLogout = () => {
  return {
    type: HANDLE_USER_LOGOUT,
  }
}

export const loginUser = data => dispatch => {
  dispatch(loadingActions.handleRequest(GET_TOKEN))
  dispatch(errorActions.handleClearErrors(GET_TOKEN))
  return Axios.post(TOKEN_URL, { username: data.username, password: data.password })
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(GET_TOKEN))
      dispatch(handleGetToken(response))
      console.log(response)
    })
    .catch(error => {
      handleCatchError(error, GET_TOKEN, dispatch)
    })
}

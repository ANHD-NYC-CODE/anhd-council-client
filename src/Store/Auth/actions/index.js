import { Axios } from 'shared/utilities/Axios'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'
import { TOKEN_URL, CURRENT_USER_URL } from 'shared/constants/urls'
import { GET_TOKEN, GET_USER_PROFILE } from 'shared/constants/actions'
import { handleCatchError } from 'shared/utilities/actionUtils'

export const HANDLE_GET_USER_PROFILE = 'HANDLE_GET_USER_PROFILE'
export const HANDLE_USER_LOGIN_SUCCESS = 'HANDLE_USER_LOGIN_SUCCESS'
export const HANDLE_USER_LOGOUT = 'HANDLE_USER_LOGOUT'

export const handleGetToken = response => {
  return {
    type: HANDLE_USER_LOGIN_SUCCESS,
    data: response.data,
  }
}

export const handleGetUserProfile = response => {
  return {
    type: HANDLE_GET_USER_PROFILE,
    data: response.data,
  }
}

export const handleUserLogout = () => {
  return {
    type: HANDLE_USER_LOGOUT,
  }
}

export const getUserProfile = token => dispatch => {
  dispatch(loadingActions.handleRequest(GET_USER_PROFILE))
  dispatch(errorActions.handleClearErrors(GET_USER_PROFILE))

  return Axios.get(CURRENT_USER_URL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(GET_USER_PROFILE))
      dispatch(handleGetUserProfile(response))
    })
    .catch(error => {
      handleCatchError(error, GET_USER_PROFILE, dispatch)
    })
}

export const loginUser = data => dispatch => {
  dispatch(loadingActions.handleRequest(GET_TOKEN))
  dispatch(errorActions.handleClearErrors(GET_TOKEN))
  return Axios.post(TOKEN_URL, { username: data.username, password: data.password })
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(GET_TOKEN))
      dispatch(handleGetToken(response))
      dispatch(getUserProfile(response.data.access))
      console.log(response)
    })
    .catch(error => {
      handleCatchError(error, GET_TOKEN, dispatch)
    })
}

import { Axios } from 'shared/utilities/Axios'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'
import { TOKEN_URL, TOKEN_REFRESH_URL, CURRENT_USER_URL } from 'shared/constants/urls'
import { USER_STORAGE, GET_TOKEN, GET_TOKEN_REFRESH, GET_USER_PROFILE } from 'shared/constants/actions'
import { handleCatchError } from 'shared/utilities/actionUtils'

export const HANDLE_GET_USER_PROFILE = 'HANDLE_GET_USER_PROFILE'
export const HANDLE_USER_LOGIN_SUCCESS = 'HANDLE_USER_LOGIN_SUCCESS'
export const HANDLE_REFRESH_TOKEN = 'HANDLE_REFRESH_TOKEN'
export const HANDLE_USER_LOGOUT = 'HANDLE_USER_LOGOUT'

export const handleGetToken = response => {
  return {
    type: HANDLE_USER_LOGIN_SUCCESS,
    data: response.data,
  }
}

export const handleRefreshToken = response => {
  return {
    type: HANDLE_REFRESH_TOKEN,
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

export const getUserProfile = () => dispatch => {
  dispatch(loadingActions.handleRequest(GET_USER_PROFILE))
  dispatch(errorActions.handleClearErrors(GET_USER_PROFILE))
  const storage = JSON.parse(localStorage.getItem(USER_STORAGE)) || undefined
  try {
    return Axios.get(CURRENT_USER_URL, {
      headers: {
        authorization: `Bearer ${storage.access}`,
      },
    })
      .then(response => {
        dispatch(loadingActions.handleCompletedRequest(GET_USER_PROFILE))
        dispatch(handleGetUserProfile(response))
        storage.user = response.data
        localStorage.setItem(USER_STORAGE, JSON.stringify(storage))
      })
      .catch(error => {
        handleCatchError(error, GET_USER_PROFILE, dispatch)
      })
  } catch (err) {
    const error = { response: { status: 500, data: { results: error.message } } }
    handleCatchError(error, GET_USER_PROFILE, dispatch)
  }
}

export const refreshTokens = data => dispatch => {
  dispatch(loadingActions.handleRequest(GET_TOKEN_REFRESH))
  dispatch(errorActions.handleClearErrors(GET_TOKEN_REFRESH))
  return Axios.post(TOKEN_REFRESH_URL, { refresh: data.refresh_token })
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(GET_TOKEN_REFRESH))
      dispatch(handleRefreshToken(response))
      const storage = JSON.parse(localStorage.getItem(USER_STORAGE))
      if (storage) {
        storage.access = response.data.access
        storage.refresh = response.data.refresh
        localStorage.setItem(USER_STORAGE, JSON.stringify(storage))
      }
    })
    .catch(error => {
      handleCatchError(error, GET_TOKEN_REFRESH, dispatch)
      dispatch(logoutUser())
    })
}

export const loginUser = data => dispatch => {
  dispatch(loadingActions.handleRequest(GET_TOKEN))
  dispatch(errorActions.handleClearErrors(GET_TOKEN))
  return Axios.post(TOKEN_URL, { username: data.username, password: data.password })
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(GET_TOKEN))
      dispatch(handleGetToken(response))
      localStorage.setItem(USER_STORAGE, JSON.stringify(response.data))
      dispatch(getUserProfile())
    })
    .catch(error => {
      handleCatchError(error, GET_TOKEN, dispatch)
    })
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem(USER_STORAGE)
  dispatch(handleUserLogout())
}

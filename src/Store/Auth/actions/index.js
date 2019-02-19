import { Axios } from 'shared/utilities/Axios'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'
import { TOKEN_URL, TOKEN_REFRESH_URL, CURRENT_USER_URL } from 'shared/constants/urls'
import { USER_STORAGE, GET_TOKEN, GET_TOKEN_REFRESH, GET_USER_PROFILE } from 'shared/constants/actions'
import { handleCatchError } from 'shared/utilities/actionUtils'
import { updateLocalStorage, requestWithAuth } from 'shared/utilities/authUtils'
import { toast } from 'react-toastify'
import { push } from 'connected-react-router'

export const HANDLE_SYNC_STORAGE = 'HANDLE_SYNC_STORAGE'
export const HANDLE_USER_LOGOUT = 'HANDLE_USER_LOGOUT'

export const handleSyncStorage = storage => {
  return {
    type: HANDLE_SYNC_STORAGE,
    data: storage,
  }
}

export const handleUserLogout = () => {
  return {
    type: HANDLE_USER_LOGOUT,
  }
}

export const getUserProfile = () => (dispatch, access_token) => {
  dispatch(loadingActions.handleRequest(GET_USER_PROFILE))
  dispatch(errorActions.handleClearErrors(GET_USER_PROFILE))

  try {
    return Axios.get(CURRENT_USER_URL, {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    })
      .then(response => {
        dispatch(loadingActions.handleCompletedRequest(GET_USER_PROFILE))
        updateLocalStorage(null, null, response.data, dispatch)
        dispatch(handleSyncStorage(JSON.parse(localStorage.getItem(USER_STORAGE))))
        toast.success(`Welcome, ${response.data.username}!`)
      })
      .catch(error => {
        handleCatchError(error, GET_USER_PROFILE, dispatch)
      })
  } catch (err) {
    const error = { response: { status: 500, data: { results: error.message } } }
    handleCatchError(error, GET_USER_PROFILE, dispatch)
  }
}

export const refreshTokens = refresh_token => dispatch => {
  dispatch(loadingActions.handleRequest(GET_TOKEN_REFRESH))
  dispatch(errorActions.handleClearErrors(GET_TOKEN_REFRESH))
  return Axios.post(TOKEN_REFRESH_URL, { refresh: refresh_token })
    .then(response => {
      updateLocalStorage(response.data.access, response.data.refresh, null, dispatch)
      dispatch(loadingActions.handleCompletedRequest(GET_TOKEN_REFRESH))
      dispatch(handleSyncStorage(JSON.parse(localStorage.getItem(USER_STORAGE))))
      return JSON.parse(localStorage.getItem(USER_STORAGE))
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

      updateLocalStorage(response.data.access, response.data.refresh, null, dispatch)
      dispatch(handleSyncStorage(JSON.parse(localStorage.getItem(USER_STORAGE))))
      dispatch(requestWithAuth(getUserProfile()))
    })
    .catch(error => {
      handleCatchError(error, GET_TOKEN, dispatch)
    })
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem(USER_STORAGE)
  dispatch(handleUserLogout())
  dispatch(push('/'))
  toast.info("You've been logged out.")
}

import { Axios } from 'shared/utilities/Axios'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'
import * as c from 'shared/constants'
import { TOKEN_URL, TOKEN_REFRESH_URL, CURRENT_USER_URL } from 'shared/constants/urls'
import { getUserStorageData, removeUserStorageData } from 'shared/utilities/storageUtils'
import { retryAuthenticatedRequests } from 'Store/Request/actions'
import { setCustomSearchResults } from 'Store/AdvancedSearch/actions'

import { handleCatchError } from 'shared/utilities/actionUtils'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { updateAuthLocalStorage } from 'shared/utilities/storageUtils'

import { toast } from 'react-toastify'
import { fireUserLoginEvent } from 'Store/Analytics/actions'

export const handleSyncStorage = (storage, dispatch) => {
  return {
    type: c.HANDLE_SYNC_STORAGE,
    data: storage,
    refreshTimeout: setTimeout(
      () => dispatch(refreshTokens(storage.refresh.token)),
      (c.TOKEN_EXPIRATIONS.access - 1) * 60000
    ), // 4 minutes
  }
}

export const handleUserLogout = () => {
  return {
    type: c.HANDLE_USER_LOGOUT,
  }
}

export const getUserProfile = () => (dispatch, getState, access_token) => {
  dispatch(loadingActions.handleRequest(c.GET_USER_PROFILE))
  dispatch(errorActions.handleClearErrors(c.GET_USER_PROFILE))

  try {
    return Axios.get(CURRENT_USER_URL, {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    })
      .then(response => {
        dispatch(loadingActions.handleCompletedRequest(c.GET_USER_PROFILE))
        updateAuthLocalStorage(null, null, response.data, dispatch)
        dispatch(handleSyncStorage(getUserStorageData(), dispatch))
        dispatch(fireUserLoginEvent(response.data.id, response.data.email))
        toast.success(`Welcome, ${response.data.username}!`)
      })
      .catch(error => {
        handleCatchError(error, c.GET_USER_PROFILE, dispatch)
      })
  } catch (err) {
    const error = { response: { status: 500, data: { results: error.message } } }
    handleCatchError(error, c.GET_USER_PROFILE, dispatch)
  }
}

export const refreshTokens = refresh_token => dispatch => {
  dispatch(loadingActions.handleRequest(c.GET_TOKEN_REFRESH))
  dispatch(errorActions.handleClearErrors(c.GET_TOKEN_REFRESH))
  return Axios.post(TOKEN_REFRESH_URL, { refresh: refresh_token })
    .then(response => {
      updateAuthLocalStorage(response.data.access, response.data.refresh, null, dispatch)
      dispatch(loadingActions.handleCompletedRequest(c.GET_TOKEN_REFRESH))

      const storage = getUserStorageData()

      dispatch(handleSyncStorage(storage, dispatch))

      return storage
    })
    .catch(error => {
      handleCatchError(error, c.GET_TOKEN_REFRESH, dispatch)
      dispatch(logoutUser())
    })
}

export const loginUser = (data, postLoginAction) => (dispatch, getState) => {
  dispatch(loadingActions.handleRequest(c.GET_TOKEN))
  dispatch(errorActions.handleClearErrors(c.GET_TOKEN))
  return Axios.post(TOKEN_URL, { username: data.username, password: data.password })
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(c.GET_TOKEN))

      updateAuthLocalStorage(response.data.access, response.data.refresh, null, dispatch)

      dispatch(handleSyncStorage(getUserStorageData(), dispatch))
      dispatch(requestWithAuth(getUserProfile()))

      dispatch(retryAuthenticatedRequests())
      if (postLoginAction) postLoginAction()
    })
    .catch(error => {
      handleCatchError(error, c.GET_TOKEN, dispatch)
    })
}

export const logoutUser = (sentToast = false) => (dispatch, getState) => {
  removeUserStorageData()
  dispatch(handleUserLogout())
  dispatch(setCustomSearchResults()) // clears custom search
  if (sentToast) {
    toast.info("You've been logged out.")
  }

  dispatch(retryAuthenticatedRequests())
  // window.location = '/'
}

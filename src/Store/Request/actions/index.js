import * as c from 'shared/constants'
import { constructAxiosGet, constructAxiosPost } from 'shared/utilities/Axios'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { setTotalPropertyResults } from 'Store/DashboardState/actions'
import { setCustomSearchResults } from 'Store/AdvancedSearch/actions'

export const addRequest = requestConstant => ({
  type: c.ADD_REQUEST,
  requestConstant,
})

export const handleRequestResults = (response, requestConstant, dispatch) => {
  if (requestConstant === c.GEOGRAPHY_HOUSING_TYPE_ALL) {
    dispatch(setTotalPropertyResults(response.data))
  } else if (requestConstant === c.ADVANCED_SEARCH) {
    dispatch(setCustomSearchResults(response.data))
  }
  return { type: c.HANDLE_REQUEST_RESULTS, requestConstant: requestConstant, results: response.data }
}

export const removeRequest = requestConstant => ({
  type: c.REMOVE_REQUEST,
  requestConstant,
})

export const removeManyRequests = requestConstantsArray => ({
  type: c.REMOVE_MANY_REQUESTS,
  requestConstantsArray,
})

export const retryAuthenticatedRequests = () => (dispatch, getState) => {
  const appState = getState().appState
  if (!appState) return

  appState.requests.forEach(request => {
    if (!request.isAuthenticated) return
    request.called = false
    dispatch(requestWithAuth(makeRequest(request)))
  })
}

export const makeRequest = dataRequest => (dispatch, getState, access_token) => {
  if (!dataRequest || dataRequest.called) return
  dispatch(addRequest(dataRequest.requestConstant))
  dataRequest.called = true
  const requestId = Math.floor(Math.random() * 1000000)
  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    dataRequest.path,
    dataRequest.params,
    access_token,
    dataRequest.requestConstant,
    handleRequestResults
  )
}

export const makeBblCsvrequest = (dataRequest, bblList) => (dispatch, getState, access_token) => {
  dispatch(addRequest(dataRequest.csvRequestConstant))
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosPost(
    dispatch,
    getState,
    requestId,
    '/bbls',
    JSON.stringify(bblList), // Body
    dataRequest.csv_params,
    access_token,
    dataRequest.csvRequestConstant,
    undefined
  )
}

export const makeCsvRequest = dataRequest => (dispatch, getState, access_token) => {
  dispatch(addRequest(dataRequest.csvRequestConstant))
  const requestId = Math.floor(Math.random() * 1000000)
  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    dataRequest.path,
    dataRequest.csv_params,
    access_token,
    dataRequest.csvRequestConstant,
    undefined
  )
}

export const postUserRequest = (userRequestData, hideModal) => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)
  return constructAxiosPost(
    dispatch,
    getState,
    requestId,
    '/user-requests/',
    JSON.stringify(userRequestData), // Body
    { format: null },
    access_token,
    'POST_USER_REQUEST',
    undefined,
    hideModal
  )
}

export const postBugReport = (bugData, hideModal) => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)
  return constructAxiosPost(
    dispatch,
    getState,
    requestId,
    '/bug-reports/',
    JSON.stringify(bugData), // Body
    { format: null },
    access_token,
    'POST_BUG_REPORT',
    undefined,
    hideModal
  )
}

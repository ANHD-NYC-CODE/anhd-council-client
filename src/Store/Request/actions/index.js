import * as c from '../constants'
import { constructAxiosGet, constructAxiosPost } from 'shared/utilities/Axios'

export const addRequest = requestConstant => ({
  type: c.ADD_REQUEST,
  requestConstant,
})

export const handleRequestResults = (response, requestConstant) => ({
  type: c.HANDLE_REQUEST_RESULTS,
  requestConstant: requestConstant,
  results: response.data,
})

export const removeRequest = requestConstant => ({
  type: c.REMOVE_REQUEST,
  requestConstant,
})

export const removeManyRequests = requestConstantsArray => ({
  type: c.REMOVE_MANY_REQUESTS,
  requestConstantsArray,
})

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

import * as c from '../constants'
import { constructAxiosGet } from 'shared/utilities/Axios'

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

export const makeCsvRequest = dataRequest => (dispatch, getState, access_token) => {
  const csv_constant = `${dataRequest.requestConstant}_CSV`
  dispatch(addRequest(csv_constant))
  const requestId = Math.floor(Math.random() * 1000000)
  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    dataRequest.path,
    dataRequest.csv_params,
    access_token,
    csv_constant,
    undefined
  )
}

import * as c from '../constants'
import { constructAxiosGet } from 'shared/utilities/Axios'

export const addRequest = requestConstant => ({
  type: c.ADD_REQUEST,
  requestConstant,
})

export const receiveRequestResults = (results, requestConstant) => ({
  type: c.RECEIVE_REQUEST_RESULTS,
  requestConstant,
  results,
})

export const removeRequest = requestConstant => ({
  type: c.REMOVE_REQUEST,
  requestConstant,
})

export const makeRequest = dataRequest => (dispatch, getState, access_token) => {
  if (dataRequest.called) return
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
    receiveRequestResults
  )
}

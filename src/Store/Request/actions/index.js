import * as c from '../constants'

export const addRequest = requestConstant => ({
  type: c.ADD_REQUEST,
  requestConstant,
})

export const receiveRequestResults = (requestConstant, results) => ({
  type: c.RECEIVE_REQUEST_RESULTS,
  requestConstant,
  results,
})

export const removeRequest = requestConstant => ({
  type: c.REMOVE_REQUEST,
  requestConstant,
})

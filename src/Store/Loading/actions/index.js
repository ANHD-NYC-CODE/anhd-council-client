import * as u from 'shared/utilities/constantUtils'

export const handleRequest = (type, requestId) => ({
  type: u.createPendingRequestConstant(type),
  requestId,
})

export const handleCompletedRequest = (type, requestId) => ({
  type: u.createCompletedRequestConstant(type),
  requestId,
})

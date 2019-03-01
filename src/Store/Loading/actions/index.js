export const handleRequest = (type, requestId) => ({
  type: type + '_PENDING',
  requestId,
})

export const handleCompletedRequest = (type, requestId) => ({
  type: type + '_COMPLETE',
  requestId,
})

export const handleCancelRequests = type => ({
  type: type + '_CANCEL',
})

export const handleRequest = type => ({
  type: type + '_PENDING',
})

export const handleCompletedRequest = type => ({
  type: type + '_COMPLETE',
})

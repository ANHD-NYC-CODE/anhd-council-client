export const handleRequest = data => ({
  type: data + '_REQUEST',
})

export const handleSuccess = data => ({
  type: data + '_SUCCESS',
})

export const handleFailure = data => ({
  type: data + '_FAILURE',
})

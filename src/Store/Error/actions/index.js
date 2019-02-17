export const handleRequest = type => ({
  type: type + '_REQUEST',
})

export const handleFailure = (type, response) => {
  let message = (response.data || {}).detail
  return {
    type: type + '_FAILURE',
    status: response.status,
    message: message,
  }
}

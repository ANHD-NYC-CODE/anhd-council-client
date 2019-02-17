export const handleClearErrors = type => ({
  type: type + '_CLEAR_ERRORS',
})

export const handleFailure = (type, response) => {
  let message = (response.data || {}).detail
  return {
    type: type + '_FAILURE',
    status: response.status,
    message: message,
  }
}

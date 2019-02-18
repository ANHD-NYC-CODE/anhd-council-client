export const handleClearErrors = type => ({
  type: type + '_CLEAR_ERRORS',
})

export const handleFailure = (type, status, message) => {
  return {
    type: type + '_FAILURE',
    status: status,
    message: message,
  }
}

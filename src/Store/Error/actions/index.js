export const handleRequest = type => ({
  type: type + '_REQUEST',
})

export const handleFailure = (type, response) => {
  return {
    type: type + '_FAILURE',
    status: response.status,
    message: response.data.results,
  }
}

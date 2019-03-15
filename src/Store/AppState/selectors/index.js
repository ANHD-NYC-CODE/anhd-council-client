export const lookupRequests = (state, type) => {
  return state.appState.requests.filter(request => request.type === type)
}

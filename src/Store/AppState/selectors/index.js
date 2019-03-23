import { createSelector } from 'reselect'

export const getRequestType = (requests, type) => {
  return requests.filter(request => request.type === type)
}

export const getManyRequestTypes = (requests = [], types = []) => {
  return requests.filter(request => types.some(type => type === request.type))
}

export const selectRequests = state => {
  return state.appState.requests
}

export const makeSelectRequests = createSelector(
  selectRequests,
  requests => {
    return requests
  }
)

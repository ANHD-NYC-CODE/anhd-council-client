export const initialState = {
  requests: [],
}

export const loadingReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  const { type, requestId } = action
  const matches = /(.*)_(PENDING|COMPLETE|CANCEL)/.exec(type)
  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state

  const [, requestName, requestState] = matches
  const requestEntry = { name: requestName, id: requestId }
  switch (requestState) {
    case 'PENDING':
      return {
        ...state,
        [requestName]: true,
        requests: [...state.requests, requestEntry],
      }
    case 'COMPLETE':
      return {
        ...state,
        [requestName]: false,
        requests: state.requests.filter(entry => entry.id !== requestId),
      }
    case 'CANCEL':
      return {
        ...state,
        requests: state.requests.filter(entry => entry.name !== requestName),
      }
  }
}

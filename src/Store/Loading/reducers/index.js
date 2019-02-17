export const initialState = {}

export const loadingReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  const { type } = action
  const matches = /(.*)_(PENDING|COMPLETE)/.exec(type)
  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state

  const [, requestName, requestState] = matches
  return {
    ...state,
    // Store whether a request is happening at the moment or not
    // e.g. will be true when receiving GET_TODOS_REQUEST
    //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
    [requestName]: requestState === 'PENDING',
  }
}

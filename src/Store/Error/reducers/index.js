export const initialState = {}

export const errorReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  const { type } = action
  const matches = /(.*)_(CLEAR_ERRORS|FAILURE)/.exec(type)
  if (!matches) return state
  const [, requestName, requestState] = matches
  return {
    ...state,
    [requestName]: requestState === 'FAILURE' ? { status: action.status, message: action.message } : null,
  }
}

import * as c from '../constants'
export const initialState = {}

export const requestReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.ADD_REQUEST:
      return {
        ...state,
        [action.requestConstant]: undefined,
      }
    case c.RECEIVE_REQUEST_RESULTS:
      return {
        ...state,
        [action.requestConstant]: action.results,
      }
    case c.REMOVE_REQUEST: {
      const { [action.requestConstant]: undefined, ...newState } = state
      return {
        ...newState,
      }
    }
    default:
      return {
        ...state,
      }
  }
}

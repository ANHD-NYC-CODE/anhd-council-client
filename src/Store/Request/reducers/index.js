import * as c from '../constants'
export const initialState = {}

export const requestReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.ADD_REQUEST:
      return {
        ...state,
        [action.requestConstant]: undefined,
      }
    case c.HANDLE_REQUEST_RESULTS: {
      if (action.requestConstant in state) {
        return {
          ...state,
          [action.requestConstant]: action.results,
        }
      } else {
        return {
          ...state,
        }
      }
    }
    case c.REMOVE_REQUEST: {
      const { [action.requestConstant]: undefined, ...newState } = state
      return {
        ...newState,
      }
    }

    case c.REMOVE_MANY_REQUESTS: {
      let newState = state
      action.requestConstantsArray.forEach(constant => {
        delete newState[constant]
      })

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

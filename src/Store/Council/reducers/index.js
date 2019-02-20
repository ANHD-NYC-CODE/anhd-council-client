import * as c from '../constants'

export const initialState = {
  districts: undefined,
}

export const councilReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.HANDLE_GET_COUNCILS: {
      return {
        ...state,
        districts: action.data,
      }
    }
    default:
      return state
  }
}

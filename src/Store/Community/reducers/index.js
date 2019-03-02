import * as c from '../constants'

export const initialState = {
  boards: undefined,
  board: undefined,
  boardHousing: undefined,
  boardPropertySummaries: {},
}

export const communityReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.HANDLE_GET_COMMUNITIES: {
      return {
        ...state,
        boards: action.data,
      }
    }
    case c.HANDLE_GET_COMMUNITY: {
      return {
        ...state,
        board: action.data,
      }
    }
    case c.HANDLE_GET_COMMUNITY_HOUSING: {
      return {
        ...state,
        boardHousing: action.data,
      }
    }
    case c.HANDLE_GET_COMMUNITY_PROPERTY_SUMMARY: {
      return {
        ...state,
        boardPropertySummaries: {
          ...state.boardPropertySummaries,
          [action.key]: action.data,
        },
      }
    }
    default:
      return state
  }
}

import * as c from '../constants'
export const initialState = {
  results: [],
  searchQuery: undefined,
  searchTimeout: undefined,
}

export const searchReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.SET_SEARCH_TIMEOUT: {
      return { ...state, searchTimeout: action.data }
    }
    case c.HANDLE_READ_SEARCH_RESPONSE: {
      return {
        ...state,
        results: action.data || [],
      }
    }
    case c.SET_SEARCH_VALUE: {
      return { ...state, searchQuery: action.data }
    }
    case c.CLEAR_SEARCH: {
      return { ...state, searchQuery: undefined, results: [] }
    }

    default:
      return state
  }
}

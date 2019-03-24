import * as searchActions from '../actions'

export const initialState = {
  results: [],
  searchQuery: undefined,
  searchTimeout: undefined,
}

export const searchReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case searchActions.SET_SEARCH_TIMEOUT: {
      return { ...state, searchTimeout: action.data }
    }
    case searchActions.HANDLE_READ_SEARCH_RESPONSE: {
      return {
        ...state,
        results: action.data || [],
      }
    }
    case searchActions.SET_SEARCH_VALUE: {
      return { ...state, searchQuery: action.data }
    }
    case searchActions.CLEAR_SEARCH: {
      return { ...state, searchQuery: undefined, results: [] }
    }

    default:
      return state
  }
}

import * as searchActions from '../actions'

export const initialState = {
  results: [],
  errors: [],
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
    case searchActions.CLEAR_SEARCH: {
      return { ...state, results: [] }
    }

    default:
      return state
  }
}

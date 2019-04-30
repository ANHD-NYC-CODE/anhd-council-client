import * as actions from '../actions'

export const initialState = {
  user: undefined,
  access: undefined,
  refresh: undefined,
  refreshTimeout: undefined,
}

export const authReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case actions.HANDLE_SYNC_STORAGE: {
      if (state.refreshTimeout) {
        clearTimeout(state.refreshTimeout)
      }
      return {
        ...state,
        access: (action.data || {}).access,
        refresh: (action.data || {}).refresh,
        user: (action.data || {}).user,
        refreshTimeout: action.refreshTimeout,
      }
    }
    case actions.HANDLE_USER_LOGOUT: {
      clearTimeout(state.refreshTimeout)
      return { ...initialState }
    }
    default:
      return state
  }
}

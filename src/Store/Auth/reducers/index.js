import * as actions from '../actions'

export const initialState = {
  user: undefined,
  access: undefined,
  refresh: undefined,
}

export const authReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case actions.HANDLE_SYNC_STORAGE: {
      return {
        ...state,
        access: (action.data || {}).access,
        refresh: (action.data || {}).refresh,
        user: (action.data || {}).user,
      }
    }
    case actions.HANDLE_USER_LOGOUT: {
      return { ...initialState }
    }
    default:
      return state
  }
}

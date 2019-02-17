import * as actions from '../actions'

export const initialState = {
  user: {},
  access_token: undefined,
  refresh_token: undefined,
}

export const authReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case actions.HANDLE_USER_LOGIN_SUCCESS: {
      return {
        ...state,
        access_token: (action.data || {}).access_token || {},
        refresh_token: (action.data || {}).refresh_token || {},
      }
    }
    case actions.HANDLE_GET_USER: {
      return {
        ...state,
        user: action.data || {},
      }
    }
    case actions.HANDLE_USER_LOGOUT: {
      return { ...initialState }
    }
    default:
      return state
  }
}

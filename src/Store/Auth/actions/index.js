import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'

export const HANDLE_GET_USER = 'HANDLE_GET_USER'
export const HANDLE_USER_LOGIN_SUCCESS = 'HANDLE_USER_LOGIN_SUCCESS'
export const HANDLE_USER_LOGOUT = 'HANDLE_USER_LOGOUT'

export const handleUserLogin = response => {
  return {
    type: HANDLE_USER_LOGIN_SUCCESS,
    data: response.data,
  }
}

export const handleGetUser = response => {
  return {
    type: HANDLE_GET_USER,
    data: response.data,
  }
}

export const handleUserLogout = () => {
  return {
    type: HANDLE_USER_LOGOUT,
  }
}

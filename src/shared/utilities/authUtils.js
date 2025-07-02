import dayjs from 'dayjs'
import * as c from 'shared/constants'
import { logoutUser, refreshTokens } from 'Store/Auth/actions'

export const requestMiddleware = () => {
  return ({ dispatch, getState }) => next => action => {
    const { request } = action
    let auth = getState().auth
    if (!request) {
      return next(action)
    } else if (!auth.refresh) {
      return request(dispatch, getState)
    }

    // Refresh token if it has expired
    if (dayjs() > dayjs(auth.access.expiration)) {
      dispatch(refreshTokens(auth.refresh.token))
        .then(() => {
          auth = getState().auth
          return request(dispatch, getState, auth.access.token)
        })
        .catch(() => dispatch(logoutUser()))
    } else {
      return request(dispatch, getState, auth.access.token)
    }
  }
}

export const requestWithAuth = request => {
  return {
    type: c.AUTH_REQUEST,
    request: (dispatch, getState, access_token) => request(dispatch, getState, access_token),
  }
}

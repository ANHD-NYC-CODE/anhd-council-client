import moment from 'moment'
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

    // Refresh token if token has been alive for over 5 min
    if (moment() > moment(auth.access.expiration)) {
      dispatch(refreshTokens(auth.refresh.token))
        .then(() => {
          auth = getState().auth
          return request(dispatch, getState, auth.access.token)
        })
        .catch(e => {
          return dispatch(logoutUser())
        })
    } else {
      return request(dispatch, getState, auth.access.token)
    }
  }
}

export const requestWithAuth = request => {
  return {
    type: 'AUTH_REQUEST',
    request: (dispatch, getState, access_token) => request(dispatch, getState, access_token),
  }
}

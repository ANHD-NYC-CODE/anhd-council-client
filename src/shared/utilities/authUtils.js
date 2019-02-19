import moment from 'moment'
import { USER_STORAGE } from 'shared/constants/actions'
import { logoutUser, refreshTokens } from 'Store/Auth/actions'

const TOKEN_EXPIRATIONS = {
  access: 5, // minutes
  refresh: 10, // hours
}

export const updateLocalStorage = (access = null, refresh = null, user = null, dispatch) => {
  try {
    if (access) {
      access = {
        token: access,
        expiration: moment()
          .add(TOKEN_EXPIRATIONS.access, 'minutes')
          .format(),
      }
    }

    if (refresh) {
      refresh = {
        token: refresh,
        expiration: moment()
          .add(TOKEN_EXPIRATIONS.refresh, 'hours')
          .format(),
      }
    }

    const newData = { access, refresh, user }
    // Clear null values
    for (var propName in newData) {
      if (newData[propName] === null || newData[propName] === undefined) {
        delete newData[propName]
      }
    }

    let storage = JSON.parse(localStorage.getItem(USER_STORAGE))
    storage = { ...storage, ...newData }
    localStorage.setItem(USER_STORAGE, JSON.stringify(storage))
  } catch (error) {
    dispatch(logoutUser())
  }
}

export const requestMiddleware = () => {
  return ({ dispatch, getState }) => next => action => {
    const { request } = action
    let auth = getState().auth
    if (!request) {
      return next(action)
    } else if (!auth.refresh) {
      return request(dispatch)
    }

    // Refresh token if token has been alive for over 4 min
    if (moment() > moment(auth.access.expiration).subtract(1, 'minutes')) {
      dispatch(refreshTokens(auth.refresh.token))
        .then(() => {
          auth = getState().auth
          return request(dispatch, auth.access.token)
        })
        .catch(() => {
          return dispatch(logoutUser())
        })
    } else {
      return request(dispatch, auth.access.token)
    }
  }
}

export const requestWithAuth = request => {
  return {
    type: 'AUTH_REQUEST',
    request: (dispatch, access_token) => request(dispatch, access_token),
  }
}

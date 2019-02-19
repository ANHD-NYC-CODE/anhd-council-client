import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Axios } from 'shared/utilities/Axios'
import { TOKEN_URL, TOKEN_REFRESH_URL } from 'shared/constants/urls'
import MockAdapter from 'axios-mock-adapter'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'

import { GET_TOKEN, GET_USER_PROFILE, GET_TOKEN_REFRESH } from 'shared/constants/actions'

import { loginUser, handleSyncStorage, handleUserLogout, logoutUser, refreshTokens } from 'Store/Auth/actions'
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const store = mockStore({ search: {}, router: {} })
const mock = new MockAdapter(Axios)

beforeEach(() => {
  store.clearActions()
})

describe('loginUser', () => {
  it('on SUCCESS - dispatches GET_TOKEN_PENDING, GET_TOKEN_SUCCESS, _CLEAR_ERRORS HANDLE_USER_LOGIN_SUCCESS', async () => {
    const data = { access: '1234', refresh: 'abcd' }
    const formData = { username: 'test', password: 'test' }
    mock.onPost(TOKEN_URL).reply(200, data)

    await store.dispatch(loginUser(formData)).then(() => {
      const expectedActions = [
        loadingActions.handleRequest(GET_TOKEN),
        errorActions.handleClearErrors(GET_TOKEN),
        loadingActions.handleCompletedRequest(GET_TOKEN),
        handleSyncStorage(null),
        loadingActions.handleRequest(GET_USER_PROFILE),
        errorActions.handleClearErrors(GET_USER_PROFILE),
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('on ERROR - dispatches GET_TOKEN_PENDING, GET_TOKEN_SUCCESS, GET_TOKEN_FAILURE and HANDLE_ERROR_RESPONSE', async () => {
    const errorData = { non_field_errors: ['no username/password'] }
    const errorResponse = { status: 400, data: errorData }
    const formData = { username: 'test', password: 'test' }
    mock.onPost(TOKEN_URL).reply(400, errorData)

    await store.dispatch(loginUser(formData)).then(() => {
      const expectedActions = [
        loadingActions.handleRequest(GET_TOKEN),
        errorActions.handleClearErrors(GET_TOKEN),
        loadingActions.handleCompletedRequest(GET_TOKEN),
        errorActions.handleFailure(GET_TOKEN, errorResponse.status, errorResponse.data.non_field_errors[0]),
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('logoutUser', () => {
  it('on SUCCESS - dispatches HANDLE_USER_LOGOUT', async () => {
    store.dispatch(logoutUser())
    const expectedActions = [handleUserLogout()]
    expect(store.getActions()).toEqual(expectedActions)
  })
})

describe('refreshTokens', () => {
  it('on SUCCESS - dispatches GET_TOKEN_REFRESH_PENDING, GET_TOKEN_REFRESH_SUCCESS, GET_TOKEN_REFRESH_CLEAR_ERRORS HANDLE_USER_LOGIN_SUCCESS', async () => {
    const tokens = { refresh_token: 'abcd' }
    const data = { access: '4321', refresh: 'zyxw' }
    mock.onPost(TOKEN_REFRESH_URL).reply(200, data)

    await store.dispatch(refreshTokens(tokens)).then(() => {
      const expectedActions = [
        loadingActions.handleRequest(GET_TOKEN_REFRESH),
        errorActions.handleClearErrors(GET_TOKEN_REFRESH),
        loadingActions.handleCompletedRequest(GET_TOKEN_REFRESH),
        handleSyncStorage(null),
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('on ERROR - dispatches GET_TOKEN_REFRESH_PENDING, GET_TOKEN_REFRESH_CLEAR_ERRORS, GET_TOKEN_COMPLETE, GET_TOKEN_REFRESH_FAILURE, HANDLE_ERROR_RESPONSE, HANDLE_USER_LOGOUT', async () => {
    const tokens = { refresh_token: 'abcd' }
    const errorData = { non_field_errors: ['no username/password'] }
    const errorResponse = { status: 401, data: errorData }
    mock.onPost(TOKEN_REFRESH_URL).reply(401, errorData)

    await store.dispatch(refreshTokens(tokens)).then(() => {
      const expectedActions = [
        loadingActions.handleRequest(GET_TOKEN_REFRESH),
        errorActions.handleClearErrors(GET_TOKEN_REFRESH),
        loadingActions.handleCompletedRequest(GET_TOKEN_REFRESH),
        errorActions.handleFailure(GET_TOKEN_REFRESH, errorResponse.status, errorResponse.data.non_field_errors[0]),
        handleUserLogout(),
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

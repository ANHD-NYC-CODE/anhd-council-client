import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Axios } from 'shared/utilities/Axios'
import * as c from 'shared/constants'
import { TOKEN_URL, TOKEN_REFRESH_URL } from 'shared/constants/urls'
import { getUserStorageData } from 'shared/utilities/storageUtils'
import MockAdapter from 'axios-mock-adapter'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'
import { push } from 'connected-react-router'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { setCustomSearchResults, resetAdvancedSearchReducer } from 'Store/AdvancedSearch/actions'

import { GET_TOKEN, GET_TOKEN_REFRESH } from 'shared/constants/actions'
import * as u from 'shared/utilities/constantUtils'

import {
  loginUser,
  getUserProfile,
  handleSyncStorage,
  handleUserLogout,
  logoutUser,
  refreshTokens,
} from 'Store/Auth/actions'
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
      expect(store.getActions()).toHaveLength(5)

      expect(
        store.getActions().find(action => action.type === u.createPendingRequestConstant(c.GET_TOKEN))
      ).toBeDefined()

      expect(
        store.getActions().find(action => action.type === u.createClearedErrorsConstant(c.GET_TOKEN))
      ).toBeDefined()

      expect(
        store.getActions().find(action => action.type === u.createCompletedRequestConstant(c.GET_TOKEN))
      ).toBeDefined()

      expect(store.getActions().find(action => action.type === c.HANDLE_SYNC_STORAGE)).toBeDefined()

      expect(store.getActions().find(action => action.type === c.AUTH_REQUEST)).toBeDefined()
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
        errorActions.handleFailure(GET_TOKEN, errorResponse.status, 'Incorrect username or password.'),
        loadingActions.handleCompletedRequest(GET_TOKEN),
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('logoutUser', () => {
  it('on SUCCESS - dispatches HANDLE_USER_LOGOUT', async () => {
    store.dispatch(logoutUser())
    const expectedActions = [handleUserLogout(), setCustomSearchResults([]), resetAdvancedSearchReducer()]
    expect(store.getActions()).toEqual(expectedActions)
  })
})

describe('refreshTokens', () => {
  it('on SUCCESS - dispatches GET_TOKEN_REFRESH_PENDING, GET_TOKEN_REFRESH_SUCCESS, GET_TOKEN_REFRESH_CLEAR_ERRORS HANDLE_SYNC_STORAGE', async () => {
    const token = { refresh_token: 'abcd' }
    const data = { access: '4321', refresh: 'zyxw' }
    mock.onPost(TOKEN_REFRESH_URL).reply(200, data)

    await store.dispatch(refreshTokens(token)).then(() => {
      expect(store.getActions()).toHaveLength(4)

      expect(
        store.getActions().find(action => action.type === u.createPendingRequestConstant(c.GET_TOKEN_REFRESH))
      ).toBeDefined()

      expect(
        store.getActions().find(action => action.type === u.createClearedErrorsConstant(c.GET_TOKEN_REFRESH))
      ).toBeDefined()

      expect(
        store.getActions().find(action => action.type === u.createCompletedRequestConstant(c.GET_TOKEN_REFRESH))
      ).toBeDefined()

      expect(store.getActions().find(action => action.type === c.HANDLE_SYNC_STORAGE)).toBeDefined()
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
        errorActions.handleFailure(GET_TOKEN_REFRESH, errorResponse.status, 'Please login for access.'),
        loadingActions.handleCompletedRequest(GET_TOKEN_REFRESH),
        handleUserLogout(),
        setCustomSearchResults([]),
        resetAdvancedSearchReducer(),
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

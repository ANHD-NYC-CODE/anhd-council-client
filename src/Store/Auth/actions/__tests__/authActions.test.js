import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Axios } from 'shared/utilities/Axios'
import { TOKEN_URL } from 'shared/constants/urls'
import MockAdapter from 'axios-mock-adapter'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'

import { GET_TOKEN } from 'shared/constants/actions'

import { loginUser, handleGetToken, handleGetUser } from 'Store/Auth/actions'
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const store = mockStore({ search: {}, router: {} })
const mock = new MockAdapter(Axios)

beforeEach(() => {
  store.clearActions()
})

describe('queryBuildingAddress', () => {
  it('on SUCCESS - dispatches GET_TOKEN_PENDING, GET_TOKEN_SUCCESS, HANDLE_READ_SEARCH_RESPONSE', async () => {
    const data = { access: '1234', refresh: 'abcd' }
    const formData = { username: 'test', password: 'test' }
    mock.onPost(TOKEN_URL).reply(200, data)

    await store.dispatch(loginUser(formData)).then(() => {
      const expectedActions = [
        loadingActions.handleRequest(GET_TOKEN),
        errorActions.handleClearErrors(GET_TOKEN),
        loadingActions.handleCompletedRequest(GET_TOKEN),
        handleGetToken({ data: data }),
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

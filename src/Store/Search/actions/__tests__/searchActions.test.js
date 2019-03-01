import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Axios } from 'shared/utilities/Axios'
import { SEARCH_URL } from 'shared/constants/urls'
import MockAdapter from 'axios-mock-adapter'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'

import { GET_BUILDING_SEARCH } from 'shared/constants/actions'

import { queryBuildingAddress, handleReadSearchResponse } from '../index.js'
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const store = mockStore({ search: {}, router: {} })
const mock = new MockAdapter(Axios)

beforeEach(() => {
  store.clearActions()
})

describe('queryBuildingAddress', () => {
  it('on ERROR - dispatches GET_BUILDING_SEARCH_CANCEL, GET_BUILDING_SEARCH_PENDING, GET_BUILDING_SEARCH_FAILURE, HANDLE_ERROR_RESPONSE, GET_BUILDING_SEARCH_COMPLETE', async () => {
    const errorData = { detail: 'forbidden' }
    const errorResponse = { status: 400, data: errorData }
    mock.onGet(SEARCH_URL).reply(400, errorData)

    await store.dispatch(queryBuildingAddress('50 broad')).then(() => {
      const expectedActions = [
        loadingActions.handleCancelRequests(GET_BUILDING_SEARCH),
        loadingActions.handleRequest(GET_BUILDING_SEARCH),
        errorActions.handleClearErrors(GET_BUILDING_SEARCH),
        errorActions.handleFailure(GET_BUILDING_SEARCH, errorResponse.status, 'Incorrect username or password.'),
        loadingActions.handleCompletedRequest(GET_BUILDING_SEARCH),
      ]

      const actions = store.getActions().map(a => a.type)
      const expected = expectedActions.map(a => a.type)
      expect(actions).toEqual(expected)
    })
  })
})

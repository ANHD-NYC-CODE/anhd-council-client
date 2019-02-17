import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Axios } from 'shared/utilities/Axios'
import { SEARCH_URL } from 'shared/constants/urls'
import MockAdapter from 'axios-mock-adapter'
import * as loading from 'Store/Loading/actions'
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
  it('on SUCCESS - dispatches GET_BUILDING_SEARCH_REQUEST, GET_BUILDING_SEARCH_SUCCESS, HANDLE_READ_SEARCH_RESPONSE', async () => {
    const data = { results: [] }
    mock.onGet(SEARCH_URL).reply(200, data)

    await store.dispatch(queryBuildingAddress('50 broad')).then(() => {
      const expectedActions = [
        loading.handleRequest(GET_BUILDING_SEARCH),
        loading.handleCompletedRequest(GET_BUILDING_SEARCH),
        handleReadSearchResponse({ data: data }),
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('on ERROR - dispatches GET_BUILDING_SEARCH_REQUEST, GET_BUILDING_SEARCH_FAILURE and HANDLE_ERROR_RESPONSE on error', async () => {
    const errorData = { results: 'forbidden' }
    const errorResponse = { status: 400, data: errorData }
    mock.onGet(SEARCH_URL).reply(400, errorData)

    await store.dispatch(queryBuildingAddress('50 broad')).then(() => {
      const expectedActions = [
        loading.handleRequest(GET_BUILDING_SEARCH),
        loading.handleCompletedRequest(GET_BUILDING_SEARCH),
        errorActions.handleFailure(GET_BUILDING_SEARCH, errorResponse),
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

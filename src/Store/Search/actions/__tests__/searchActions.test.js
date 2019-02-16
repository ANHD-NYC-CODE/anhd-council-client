import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Axios } from 'shared/utilities/Axios'
import { SEARCH_URL } from 'shared/constants/apiUrls'
import MockAdapter from 'axios-mock-adapter'

import {
  queryBuildingAddress,
  handleReadSearchResponse,
  awaitingSearchResponse,
  handleErrorResponse,
} from '../index.js'
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const store = mockStore({ search: {}, router: {} })
const mock = new MockAdapter(Axios)

beforeEach(() => {
  store.clearActions()
})

describe('queryBuildingAddress', () => {
  it('dispatches AWAITING_SEARCH_RESPONSE, HANDLE_READ_SEARCH_RESPONSE on success', async () => {
    const data = { results: [] }
    mock.onGet(SEARCH_URL).reply(200, data)

    await store.dispatch(queryBuildingAddress('50 broad')).then(() => {
      const expectedActions = [awaitingSearchResponse(), handleReadSearchResponse({ data: data })]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('dispatches AWAITING_SEARCH_RESPONSE and HANDLE_ERROR_RESPONSE on error', async () => {
    const errorData = {
      results: 'hello',
    }

    mock.onGet(SEARCH_URL).reply(500, errorData)

    await store.dispatch(queryBuildingAddress('50 broad')).then(() => {
      const expectedActions = [awaitingSearchResponse(), handleErrorResponse({ status: 500, data: errorData })]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Axios } from 'shared/utilities/Axios'
import MockAdapter from 'axios-mock-adapter'
import { BUILDING_URL } from 'shared/constants/urls'
import { GET_BUILDING } from 'Store/Building/constants'
import { handleGetBuilding } from 'Store/Building/actions'
import * as l from 'Store/Loading/actions'
import * as e from 'Store/Error/actions'

import { constructAxiosGet } from 'shared/utilities/Axios'
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

let store = mockStore({ search: {}, router: {}, loading: { requests: [] } })
const mock = new MockAdapter(Axios)

beforeEach(() => {
  store.clearActions()
})

describe('constructAxiosGet', () => {
  it('on SUCCESS - dispatches handleRequest, handleClearErrors, handleCompletedRequest, and the reducer callback', async () => {
    const data = { bin: '2' }
    const url = BUILDING_URL
    mock.onGet(url).reply(200, data)
    const requestId = 100
    store = mockStore({ search: {}, router: {}, loading: { requests: [{ name: 'GET_BUILDING', id: requestId }] } })

    await constructAxiosGet(
      store.dispatch,
      store.getState,
      requestId,
      url,
      null,
      null,
      GET_BUILDING,
      handleGetBuilding
    ).then(() => {
      const expectedActions = [
        l.handleRequest(GET_BUILDING, requestId),
        e.handleClearErrors(GET_BUILDING),
        handleGetBuilding({ data }),
        l.handleCompletedRequest(GET_BUILDING, requestId),
      ]
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('on ERROR - dispatches handleRequest, handleClearErrors, handleCompletedRequest, and the reducer callback', async () => {
    const url = BUILDING_URL
    mock.onGet(url).reply(500, { results: 'oops!' })
    const requestId = 100
    store = mockStore({ search: {}, router: {}, loading: { requests: [{ name: 'GET_BUILDING', id: requestId }] } })

    await constructAxiosGet(
      store.dispatch,
      store.getState,
      requestId,
      url,
      null,
      null,
      GET_BUILDING,
      handleGetBuilding
    ).then(() => {
      const expectedActions = [
        l.handleRequest(GET_BUILDING, requestId),
        e.handleClearErrors(GET_BUILDING),
        e.handleFailure(GET_BUILDING, 500, 'oops!'),
        l.handleCompletedRequest(GET_BUILDING, requestId),
      ]
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
  // Prevent stale requests from updating the store
  it('WITH INVALID REQUESTID - dispatches handleRequest, handleClearErrors, and nothing else', async () => {
    const data = { bin: '2' }
    const url = BUILDING_URL
    mock.onGet(url).reply(200, data)
    const requestId = 100
    store = mockStore({
      search: {},
      router: {},
      loading: { requests: [{ name: 'GET_BUILDING', id: 'INVALID REQUEST ID' }] },
    })

    await constructAxiosGet(
      store.dispatch,
      store.getState,
      requestId,
      url,
      null,
      null,
      GET_BUILDING,
      handleGetBuilding
    ).then(() => {
      const expectedActions = [l.handleRequest(GET_BUILDING, requestId), e.handleClearErrors(GET_BUILDING)]
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Axios } from 'shared/utilities/Axios'
import { BUILDING_URL } from 'shared/constants/urls'
import MockAdapter from 'axios-mock-adapter'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'

import { GET_BUILDING } from 'Store/Building/constants'

import { getBuilding, handleGetBuilding } from '../index.js'
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const store = mockStore({ search: {}, router: {} })
const mock = new MockAdapter(Axios)

beforeEach(() => {
  store.clearActions()
})

describe('getBuilding', () => {
  it('on ERROR - dispatches GET_BUILDING_CANCEL, GET_BUILDING_PENDING, GET_BUILDING_FAILURE, GET_BUILDING_HANDLE_ERROR_RESPONSE, GET_BUILDING_COMPLETE', async () => {
    const errorData = { results: 'oops' }
    const errorResponse = { status: 500, data: errorData }
    const id = '1'
    mock.onGet(`${BUILDING_URL}${id}`).reply(500, errorData)

    await store.dispatch(getBuilding(id)).then(() => {
      const expectedActions = [
        loadingActions.handleCancelRequests(GET_BUILDING),
        loadingActions.handleRequest(GET_BUILDING),
        errorActions.handleClearErrors(GET_BUILDING),
        errorActions.handleFailure(GET_BUILDING, errorResponse.status, 'oops'),
        loadingActions.handleCompletedRequest(GET_BUILDING),
      ]

      const actions = store.getActions().map(a => a.type)
      const expected = expectedActions.map(a => a.type)
      expect(actions).toEqual(expected)
    })
  })
})

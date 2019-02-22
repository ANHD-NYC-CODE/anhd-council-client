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
  it('on SUCCESS - dispatches GET_BUILDING_PENDING, GET_BUILDING_SUCCESS, HANDLE_READ_RESPONSE', async () => {
    const data = { bin: '1234' }
    const id = '1'
    mock.onGet(`${BUILDING_URL}${id}`).reply(200, data)

    await store.dispatch(getBuilding(id)).then(() => {
      const expectedActions = [
        loadingActions.handleRequest(GET_BUILDING),
        errorActions.handleClearErrors(GET_BUILDING),
        loadingActions.handleCompletedRequest(GET_BUILDING),
        handleGetBuilding({ data }),
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Axios } from 'shared/utilities/Axios'
import MockAdapter from 'axios-mock-adapter'
import { setupStore, configuredState, flushAllPromises } from 'shared/testUtilities'
import { history } from 'Store/configureStore'
import ConfigContext from 'Config/ConfigContext'
import { ConnectedRouter } from 'connected-react-router'

import { Provider } from 'react-redux'

const mock = new MockAdapter(Axios)

import AlertMap from 'AlertMap'

configure({ adapter: new Adapter() })
beforeEach(() => {
  jest.useFakeTimers()
})
afterEach(() => {
  jest.runAllTimers()
})

const setupWrapper = state => {
  state = configuredState(state)
  const store = setupStore({ ...state })
  const wrapper = mount(
    <Provider store={store}>
      <ConfigContext.Provider
        value={{
          datasets: state.dataset.datasets,
          datasetModels: state.dataset.datasetModels,
          housingTypeModels: state.dataset.housingTypeModels,
          communityDistricts: state.community.boards,
          councilDistricts: state.council.districts,
        }}
      >
        <ConnectedRouter history={history}>
          <AlertMap />
        </ConnectedRouter>
      </ConfigContext.Provider>
    </Provider>
  )
  return [wrapper, store]
}

describe('AlertMap', () => {
  it('has initial state', () => {
    const [wrapper, store] = setupWrapper()
    expect(wrapper.find('AlertMap')).toBeDefined()
    expect(store.getState().router.location.pathname).toEqual('/map')
  })

  describe('with a geography type and id', () => {
    it('sets the currentGeographyType and currentGeographyId', async () => {
      const [wrapper, store] = setupWrapper({
        router: { location: { pathname: '/council/1' }, action: 'POP' },
      })
      await flushAllPromises()
      wrapper.update()
      expect(wrapper.find('AlertMap')).toBeDefined()
      expect(store.getState().router.location.pathname).toEqual('/council/1')
      expect(store.getState().appState.currentGeographyType).toEqual('COUNCIL')
      expect(store.getState().appState.currentGeographyId).toEqual('1')
    })

    it('renders the request wrappers', async () => {
      const [wrapper, store] = setupWrapper({
        router: { location: { pathname: '/council/1' }, action: 'POP' },
      })
      await flushAllPromises()
      wrapper.update()
      expect(wrapper.find('RequestWrapper')).toHaveLength(5)
    })
  })
})

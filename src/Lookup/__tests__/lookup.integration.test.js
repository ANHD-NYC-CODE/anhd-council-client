import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Axios } from 'shared/utilities/Axios'
import MockAdapter from 'axios-mock-adapter'
import { setupStore, configuredState, flushAllPromises } from 'shared/testUtilities'
import { history } from 'Store/configureStore'

import { push, ConnectedRouter, connectRouter } from 'connected-react-router'

import { Provider } from 'react-redux'
import ConfigContext from 'Config/ConfigContext'

const mock = new MockAdapter(Axios)

import Lookup from 'Lookup'

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
      <ConnectedRouter history={history}>
        <Lookup />
      </ConnectedRouter>
    </Provider>
  )
  return [wrapper, store]
}

describe('Lookup', () => {
  it('has initial state', () => {
    const [wrapper, store] = setupWrapper()
    expect(wrapper.find('Lookup')).toBeDefined()
    expect(store.getState().router.location.pathname).toEqual('/lookup')
  })

  describe('with a bbl', () => {
    it('sets the currentProperty', async () => {
      const [wrapper, store] = setupWrapper()
      store.dispatch(push('/property/1'))
      wrapper.update()
      await flushAllPromises()
      wrapper.update()
      expect(wrapper.find('Lookup')).toBeDefined()
      expect(store.getState().router.location.pathname).toEqual('/property/1')
      expect(store.getState().appState.currentProperty).toEqual('1')
    })
  })
})

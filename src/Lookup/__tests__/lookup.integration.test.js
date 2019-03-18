import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Axios } from 'shared/utilities/Axios'
import MockAdapter from 'axios-mock-adapter'
import { setupStore, configuredState, flushAllPromises } from 'shared/testUtilities'
import { history } from 'Store/configureStore'

import { ConnectedRouter } from 'connected-react-router'

import { Provider } from 'react-redux'

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
      const [wrapper, store] = setupWrapper({
        router: { location: { pathname: '/property/1' }, action: 'POP' },
      })
      await flushAllPromises()
      wrapper.update()
      expect(wrapper.find('Lookup')).toBeDefined()
      expect(store.getState().router.location.pathname).toEqual('/property/1')
      expect(store.getState().appState.currentProperty).toEqual('1')
      expect(store.getState().appState.currentBuilding).toEqual(undefined)
    })

    it('renders the request wrappers', async () => {
      const [wrapper, store] = setupWrapper({
        router: { location: { pathname: '/property/1' }, action: 'POP' },
      })
      await flushAllPromises()
      wrapper.update()
      expect(wrapper.find('RequestWrapper')).toHaveLength(11)
    })
  })

  describe('with a bbl and bin', () => {
    it('sets the currentProperty', () => {
      const [wrapper, store] = setupWrapper({
        router: { location: { pathname: '/property/1/building/2' }, action: 'POP' },
      })

      expect(wrapper.find('Lookup')).toBeDefined()
      expect(store.getState().router.location.pathname).toEqual('/property/1/building/2')
      expect(store.getState().appState.currentProperty).toEqual('1')
      expect(store.getState().appState.currentBuilding).toEqual('2')
    })

    it('renders the request wrappers', () => {
      const [wrapper, store] = setupWrapper({
        router: { location: { pathname: '/property/1/building/2' }, action: 'POP' },
      })

      expect(wrapper.find('RequestWrapper')).toHaveLength(8)
      expect(
        wrapper
          .find('RequestWrapper')
          .at(0)
          .props().visible
      ).toEqual(true)
      wrapper.find('RequestWrapper').forEach((w, index) => {
        if (index === 0) return
        expect(w.props().visible).toEqual(false)
      })
    })

    it('renders the request summaries', () => {
      const [wrapper, store] = setupWrapper({
        router: { location: { pathname: '/property/1/building/2' }, action: 'POP' },
      })

      expect(wrapper.find('RequestSummary')).toHaveLength(8)
    })

    it('Switches the visible request wrapper', () => {
      const [wrapper, store] = setupWrapper({
        router: { location: { pathname: '/property/1/building/2' }, action: 'POP' },
      })

      wrapper
        .find('RequestSummary')
        .at(1)
        .simulate('click')

      wrapper.update()
      expect(
        wrapper
          .find('RequestWrapper')
          .at(0)
          .props().visible
      ).toEqual(false)
      expect(
        wrapper
          .find('RequestWrapper')
          .at(1)
          .props().visible
      ).toEqual(true)
    })
  })
})

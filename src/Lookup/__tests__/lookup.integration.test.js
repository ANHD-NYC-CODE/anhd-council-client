import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Axios } from 'shared/utilities/Axios'
import MockAdapter from 'axios-mock-adapter'
import { setupStore, configuredState, flushAllPromises } from 'shared/testUtilities'
import { history } from 'Store/configureStore'
import ConfigContext from 'Config/ConfigContext'
import Config from 'Config'
import LayoutContext from 'Layout/LayoutContext'
import { createPropertyRequestMock } from 'shared/testUtilities/mocks'
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
        <Config>
          <LayoutContext.Provider value={{ print: false }}>
            <ConfigContext.Consumer>
              {config => {
                return <Lookup config={config} />
              }}
            </ConfigContext.Consumer>
          </LayoutContext.Provider>
        </Config>
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
    expect(wrapper.find('LookupIndex')).toHaveLength(1)
    expect(wrapper.find('LookupRequestsWrapper')).toHaveLength(0)
    expect(wrapper.find('LookupShow')).toHaveLength(0)
  })

  describe('with a bbl', () => {
    it('sets the currentProperty', () => {
      const [wrapper, store] = setupWrapper({
        router: { location: { pathname: '/property/1' }, action: 'POP' },
      })

      expect(wrapper.find('LookupIndex')).toHaveLength(0)
      expect(wrapper.find('LookupRequestsWrapper')).toHaveLength(1)
      expect(wrapper.find('LookupShow')).toHaveLength(1)

      expect(store.getState().router.location.pathname).toEqual('/property/1')
      expect(store.getState().appState.currentProperty).toEqual('1')
      expect(store.getState().appState.currentBuilding).toEqual(undefined)
    })

    it('renders the request wrappers', async () => {
      mock.onGet('/properties/1/').reply(200, createPropertyRequestMock({ bbl: '1' }))

      const [wrapper, store] = setupWrapper({
        router: { location: { pathname: '/property/1' }, action: 'POP' },
      })
      await flushAllPromises()
      wrapper.update()
      expect(wrapper.find('RequestTableWrapper')).toHaveLength(12)
    })
  })

  describe('with a bbl and bin', () => {
    it('sets the currentProperty and currentBuilding', () => {
      const [wrapper, store] = setupWrapper({
        router: { location: { pathname: '/property/1/building/2' }, action: 'POP' },
      })

      expect(wrapper.find('Lookup')).toBeDefined()
      expect(store.getState().router.location.pathname).toEqual('/property/1/building/2')
      expect(wrapper.find('LookupIndex')).toHaveLength(0)
      expect(wrapper.find('LookupRequestsWrapper')).toHaveLength(1)
      expect(wrapper.find('LookupShow')).toHaveLength(1)
      expect(store.getState().appState.currentProperty).toEqual('1')
      expect(store.getState().appState.currentBuilding).toEqual('2')
    })

    it('renders the request wrappers', () => {
      const [wrapper] = setupWrapper({
        router: { location: { pathname: '/property/1/building/2' }, action: 'POP' },
      })

      expect(wrapper.find('RequestTableWrapper')).toHaveLength(12)

      wrapper.find('RequestTableWrapper').forEach((w, index) => {
        if (index === 0 || index === 1) {
          expect(w.props().visible).toEqual(true)
        } else {
          expect(w.props().visible).toEqual(false)
        }
      })
    })

    it('renders the request summaries', () => {
      const [wrapper] = setupWrapper({
        router: { location: { pathname: '/property/1/building/2' }, action: 'POP' },
      })

      expect(wrapper.find('RequestSummaryWrapper')).toHaveLength(11)
    })

    it('renders dataset info sentence', () => {
      const [wrapper] = setupWrapper({
        router: { location: { pathname: '/property/1/building/2' }, action: 'POP' },
      })

      expect(
        wrapper
          .find('DatasetInfo')
          .at(0)
          .text()
      ).toEqual("This dataset's range is from 01/01/2018 to 01/01/2019.")
    })

    it('Switches the visible request wrapper', () => {
      const [wrapper] = setupWrapper({
        router: { location: { pathname: '/property/1/building/2' }, action: 'POP' },
      })

      expect(
        wrapper
          .findWhere(node => node.key() && node.key().includes('ACRIS_REAL_MASTER'))
          .find('RequestTableWrapper')
          .props().visible
      ).toEqual(true)

      wrapper
        .findWhere(node => node.key() && node.key().includes('HPD_VIOLATION'))
        .find('button.summary-result-card')
        .simulate('click')

      wrapper.update()
      expect(
        wrapper
          .findWhere(node => node.key() && node.key().includes('ACRIS_REAL_MASTER'))
          .find('RequestTableWrapper')
          .props().visible
      ).toEqual(false)
      expect(
        wrapper
          .findWhere(node => node.key() && node.key().includes('HPD_VIOLATION'))
          .find('RequestTableWrapper')
          .props().visible
      ).toEqual(true)
    })

    it('updates the request card summaries when data is received', async () => {
      const results = [{ bin: 2 }, { bin: 2 }, { bin: 2 }]
      mock.onGet('/buildings/2/hpdviolations/').reply(200, results)
      mock.onGet('/buildings/2/hpdcomplaints/').reply(200, results)
      mock.onGet('/buildings/2/dobviolations/').reply(200, results)
      mock.onGet('/buildings/2/dobcomplaints/').reply(200, results)
      mock.onGet('/buildings/2/hpdcomplaints/').reply(200, results)
      mock.onGet('/buildings/2/ecbviolations/').reply(200, results)
      mock.onGet('/buildings/2/dobfiledermits/').reply(200, results)
      mock.onGet('/buildings/2/dobissuedpermits/').reply(200, results)
      mock.onGet('/buildings/2/housinglitigations/').reply(200, results)

      const [wrapper] = setupWrapper({
        router: { location: { pathname: '/property/1/building/2' }, action: 'POP' },
      })

      await flushAllPromises()
      wrapper.update()

      wrapper.find('RequestSummaryWrapper').forEach(rs => {
        expect(rs.text()).toMatch(new RegExp(results.length))
      })
    })
    it('updates the tables when data is received', async () => {
      const results = [{ bin: 2 }, { bin: 2 }, { bin: 2 }]
      mock.onGet('/buildings/2/hpdviolations/').reply(200, results)
      mock.onGet('/buildings/2/hpdcomplaints/').reply(200, results)
      mock.onGet('/buildings/2/dobviolations/').reply(200, results)
      mock.onGet('/buildings/2/dobcomplaints/').reply(200, results)
      mock.onGet('/buildings/2/hpdcomplaints/').reply(200, results)
      mock.onGet('/buildings/2/ecbviolations/').reply(200, results)
      mock.onGet('/buildings/2/dobfiledermits/').reply(200, results)
      mock.onGet('/buildings/2/dobissuedpermits/').reply(200, results)
      mock.onGet('/buildings/2/housinglitigations/').reply(200, results)

      const [wrapper] = setupWrapper({
        router: { location: { pathname: '/property/1/building/2' }, action: 'POP' },
      })

      await flushAllPromises()
      wrapper.update()

      wrapper.find('.request-wrapper-container table').forEach(table => {
        expect(table.find('tbody tr')).toHaveLength(results.length)
      })
    })
  })
})

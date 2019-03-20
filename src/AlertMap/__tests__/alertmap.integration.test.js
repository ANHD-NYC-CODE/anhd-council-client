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
    expect(wrapper.find('AlertMapIndex')).toHaveLength(1)
    expect(wrapper.find('AlertMapRequestsWrapper')).toHaveLength(0)
    expect(wrapper.find('AlertMapShow')).toHaveLength(0)
  })

  describe('with a geography type and id', () => {
    it('sets the currentGeographyType and currentGeographyId', () => {
      const [wrapper, store] = setupWrapper({
        router: { location: { pathname: '/council/1' }, action: 'POP' },
      })

      expect(wrapper.find('AlertMap')).toBeDefined()
      expect(store.getState().router.location.pathname).toEqual('/council/1')
      expect(store.getState().appState.currentGeographyType).toEqual('COUNCIL')
      expect(store.getState().appState.currentGeographyId).toEqual('1')
      expect(wrapper.find('AlertMapIndex')).toHaveLength(0)
      expect(wrapper.find('AlertMapShow')).toHaveLength(1)
      expect(wrapper.find('GeographySelect')).toHaveLength(1)
      expect(wrapper.find('ToggleButtonGroup')).toHaveLength(2)
      expect(wrapper.find('GeographyProfile')).toHaveLength(1)
      expect(wrapper.find('LeafletMap')).toHaveLength(1)
    })

    describe('map view', () => {
      it('renders the map, not tables', async () => {
        const [wrapper, store] = setupWrapper({
          router: { location: { pathname: '/council/1' }, action: 'POP' },
        })
        expect(wrapper.find('ToggleButtonGroup')).toHaveLength(2)
        expect(wrapper.find('LeafletMap')).toHaveLength(1)
        expect(wrapper.find('RequestSummary')).toHaveLength(10)
        expect(wrapper.find('RequestWrapper')).toHaveLength(0)
      })
    })

    describe('table view', () => {
      it('renders the tables, not map', () => {
        const [wrapper, store] = setupWrapper({
          router: { location: { pathname: '/council/1' }, action: 'POP' },
        })

        wrapper
          .find('input[name="view"]')
          .at(1)
          .simulate('change', { target: { checked: true } })
        wrapper.update()
        expect(wrapper.find('ToggleButtonGroup')).toHaveLength(2)
        expect(wrapper.find('GeographySelect')).toHaveLength(1)
        expect(wrapper.find('LeafletMap')).toHaveLength(0)
        expect(wrapper.find('RequestWrapper')).toHaveLength(10)
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

      it('updates the request card summaries when data is received', async () => {
        const results = [{ bbl: 1, unitsres: 1 }, { bbl: 2, unitsres: 1 }, { bbl: 3, unitsres: 1 }]
        mock.onGet('/councils/1/properties/').reply(200, results)
        const [wrapper, store] = setupWrapper({
          router: { location: { pathname: '/council/1' }, action: 'POP' },
        })

        await flushAllPromises()
        wrapper.update()
        wrapper.find('RequestSummary').forEach(rs => {
          expect(rs.text()).toMatch(new RegExp(results.length))
        })
      })

      it('updates the tables when data is received', async () => {
        const results = [
          { bbl: 1, unitsres: 1 },
          { bbl: 2, unitsres: 1 },
          { bbl: 3, unitsres: 1 },
          { bbl: 4, unitsres: 1 },
        ]
        mock.onGet('/councils/1/properties/').reply(200, results)
        const [wrapper, store] = setupWrapper({
          router: { location: { pathname: '/council/1' }, action: 'POP' },
        })

        await flushAllPromises()
        wrapper.update()
        wrapper.find('table').forEach(table => {
          expect(table.find('tbody tr')).toHaveLength(results.length)
        })
      })

      it('Switches the visible request wrapper', () => {
        const [wrapper, store] = setupWrapper({
          router: { location: { pathname: '/council/1' }, action: 'POP' },
        })

        wrapper
          .find('input[name="view"]')
          .at(1)
          .simulate('change', { target: { checked: true } })

        expect(wrapper.findWhere(node => node.key() === 'request-wrapper-0').props().visible).toEqual(true)

        wrapper.findWhere(node => node.key() === 'request-summary-1').simulate('click')

        wrapper.update()
        expect(wrapper.findWhere(node => node.key() === 'request-wrapper-0').props().visible).toEqual(false)
        expect(wrapper.findWhere(node => node.key() === 'request-wrapper-1').props().visible).toEqual(true)
      })
    })
  })
})

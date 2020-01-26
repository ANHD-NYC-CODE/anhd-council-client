import React from 'react'
import { configure, mount } from 'enzyme'
import * as c from 'shared/constants'

import Adapter from 'enzyme-adapter-react-16'
import { Axios } from 'shared/utilities/Axios'
import MockAdapter from 'axios-mock-adapter'
import { setupStore, configuredState, flushAllPromises } from 'shared/testUtilities'
import { history } from 'Store/configureStore'
import Config from 'Config'
import ConfigContext from 'Config/ConfigContext'
import UserContext from 'Auth/UserContext'
import LayoutContext from 'Layout/LayoutContext'
import { createPropertyRequestMock } from 'shared/testUtilities/mocks'
import { ConnectedRouter } from 'connected-react-router'
import TableConfig from 'shared/classes/TableConfig'
import DataRequest from 'shared/classes/DataRequest'
import * as appStateReducer from 'Store/AppState/reducers'
import { mockSetupResourceModels } from 'shared/testUtilities/index.js'
import { setAppState } from 'Store/AppState/actions'
import ApiMap from 'shared/classes/ApiMap'
const resourceModels = mockSetupResourceModels()

import sinon from 'sinon'
import { Provider } from 'react-redux'

const mock = new MockAdapter(Axios)

import DistrictDashboard from 'DistrictDashboard'

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
      <LayoutContext.Provider value={{ print: false }}>
        <UserContext.Provider value={{ user: {} }}>
          <Config>
            <ConnectedRouter history={history}>
              <ConfigContext.Consumer>
                {config => {
                  return <DistrictDashboard config={config} />
                }}
              </ConfigContext.Consumer>
            </ConnectedRouter>
          </Config>
        </UserContext.Provider>
      </LayoutContext.Provider>
    </Provider>
  )
  return [wrapper, store]
}

describe('DistrictDashboard', () => {
  it('has initial state', () => {
    const [wrapper, store] = setupWrapper()

    expect(wrapper.find('DistrictDashboard')).toBeDefined()
    expect(store.getState().router.location.pathname).toEqual('/map')
    expect(wrapper.find('DistrictDashboardIndex')).toHaveLength(1)
    expect(wrapper.find('DistrictDashboardRequestsWrapper')).toHaveLength(0)
    expect(wrapper.find('DistrictDashboardShow')).toHaveLength(0)
    expect(wrapper.findByTestId('geography-select--type', 'select').props().value).toEqual(-1)
  })

  describe('with a geography type and id', () => {
    it('has initial state w/ the currentGeographyType and currentGeographyId', () => {
      const [wrapper, store] = setupWrapper({
        router: { location: { pathname: '/council/1' }, action: 'POP' },
      })

      const results = [
        createPropertyRequestMock({ bbl: 1, unitsres: 1 }),
        createPropertyRequestMock({ bbl: 2, unitsres: 0 }),
        createPropertyRequestMock({ bbl: 3, unitsres: 10 }),
      ]

      mock.onGet('/councils/1/properties/').reply(200, results)

      expect(wrapper.find('DistrictDashboard')).toBeDefined()
      expect(store.getState().router.location.pathname).toEqual('/council/1')
      expect(store.getState().appState.currentGeographyType).toEqual('COUNCIL')
      expect(store.getState().appState.currentGeographyId).toEqual('1')
      expect(wrapper.find('DistrictDashboardIndex')).toHaveLength(0)
      expect(wrapper.find('DistrictDashboardRequestsWrapper')).toHaveLength(1)
      expect(wrapper.find('GeographySelect')).toHaveLength(1)
      expect(wrapper.find('ToggleButtonGroup')).toHaveLength(2)
      expect(wrapper.find('GeographyProfile')).toHaveLength(1)
      expect(wrapper.find('LeafletMap')).toHaveLength(1)

      const housingTypeCards = wrapper.findByTestId('housing-type-radio', 'input')

      expect(housingTypeCards.at(0).props().checked).toEqual(true)

      expect(wrapper.findByTestId('dashboard-show-date-radio', 'input')).toHaveLength(3)
      expect(
        wrapper
          .findByTestId('dashboard-show-date-radio', 'input')
          .at(0)
          .props().checked
      ).toEqual(true)

      expect(wrapper.findByTestId('amount-result-filter')).toHaveLength(6)
      expect(wrapper.findByTestId('dashboard-condition-toggle', 'input')).toHaveLength(2)
      expect(
        wrapper
          .findByTestId('dashboard-condition-toggle', 'input')
          .at(0)
          .props().checked
      ).toEqual(true)

      expect(wrapper.findByTestId('geography-select--type', 'select')).toHaveLength(1)
      expect(wrapper.findByTestId('geography-select--id', 'select')).toHaveLength(1)
      expect(wrapper.findByTestId('dashboard-results-header')).toHaveLength(1)

      expect(wrapper.findByTestId('dashboard-results-editor')).toHaveLength(1)
      expect(wrapper.findByTestId('dashboard-map-table-toggle', 'input')).toHaveLength(2)
      expect(
        wrapper
          .findByTestId('dashboard-map-table-toggle', 'input')
          .at(0)
          .props().checked
      ).toEqual(true)

      expect(wrapper.findByTestId('map')).toHaveLength(1)
      expect(wrapper.findByTestId('base-table')).toHaveLength(1)
      expect(wrapper.findByTestId('geography-profile')).toHaveLength(1)
    })
    describe('geography select', () => {
      it('shows the selected geography values', () => {
        const [wrapper, store] = setupWrapper({
          router: { location: { pathname: '/council/1' }, action: 'POP' },
        })
        expect(wrapper.find('GeographySelect select[name="geographyType"]').props().value).toEqual('COUNCIL')
        expect(wrapper.find('GeographySelect select[name="geographyId"]').props().value).toEqual('1')
        expect(wrapper.find('button.cancel-geography-change')).toHaveLength(0)
        expect(wrapper.find('button.submit-geography-change')).toHaveLength(0)
      })

      it('shows changing configuration', () => {
        const [wrapper, store] = setupWrapper({
          router: { location: { pathname: '/council/1' }, action: 'POP' },
        })
        wrapper
          .find('GeographySelect select[name="geographyType"]')
          .simulate('change', { target: { value: 'COMMUNITY' } })

        wrapper.update()
        expect(wrapper.find('GeographySelect select[name="geographyType"]').props().value).toEqual('COMMUNITY')
        expect(wrapper.find('GeographySelect select[name="geographyId"]').props().value).toEqual(-1)
        expect(wrapper.find('button.cancel-geography-change')).toHaveLength(1)
        expect(wrapper.find('button.submit-geography-change')).toHaveLength(0)
      })

      it('submits the change', () => {
        const [wrapper, store] = setupWrapper()
        wrapper
          .find('GeographySelect select[name="geographyType"]')
          .simulate('change', { target: { value: 'COMMUNITY' } })
        wrapper.find('GeographySelect select[name="geographyId"]').simulate('change', { target: { value: '102' } })
        wrapper.update()
        expect(store.getState().router.location.pathname).toEqual('/community/102')
        expect(wrapper.find('GeographySelect select[name="geographyType"]').props().value).toEqual('COMMUNITY')
        expect(wrapper.find('GeographySelect select[name="geographyId"]').props().value).toEqual('102')
        expect(wrapper.find('button.cancel-geography-change')).toHaveLength(0)
        expect(wrapper.find('button.submit-geography-change')).toHaveLength(0)
      })
    })
    describe('map view', () => {
      it('renders the map', async () => {
        const [wrapper, store] = setupWrapper({
          router: { location: { pathname: '/council/1' }, action: 'POP' },
        })
        expect(wrapper.find('ToggleButtonGroup')).toHaveLength(2)
        expect(wrapper.find('LeafletMap')).toHaveLength(1)
      })
    })

    describe('table view', () => {
      it('renders the tables', () => {
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
        expect(wrapper.find('BaseTable')).toHaveLength(1)
      })

      it('updates the request card summaries when data is received + calculates units', async () => {
        const results = [
          createPropertyRequestMock({ bbl: 1, unitsres: 1 }),
          createPropertyRequestMock({ bbl: 2, unitsres: 0 }),
          createPropertyRequestMock({ bbl: 3, unitsres: 10 }),
        ]
        mock.onGet('/councils/1/properties/').reply(200, results)
        const [wrapper, store] = setupWrapper({
          router: { location: { pathname: '/council/1' }, action: 'POP' },
        })

        await flushAllPromises()
        wrapper.update()
        expect(wrapper.find('.housing-type-section__wrapper').text()).toMatch(
          'All Residential Housing2 properties11 unitsRent Stabilized0 properties0 units0.0% of residential unitsSubsidized Housing0 properties0 units0.0% of residential unitsSmall Homes1 properties1 units9.1% of residential unitsMarket Rate2 properties11 units100.0% of residential unitsPublic Housing0 properties0 units0.0% of residential units'
        )
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
    })
    describe('dataset filters', () => {
      it('Switches the visible request wrapper', () => {
        const [wrapper, store] = setupWrapper({
          router: { location: { pathname: '/council/1' }, action: 'POP' },
        })

        const summaryElement = wrapper.find('RequestSummaryWrapper').at(4)
        wrapper
          .find('RequestSummaryWrapper')
          .at(4)
          .find('button')
          .simulate('click')
        summaryElement.update()
        wrapper.update()
        expect(
          wrapper
            .find('RequestSummaryWrapper')
            .at(4)

            .props().selected
        ).toEqual(true)
      })
    })

    describe('housing type filters', () => {
      it('Switches the results filter', async () => {
        const results = [
          createPropertyRequestMock({ bbl: 1, unitsres: 1 }),
          createPropertyRequestMock({ bbl: 2, unitsres: 1 }),
          createPropertyRequestMock({ bbl: 3, unitsres: 0 }),
          createPropertyRequestMock({ bbl: 4, unitsres: 10 }),
        ]
        mock.onGet('/councils/1/properties/').reply(200, results)
        const [wrapper, store] = setupWrapper({
          router: { location: { pathname: '/council/1' }, action: 'POP' },
        })

        await flushAllPromises()

        wrapper
          .findWhere(node => node.key() === 'housingtype-summary-0')
          .find('button')
          .simulate('click')

        wrapper.update()
        expect(wrapper.find('DistrictResultsTitle').text()).toEqual('Properties Found: 3')
        // 3 residential out of 4
        expect(wrapper.find('BaseTable').find('tbody tr')).toHaveLength(3)

        wrapper
          .findWhere(node => node.key() === 'housingtype-summary-3')
          .find('button')
          .simulate('click')

        wrapper.update()
        // 2 Small homes
        expect(wrapper.find('BaseTable').find('tbody tr')).toHaveLength(2)
        expect(wrapper.find('DistrictResultsTitle').text()).toEqual('Properties Found: 2')
      })
    })
  })
})

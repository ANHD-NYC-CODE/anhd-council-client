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

import { mockSetupResourceModels } from 'shared/testUtilities/index.js'

import MockDate from 'mockdate'

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

      // housing cards
      expect(housingTypeCards.at(0).props().checked).toEqual(true)

      // dates
      expect(wrapper.findByTestId('dashboard-show-date-radio', 'input')).toHaveLength(3)
      expect(
        wrapper
          .findByTestId('dashboard-show-date-radio', 'input')
          .at(0)
          .props().checked
      ).toEqual(true)

      // amounts
      expect(wrapper.findByTestId('amount-result-filter')).toHaveLength(6)
      expect(wrapper.findByTestId('dashboard-condition-toggle', 'input')).toHaveLength(2)
      expect(
        wrapper
          .findByTestId('dashboard-condition-toggle', 'input')
          .at(0)
          .props().checked
      ).toEqual(true)

      // geography select
      expect(wrapper.findByTestId('geography-select--type', 'select')).toHaveLength(1)
      expect(wrapper.findByTestId('geography-select--id', 'select')).toHaveLength(1)

      // header
      expect(wrapper.findByTestId('dashboard-results-header')).toHaveLength(1)

      // editor
      expect(wrapper.findByTestId('dashboard-results-editor')).toHaveLength(1)

      // map toggle
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
        expect(wrapper.findByTestId('geography-select--type', 'select').props().value).toEqual('COUNCIL')
        expect(wrapper.findByTestId('geography-select--id', 'select').props().value).toEqual('1')
        expect(wrapper.find('button.cancel-geography-change')).toHaveLength(0)
        expect(wrapper.find('button.submit-geography-change')).toHaveLength(0)
      })

      it('shows changing configuration', () => {
        const [wrapper, store] = setupWrapper({
          router: { location: { pathname: '/council/1' }, action: 'POP' },
        })
        wrapper.findByTestId('geography-select--type', 'select').simulate('change', { target: { value: 'COMMUNITY' } })

        wrapper.update()
        expect(wrapper.findByTestId('geography-select--type', 'select').props().value).toEqual('COMMUNITY')
        expect(wrapper.findByTestId('geography-select--id', 'select').props().value).toEqual(-1)
        expect(wrapper.find('button.cancel-geography-change')).toHaveLength(1)
        expect(wrapper.find('button.submit-geography-change')).toHaveLength(0)
      })

      it('submits the change', () => {
        const [wrapper, store] = setupWrapper()
        wrapper.findByTestId('geography-select--type', 'select').simulate('change', { target: { value: 'COMMUNITY' } })
        wrapper.findByTestId('geography-select--id', 'select').simulate('change', { target: { value: '102' } })
        wrapper.update()
        expect(store.getState().router.location.pathname).toEqual('/community/102')
        expect(wrapper.findByTestId('geography-select--type', 'select').props().value).toEqual('COMMUNITY')
        expect(wrapper.findByTestId('geography-select--id', 'select').props().value).toEqual('102')
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

        expect(wrapper.findByTestId('housingtype-section', 'form').text()).toMatch(
          'Housing Type:All Residential HousingRent Stabilized (0.0%)Subsidized Housing (0.0%)Small Homes (33.3%)Market Rate (66.7%)Public Housing (0.0%)'
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
        expect(wrapper.findByTestId('base-table').find('tbody tr')).toHaveLength(results.length)
      })
    })
    describe('dataset filters', () => {
      it('Switches the visible request wrapper', async () => {
        MockDate.set('01/01/2019')

        const [wrapper, store] = setupWrapper({
          router: { location: { pathname: '/council/1' }, action: 'POP' },
        })

        const results = [
          createPropertyRequestMock({ bbl: 1, unitsres: 1 }, { 'acrisrealmasters_recent__12/02/2018-01/01/2019': 0 }),
          createPropertyRequestMock({ bbl: 2, unitsres: 0 }, { 'acrisrealmasters_recent__12/02/2018-01/01/2019': 0 }),
          createPropertyRequestMock({ bbl: 3, unitsres: 10 }, { 'acrisrealmasters_recent__12/02/2018-01/01/2019': 10 }),
        ]
        mock.onGet('/councils/1/properties/').reply(200, results)

        await flushAllPromises()
        wrapper.update()
        const summaryElement = wrapper.findByTestId('amount-toggle', 'ReactBootstrapToggle').at(4)
        summaryElement.simulate('click')
        summaryElement.update()
        expect(
          wrapper
            .findByTestId('amount-toggle', 'ReactBootstrapToggle')
            .at(4)
            .props().active
        ).toEqual(true)

        expect(wrapper.find('BaseTable').find('tbody tr')).toHaveLength(1)

        expect(wrapper.findByTestId('dashboard-results-header').text()).toEqual(
          'All Residential HousingProperties: 2Units: 11'
        )

        // amount sentence
        expect(wrapper.findByTestId('dashboard-results-editor').text()).toEqual(
          'Displaying all residential housing with at least Sales  in the  last 30 daysProperties: 1Units: 10'
        )

        // amount input
        expect(wrapper.findByTestId('dashboard-results-editor', 'input').props().value).toEqual(1)
        MockDate.reset()
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
          .findByTestId('housing-type-radio', 'input')
          .at(0)
          .simulate('change', { target: { value: 3 } })

        wrapper.update()
        expect(wrapper.findByTestId('dashboard-results-header').text()).toEqual(
          'All Residential HousingProperties: 3Units: 12'
        )

        wrapper.update()
        expect(wrapper.findByTestId('dashboard-results-editor').text()).toEqual(
          'Displaying all residential housing   Properties: 3Units: 12'
        )
        // 3 residential out of 4
        expect(wrapper.find('BaseTable').find('tbody tr')).toHaveLength(3)

        wrapper
          .findByTestId('housing-type-radio', 'input')
          .at(3)
          .simulate('change', { target: { value: 3 } })

        wrapper.update()

        expect(wrapper.findByTestId('dashboard-results-header').text()).toEqual('Small HomesProperties: 2Units: 2')
        expect(wrapper.findByTestId('dashboard-results-editor').text()).toEqual(
          'Displaying small homes   Properties: 2Units: 2'
        )
        // 2 Small homes
        expect(wrapper.find('BaseTable').find('tbody tr')).toHaveLength(2)
      })
    })
    describe('condition filters', () => {
      it('Switches the condition filter', async () => {
        MockDate.set('01/01/2019')
        const results = [
          createPropertyRequestMock({ bbl: 1, unitsres: 1 }, { 'hpdcomplaints_recent__12/02/2018-01/01/2019': 1 }),
          createPropertyRequestMock({ bbl: 2, unitsres: 1 }, { 'hpdcomplaints_recent__12/02/2018-01/01/2019': 10 }),
          createPropertyRequestMock({ bbl: 3, unitsres: 0 }, { 'hpdcomplaints_recent__12/02/2018-01/01/2019': 10 }),
          createPropertyRequestMock(
            { bbl: 4, unitsres: 10 },
            { 'dobviolations_recent__12/02/2018-01/01/2019': 10, 'hpdcomplaints_recent__12/02/2018-01/01/2019': 1 }
          ),
          createPropertyRequestMock(
            { bbl: 5, unitsres: 10 },
            { 'dobviolations_recent__12/02/2018-01/01/2019': 10, 'hpdcomplaints_recent__12/02/2018-01/01/2019': 10 }
          ),
        ]
        mock.onGet('/councils/1/properties/').reply(200, results)
        const [wrapper, store] = setupWrapper({
          router: { location: { pathname: '/council/1' }, action: 'POP' },
        })

        await flushAllPromises()

        // check hpdcomplaints

        wrapper
          .findByTestId('amount-toggle', 'ReactBootstrapToggle')
          .at(0)
          .simulate('click')

        wrapper.update()

        expect(wrapper.find('BaseTable').find('tbody tr')).toHaveLength(2)
        expect(
          wrapper
            .find('BaseTable')
            .props()
            .records.map(r => r.bbl)
        ).toEqual([2, 5])

        expect(wrapper.findByTestId('dashboard-results-editor').text()).toEqual(
          'Displaying all residential housing with at least HPD complaints  in the  last 30 daysProperties: 2Units: 11'
        )

        // check dovviolations
        wrapper
          .findByTestId('amount-toggle', 'ReactBootstrapToggle')
          .at(1)
          .simulate('click')

        wrapper.update()

        expect(wrapper.find('BaseTable').find('tbody tr')).toHaveLength(3)
        expect(
          wrapper
            .find('BaseTable')
            .props()
            .records.map(r => r.bbl)
        ).toEqual([2, 4, 5])
        expect(wrapper.findByTestId('dashboard-results-editor').text()).toEqual(
          'Displaying all residential housing with at least HPD complaints OR at least DOB violations  in the  last 30 daysProperties: 3Units: 21'
        )

        wrapper.update()

        // toggle AND
        wrapper
          .findByTestId('dashboard-condition-toggle', 'input')
          .at(1)
          .simulate('change', { target: { value: 'AND' } })

        expect(wrapper.find('BaseTable').find('tbody tr')).toHaveLength(1)
        expect(
          wrapper
            .find('BaseTable')
            .props()
            .records.map(r => r.bbl)
        ).toEqual([5])
        expect(wrapper.findByTestId('dashboard-results-editor').text()).toEqual(
          'Displaying all residential housing with at least HPD complaints AND at least DOB violations  in the  last 30 daysProperties: 1Units: 10'
        )

        MockDate.reset()
      })
    })

    describe('editor filters', () => {
      it('Switches the amount', async () => {
        MockDate.set('01/01/2019')
        const results = [
          createPropertyRequestMock({ bbl: 1, unitsres: 1 }, { 'hpdcomplaints_recent__12/02/2018-01/01/2019': 5 }),
          createPropertyRequestMock({ bbl: 2, unitsres: 1 }, { 'hpdcomplaints_recent__12/02/2018-01/01/2019': 6 }),
        ]
        mock.onGet('/councils/1/properties/').reply(200, results)
        const [wrapper, store] = setupWrapper({
          router: { location: { pathname: '/council/1' }, action: 'POP' },
        })

        await flushAllPromises()

        // check hpdcomplaints

        wrapper
          .findByTestId('amount-toggle', 'ReactBootstrapToggle')
          .at(0)
          .simulate('click')

        wrapper.update()

        expect(wrapper.find('BaseTable').find('tbody tr')).toHaveLength(2)
        expect(
          wrapper
            .find('BaseTable')
            .props()
            .records.map(r => r.bbl)
        ).toEqual([1, 2])

        wrapper
          .findByTestId('dashboard-results-editor')
          .findByTestId('amount-filter-input--input', 'input')
          .simulate('change', { target: { value: 6 } })
        wrapper.update()

        wrapper
          .findByTestId('dashboard-results-editor')
          .findByTestId('amount-filter-input', 'form')
          .simulate('submit')
        wrapper.update()

        expect(wrapper.find('BaseTable').find('tbody tr')).toHaveLength(1)
        expect(
          wrapper
            .find('BaseTable')
            .props()
            .records.map(r => r.bbl)
        ).toEqual([2])
        expect(wrapper.findByTestId('dashboard-results-editor').text()).toEqual(
          'Displaying all residential housing with at least HPD complaints  in the  last 30 daysProperties: 1Units: 1'
        )

        MockDate.reset()
      })
    })
  })
})

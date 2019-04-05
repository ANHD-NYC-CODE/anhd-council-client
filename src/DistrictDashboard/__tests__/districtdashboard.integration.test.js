import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Axios } from 'shared/utilities/Axios'
import MockAdapter from 'axios-mock-adapter'
import { setupStore, configuredState, flushAllPromises } from 'shared/testUtilities'
import { history } from 'Store/configureStore'
import Config from 'Config'
import ConfigContext from 'Config/ConfigContext'
import LayoutContext from 'Layout/LayoutContext'
import { createPropertyRequestMock } from 'shared/testUtilities/mocks'
import { ConnectedRouter } from 'connected-react-router'
import TableConfig from 'shared/classes/TableConfig'
import DataRequest from 'shared/classes/DataRequest'

import { mockSetupResourceModels } from 'shared/testUtilities/index.js'

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
        <Config>
          <ConnectedRouter history={history}>
            <ConfigContext.Consumer>
              {config => {
                return <DistrictDashboard config={config} />
              }}
            </ConfigContext.Consumer>
          </ConnectedRouter>
        </Config>
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
    expect(wrapper.find('GeographySelect select[name="geographyType"]').props().value).toEqual(-1)
  })

  describe('with a geography type and id', () => {
    it('sets the currentGeographyType and currentGeographyId', () => {
      const [wrapper, store] = setupWrapper({
        router: { location: { pathname: '/council/1' }, action: 'POP' },
      })

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
      expect(wrapper.find('DistrictResultsTitle').text()).toEqual('All Properties  w/ 10+ HPD Violations')
      expect(wrapper.find('RequestSummaryWrapper')).toHaveLength(12)
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
        expect(wrapper.find('RequestTableWrapper')).toHaveLength(6)
      })

      it('updates the request card summaries when data is received', async () => {
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
          'Total properties: 3All Residential2 properties11 units66.67% of all propertiesRent Stabilized0 properties0 units0.00% of residentialSubsidized Housing0 properties0 units0.00% of residentialSmall Homes1 properties1 units50.00% of residentialMarket Rate2 properties11 units100.00% of residentialPublic Housing0 properties0 units0.00% of residential'
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

        wrapper
          .find('input[name="view"]')
          .at(1)
          .simulate('change', { target: { checked: true } })

        expect(wrapper.findWhere(node => node.key() === 'request-wrapper-1').props().visible).toEqual(true)
        expect(wrapper.find('DistrictResultsTitle').text()).toEqual('All Properties  w/ 10+ HPD Violations')
        wrapper
          .findWhere(node => node.key() === 'request-summary-2')
          .find('button')
          .simulate('click')

        wrapper.update()
        expect(wrapper.findWhere(node => node.key() === 'request-wrapper-1').props().visible).toEqual(false)
        expect(wrapper.findWhere(node => node.key() === 'request-wrapper-2').props().visible).toEqual(true)
        expect(wrapper.find('DistrictResultsTitle').text()).toEqual('All Properties  w/ 2+ DOB Complaints')
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
        expect(wrapper.find('DistrictResultsTitle').text()).toEqual('All Residential Properties')
        // 3 residential out of 4
        expect(wrapper.findWhere(node => node.key() === 'request-wrapper-0').find('tbody tr')).toHaveLength(3)

        wrapper
          .findWhere(node => node.key() === 'housingtype-summary-3')
          .find('button')
          .simulate('click')

        wrapper.update()
        // 2 Small homes
        expect(wrapper.findWhere(node => node.key() === 'request-wrapper-0').find('tbody tr')).toHaveLength(2)
        expect(wrapper.find('DistrictResultsTitle').text()).toEqual('Small Homes Properties')
      })
    })

    describe('combined filters', () => {
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
        wrapper.find('input#combineFilters').simulate('change', { target: { checked: true } })
        wrapper.update()
        expect(wrapper.find('DistrictResultsTitle').text()).toEqual('All Residential Properties  w/ 10+ HPD Violations')
        wrapper.find('table').forEach(table => {
          expect(table.find('tbody tr')).toHaveLength(3)
        })

        wrapper
          .findWhere(node => node.key() === 'housingtype-summary-3')
          .find('button')
          .simulate('click')
        wrapper.update()

        expect(wrapper.find('DistrictResultsTitle').text()).toEqual('Small Homes Properties  w/ 10+ HPD Violations')

        wrapper.find('table').forEach(table => {
          expect(table.find('tbody tr')).toHaveLength(2)
        })

        wrapper
          .findWhere(node => node.key() === 'request-summary-2')
          .find('button')
          .simulate('click')

        wrapper.find('table').forEach(table => {
          expect(table.find('tbody tr')).toHaveLength(2)
        })
      })
    })

    describe('with custom filter', () => {
      it('adds a summary card', async () => {
        const [wrapper, store] = setupWrapper({
          router: { location: { pathname: '/council/1' }, action: 'POP' },
        })
        await flushAllPromises()
        wrapper.update()
        expect(
          wrapper
            .find('div.geography-request-summary__container')
            .at(5)
            .text()
        ).toEqual('+ Add Custom Search')

        const [newWrapper, newStore] = setupWrapper({
          router: { location: { pathname: '/council/1' }, action: 'POP' },
          appState: {
            ...store.getState().appState,
            requests: [
              ...store.getState().appState.requests,
              new DataRequest({
                type: 'ADVANCED_SEARCH',
                resourceModel: resourceModels['PROPERTY'],
                tableConfig: new TableConfig({ resourceConstant: 'PROPERTY' }),
              }),
            ],
          },
        })

        await flushAllPromises()
        newWrapper.update()

        expect(newWrapper.find('RequestSummaryWrapper')).toHaveLength(13)

        newWrapper
          .find('RequestSummaryWrapper')
          .at(12)
          .simulate('click')
        newWrapper.update()
        expect(newWrapper.find('DistrictResultsTitle').text()).toEqual('Custom Search')
      })
    })
  })
})

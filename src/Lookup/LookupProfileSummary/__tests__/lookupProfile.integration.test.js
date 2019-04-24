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

import LookupProfileSummary from 'Lookup/LookupProfileSummary'

configure({ adapter: new Adapter() })

const setupWrapper = ({ state, propertyResult, print = false }) => {
  state = configuredState(state)
  const store = setupStore({ ...state })
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Config>
          <LayoutContext.Provider value={{ print: print }}>
            <LookupProfileSummary records={propertyResult} />
          </LayoutContext.Provider>
        </Config>
      </ConnectedRouter>
    </Provider>
  )
  return [wrapper, store]
}
describe('LookupProfileSummary', () => {
  it('has initial state', () => {
    const [wrapper] = setupWrapper({ propertyResult: createPropertyRequestMock() })

    expect(wrapper.find('PrintLookupProfileSummary')).toHaveLength(0)
    expect(wrapper.find('PropertySummaryBody')).toHaveLength(1)
    expect(wrapper.find('OwnershipSection')).toHaveLength(1)
    expect(wrapper.find('ProgramSection')).toHaveLength(1)

    expect(wrapper.find('RentStabilizationSection')).toHaveLength(1)
  })

  it('displays print layout', () => {
    const [wrapper] = setupWrapper({
      print: true,
      propertyResult: createPropertyRequestMock(),
    })

    expect(wrapper.find('PrintLookupProfileSummary')).toHaveLength(1)
    expect(wrapper.find('PropertySummaryBody')).toHaveLength(1)
    expect(wrapper.find('OwnershipSection')).toHaveLength(1)
    expect(wrapper.find('ProgramSection')).toHaveLength(1)

    expect(wrapper.find('RentStabilizationSection')).toHaveLength(1)
  })

  describe('property summary body', () => {
    it('renders the information', () => {
      const result = createPropertyRequestMock()
      const [wrapper] = setupWrapper({ propertyResult: result })

      const bodyText = wrapper.find('PropertySummaryBody').text()
      expect(bodyText).toMatch('123 Fake Street, Brooklyn 11111')
      expect(bodyText).toMatch('BBL 1')
      expect(bodyText).toMatch('Council DistrictCouncil District 1')
      expect(bodyText).toMatch('Community DistrictCommunity District  Manhattan 01')
      expect(bodyText).toMatch('View ownership at "Who Owns What?"')
      expect(bodyText).toMatch('Year Built2000')
      expect(bodyText).toMatch('ZoningR5')
      expect(bodyText).toMatch('Total Units10')
      expect(bodyText).toMatch('Residential Units10')
    })
  })

  describe('sections', () => {
    describe('with no records', () => {
      it('renders the correct state', () => {
        const result = createPropertyRequestMock()
        const [wrapper] = setupWrapper({ propertyResult: result })

        expect(wrapper.find('OwnershipSection').text()).toMatch('No HPD Registrations Found')
        expect(wrapper.find('ProgramSection').text()).toMatch('ProgramsNoneNYCHA? NoCONH? (2018)NoTax Lien? (2018)No')
        expect(wrapper.find('RentStabilizationSection').text()).toMatch('No Rent Stabilization History')
      })
    })

    describe('with records', () => {
      it('renders the correct state', () => {
        const result = createPropertyRequestMock({
          conhrecord: true,
          taxlien: true,
          nycha: true,
          subsidyprograms: 'J51',
          hpdregistrations: [{ registrationid: 1, registrationenddate: '2018-01-01' }],
          rentstabilizationrecord: {
            ucbbl: 1,
            uc2007: '10',
            uc2017: '5',
          },
          rsunits_percent_lost: 0.5,
        })
        const [wrapper] = setupWrapper({ propertyResult: result })

        expect(wrapper.find('OwnershipSection').text()).toMatch(
          'HPD RegistrationsEnd DateView Contacts01/01/2018() Expand'
        )
        expect(wrapper.find('ProgramSection').text()).toMatch('ProgramsJ51NYCHA? YesCONH? (2018)YesTax Lien? (2018)Yes')
        expect(wrapper.find('RentStabilizationSection').text()).toMatch(
          'Rent StabilizationStabilized Units (2017): 0Change since 200750.00%'
        )

        expect(wrapper.find('RentStabilizationSection').text()).toMatch('105')
      })
    })
  })
})

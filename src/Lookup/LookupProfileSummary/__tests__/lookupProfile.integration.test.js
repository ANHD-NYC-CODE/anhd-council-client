import React from 'react'
import { configure, mount } from 'enzyme'
import { Provider } from 'react-redux'
import Adapter from 'enzyme-adapter-react-16'
import { ConnectedRouter } from 'connected-react-router'

import { setupStore, configuredState } from 'shared/testUtilities'
import { history } from 'Store/configureStore'
import Config from 'Config'
import LayoutContext from 'Layout/LayoutContext'
import { createPropertyRequestMock, createHPDRegistrationMock, createHPDContactMock } from 'shared/testUtilities/mocks'
import LookupProfileSummary from 'Lookup/LookupProfileSummary'

configure({ adapter: new Adapter() })

const setupWrapper = ({ state, propertyResult, loading = false, error, print = false }) => {
  state = configuredState(state)
  const store = setupStore({ ...state })
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Config>
          <LayoutContext.Provider value={{ print: print }}>
            <LookupProfileSummary propertyResult={propertyResult} error={error} loading={loading} />
          </LayoutContext.Provider>
        </Config>
      </ConnectedRouter>
    </Provider>
  )
  return [wrapper, store]
}

// mock window size for desktop expandable sections to start open
window.matchMedia = jest.fn()
window.matchMedia.mockImplementation(() => {
  return {
    matches: true,
  }
})

describe('LookupProfileSummary', () => {
  it('has initial state', () => {
    const [wrapper] = setupWrapper({ propertyResult: createPropertyRequestMock(), loading: false })
    expect(wrapper.find('PropertySummaryBody')).toHaveLength(1)
    expect(wrapper.find('ExpandableSection')).toHaveLength(6)

    // starts closed
    expect(wrapper.find('RentStabilizationSection')).toHaveLength(0)
    expect(wrapper.find('OwnershipSection')).toHaveLength(0)
    expect(wrapper.find('ProgramSection')).toHaveLength(0)
    expect(wrapper.find('ZoningSection')).toHaveLength(0)
    expect(wrapper.find('LocationSection')).toHaveLength(1)

    // open all sections
    wrapper.find('ExpandableSection').forEach(node => {
      node.find('[role="button"]').simulate('click')
    })

    expect(wrapper.find('RentStabilizationSection')).toHaveLength(1)
    expect(wrapper.find('OwnershipSection')).toHaveLength(1)
    expect(wrapper.find('ProgramSection')).toHaveLength(1)
    expect(wrapper.find('ZoningSection')).toHaveLength(1)
    expect(wrapper.find('LocationSection')).toHaveLength(0)
  })

  describe('property summary body', () => {
    it('renders the information', () => {
      const result = createPropertyRequestMock()
      const [wrapper] = setupWrapper({ propertyResult: result, loading: false })

      const bodyText = wrapper.find('PropertySummaryBody').text()
      expect(bodyText).toMatch(
        'BBL 1Council District1 (Visit)Community DistrictManhattan 01 (Visit)State Assembly (Visit)State Senate (Visit)Zip Code11111 (Visit)Total Units10Residential Units10Year Built2000'
      )
      expect(bodyText).toMatch('Council District1')
      expect(bodyText).toMatch('Community DistrictManhattan 01')
      expect(bodyText).toMatch('Year Built2000')

      expect(bodyText).toMatch('Total Units10')
      expect(bodyText).toMatch('Residential Units10')
    })
  })

  describe('sections', () => {
    describe('with no records', () => {
      it('renders the correct state', () => {
        const result = createPropertyRequestMock()
        const [wrapper] = setupWrapper({ propertyResult: result })

        // open all sections
        wrapper.find('ExpandableSection').forEach(node => {
          node.find('[role="button"]').simulate('click')
        })

        expect(wrapper.find('OwnershipSection').text()).toMatch('No HPD Registrations Found')
        expect(wrapper.find('ProgramSection').text()).toMatch('Subsidy Programs None')
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
          hpdregistrations: [
            createHPDRegistrationMock({ registrationid: 1, lastregistrationdate: '2018-01-01', contacts: [] }),
          ],
          rentstabilizationrecord: {
            ucbbl: 1,
            uc2007: '10',
            uc2017: '5',
          },
          rsunits_percent_lost: 0.5,
        })
        const [wrapper] = setupWrapper({ propertyResult: result })

        // open all sections
        wrapper.find('ExpandableSection').forEach(node => {
          node.find('[role="button"]').simulate('click')
        })

        expect(wrapper.find('OwnershipSection').text()).toMatch('Last updated 01/01/2018')

        expect(wrapper.find('OwnershipSection').text()).toMatch(
          'Last updated 01/01/2018The owner on record with the DOF is Test Owner.There are 0 properties associated by ownership with this property.For more on ownership visit Who Owns What?'
        )

        expect(wrapper.find('ProgramSection').text()).toMatch(
          'Subsidy Programs J51This property is a NYCHA development.A building on this property is eligible for the Certificate of No Harassment Pilot Program.'
        )

        expect(wrapper.find('ZoningSection').text()).toMatch(
          'Zoning District(s)R5, P1Overlay(s)1, 2Special District(s)A, BBuilt Floor Area Ratio (FAR)10.0Maximum Residential FAR1.0Maximum Commercial FAR2.0Maximum Community Facility FAR3.0'
        )

        expect(wrapper.find('RentStabilizationSection').text()).toMatch(
          'Stabilized Units (most recent): 0Change since 2007+50.0%# Stabilized Units 20071020175'
        )
      })
    })

    describe('with HPD Contacts', () => {
      it('renders the correct state', () => {
        const contact1 = createHPDContactMock({
          businessstreetname: '123 Fake St.',
          businessapartment: 'Apt #1',
          businesscity: 'Brooklyn',
          businessstate: 'NY',
          businesszip: '12345',
          type: 'Head Officer',
          title: 'Member',
          contactdescription: 'Co-op',
        })
        const result = createPropertyRequestMock({
          hpdregistrations: [
            createHPDRegistrationMock({ registrationid: 1, lastregistrationdate: '2018-01-01', contacts: [contact1] }),
          ],
        })
        const [wrapper] = setupWrapper({ propertyResult: result })

        // open all sections
        wrapper.find('ExpandableSection').forEach(node => {
          node.find('[role="button"]').simulate('click')
        })

        wrapper
          .find('ContactExpandableSection')
          .find('[role="button"]')
          .at(0)
          .simulate('click')

        const ownershipSectionText = wrapper.find('OwnershipSection').text()
        expect(ownershipSectionText).toMatch('Last updated 01/01/2018')

        expect(ownershipSectionText).toMatch(
          "Last updated 01/01/2018Head Officer:  Title:MemberBusiness Address:Apt #1 123 Fake St., Brooklyn NY 12345This property's ownership type is Co-op.The owner on record with the DOF is Test Owner.There are 0 properties associated by ownership with this property.For more on ownership visit Who Owns What?"
        )

        expect(ownershipSectionText).toMatch(
          'Head Officer:  Title:MemberBusiness Address:Apt #1 123 Fake St., Brooklyn NY 12345'
        )
      })
    })
  })
})

import { configure, mount } from 'enzyme'
import { Provider } from 'react-redux'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { setupStore, configuredState } from 'shared/testUtilities'
import App from 'App'

configure({ adapter: new Adapter() })

const setupWrapper = state => {
  state = configuredState(state)

  const store = setupStore({ ...state })
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  )
  return [wrapper, store]
}

describe('Landing page', () => {
  it('displays the initial navigation', () => {
    const [wrapper] = setupWrapper()
    expect(wrapper.find('NavigationBar')).toHaveLength(1)
    expect(wrapper.find('NavigationBar li')).toHaveLength(8)
    expect(wrapper.find('NavigationBar').text()).toMatch(
      /HomeDAP MapMap TutorialDistrict ReportsReports TutorialPortalAboutContact/
    )
    expect(wrapper.find('SubHeader')).toHaveLength(1)
    expect(wrapper.find('SubHeader Link')).toHaveLength(5)
    expect(wrapper.find('SubHeader').text()).toMatch(/HomeProperty LookupDistrict DashboardCustom Search/)
    expect(wrapper.find('a[data-test-id="subheader__home-link"]').props().href).toEqual('/')
    expect(wrapper.find('a[data-test-id="subheader__pl-link"]').props().href).toEqual('/lookup')
    expect(wrapper.find('a[data-test-id="subheader__dd-link"]').props().href).toEqual('/map')
    expect(wrapper.find('a[data-test-id="subheader__search-link"]').props().href).toEqual('/search')
  })

  describe('geography select', () => {
    it('shows the selected geography values', () => {
      const [wrapper] = setupWrapper()
      expect(wrapper.find('MainGeographySelect select[name="geographyType"]').props().value).toEqual(-1)
      expect(wrapper.find('MainGeographySelect select[name="geographyId"]')).toHaveLength(0)
      expect(wrapper.find('button.cancel-geography-change')).toHaveLength(0)
      expect(wrapper.find('button.submit-geography-change')).toHaveLength(0)
    })

    it('shows changing configuration', () => {
      const [wrapper] = setupWrapper()
      wrapper
        .find('MainGeographySelect select[name="geographyType"]')
        .simulate('change', { target: { value: 'COMMUNITY' } })

      wrapper.update()
      expect(wrapper.find('MainGeographySelect select[name="geographyType"]').props().value).toEqual('COMMUNITY')
      expect(wrapper.find('MainGeographySelect select[name="geographyId"]').props().value).toEqual(-1)
      expect(wrapper.find('button.cancel-geography-change')).toHaveLength(1)
      expect(wrapper.find('button.submit-geography-change')).toHaveLength(0)
    })

    it('submits the change', () => {
      const [wrapper, store] = setupWrapper()
      wrapper
        .find('MainGeographySelect select[name="geographyType"]')
        .simulate('change', { target: { value: 'COMMUNITY' } })
      wrapper.find('MainGeographySelect select[name="geographyId"]').simulate('change', { target: { value: '101' } })
      wrapper.update()
      expect(store.getState().router.location.pathname).toEqual('/community/101')
      expect(wrapper.find('GeographySelect select[name="geographyType"]').props().value).toEqual('COMMUNITY')
      expect(wrapper.find('GeographySelect select[name="geographyId"]').props().value).toEqual('101')
      expect(wrapper.find('button.cancel-geography-change')).toHaveLength(0)
      expect(wrapper.find('button.submit-geography-change')).toHaveLength(0)
    })
  })

  describe('After setting a geography select', () => {
    it('redirects to the map page for the geography', () => {
      const [wrapper] = setupWrapper()
      wrapper
        .find('MainGeographySelect select')
        .at(0)
        .simulate('change', { target: { value: 'COMMUNITY' } })
      wrapper
        .find('MainGeographySelect select')
        .at(1)
        .simulate('change', { target: { value: '102' } })

      wrapper.update()
      expect(wrapper.find('Main')).toHaveLength(0)
      expect(wrapper.find('DistrictDashboard')).toHaveLength(1)
      expect(wrapper.find('a[data-test-id="subheader__dd-link"]').props().href).toEqual('/community/102')
    })
  })
})

import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Axios } from 'shared/utilities/Axios'
import MockAdapter from 'axios-mock-adapter'
import { setupStore, configuredState } from 'shared/testUtilities'
import * as appStateReducer from 'Store/AppState/reducers'
import { Provider } from 'react-redux'

const mock = new MockAdapter(Axios)

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
  return wrapper
}

describe('navigation', () => {
  it('displays the initial navigation', () => {
    const wrapper = setupWrapper()
    expect(wrapper.find('NavigationBar')).toHaveLength(1)
    expect(wrapper.find('NavigationBar li')).toHaveLength(8)
    expect(wrapper.find('NavigationBar').text()).toMatch(
      /HomeDAP MapMap TutorialDistrict ReportsReports TutorialPortalAboutContact/
    )
    expect(wrapper.find('SubHeader')).toHaveLength(1)
    expect(wrapper.find('SubHeader a')).toHaveLength(5)
    expect(wrapper.find('SubHeader').text()).toMatch(/HomeProperty LookupDistrict DashboardCustom Search/)
  })

  it('opens the login modal', () => {
    const wrapper = setupWrapper()
    expect(wrapper.find('LoginForm')).toHaveLength(0)
    wrapper.find('#nav-login-button').simulate('click')
    expect(wrapper.find('LoginForm')).toHaveLength(1)
  })

  describe('with current geography app state', () => {
    it('changes district map link to the selected geography', () => {
      const wrapper = setupWrapper({
        appState: { ...appStateReducer.initialState, currentGeographyType: 'COUNCIL', currentGeographyId: '3' },
      })
      expect(wrapper.find('a[data-test-id="subheader__dd-link"]').props().href).toEqual('/council/3')
    })
  })

  describe('with current property app state', () => {
    it('changes lookup link to the selected property', () => {
      const wrapper = setupWrapper({ appState: { ...appStateReducer.initialState, currentProperty: '1' } })
      expect(wrapper.find('a[data-test-id="subheader__pl-link"]').props().href).toEqual('/property/1')
    })

    it('changes lookup link to the selected property and building', () => {
      const wrapper = setupWrapper({
        appState: { ...appStateReducer.initialState, currentProperty: '1', currentBuilding: '7' },
      })
      expect(wrapper.find('a[data-test-id="subheader__pl-link"]').props().href).toEqual('/property/1/building/7')
    })
  })
})

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

import AddressSearch from 'Lookup/AddressSearch'

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
        <AddressSearch />
      </ConnectedRouter>
    </Provider>
  )
  return wrapper
}

const searchResultWrapper = async ({ state = undefined, searchValue = '', results = [] } = {}) => {
  state = configuredState(state)

  const store = setupStore({ ...state })
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AddressSearch />
      </ConnectedRouter>
    </Provider>
  )

  mock.onGet('/search/buildings/').reply(200, results)

  wrapper.find('SearchBar input[name="address-search"]').simulate('change', { target: { value: searchValue } })

  jest.runAllTimers()
  await flushAllPromises()
  wrapper.update()
  return [wrapper, store]
}

describe('Address Search Module', () => {
  it('has initial state', () => {
    const wrapper = setupWrapper()
    expect(wrapper.find('AddressSearch')).toBeDefined()
    expect(wrapper.find('SearchBar')).toHaveLength(1)
    expect(wrapper.find('SearchResults')).toHaveLength(1)
    expect(wrapper.find('SearchResultRow')).toHaveLength(0)
  })

  describe('entering fruitful query', () => {
    const searchValue = '100 Awesome Street'

    const results = [
      {
        bbl: 1,
        bin: 1,
        housenumber: '100',
        street: 'awesome street',
        borough: 'brooklyn',
        buildingnumber: '100',
        buildingstreet: 'awesome street',
      },
      {
        bbl: 2,
        bin: 2,
        housenumber: '100a',
        street: 'awesome street',
        borough: 'brooklyn',
        buildingnumber: '100a',
        buildingstreet: 'awesome street',
      },
    ]

    it('updates the reducer state and shows results', async () => {
      const [wrapper] = await searchResultWrapper({ searchValue, results })

      expect(wrapper.find('SearchBar input[name="address-search"]').props().value).toEqual(searchValue)
      expect(wrapper.find('SearchResultRow')).toHaveLength(2)
      expect(wrapper.find('SearchResults').text()).toMatch(/100 awesome street, brooklyn100a awesome street, brooklyn/)
    })

    it('handles navigation on result click', async () => {
      const [wrapper, store] = await searchResultWrapper({ searchValue, results })

      wrapper
        .find('SearchResultRow LinkContainer')
        .at(0)
        .simulate('click')
      wrapper.update()

      expect(store.getState().router.location.pathname).toEqual('/property/1/building/1')
    })
  })

  describe('entering non-fruitful query', () => {
    it('shows the No Results row', async () => {
      const searchValue = '100 Awesome Street'
      const results = []
      const [wrapper] = await searchResultWrapper({ searchValue, results })

      expect(wrapper.find('SearchBar input[name="address-search"]').props().value).toEqual(searchValue)
      expect(wrapper.find('SearchResultRow')).toHaveLength(1)
      expect(wrapper.find('SearchResults').text()).toMatch(/No results/)
    })
  })
})

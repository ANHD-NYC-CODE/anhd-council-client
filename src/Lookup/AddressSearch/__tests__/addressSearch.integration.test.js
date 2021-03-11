import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import MockAdapter from 'axios-mock-adapter'

import { setupStore, configuredState, flushAllPromises } from 'shared/testUtilities'
import { history } from 'Store/configureStore'
import { Axios } from 'shared/utilities/Axios'
import ConfigContext from 'Config/ConfigContext'
import Config from 'Config'
import AddressSearch from 'Lookup/AddressSearch'

const mock = new MockAdapter(Axios)

jest.mock('lodash/debounce', () => jest.fn(fn => fn))

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
          <ConfigContext.Consumer>
            {config => {
              return <AddressSearch config={config} dispatch={store.dispatch} />
            }}
          </ConfigContext.Consumer>
        </Config>
      </ConnectedRouter>
    </Provider>
  )
  return wrapper
}

const searchResultWrapper = async ({ state = undefined, searchValue = '', results = [] } = {}) => {
  state = configuredState(state)

  const store = setupStore({ ...state })
  const wrapper = setupWrapper(state)

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
        number: '100',
        street: 'awesome street',
        borough: 'brooklyn',
      },
      {
        bbl: 2,
        bin: 2,
        number: '100a',
        street: 'awesome street',
        borough: 'brooklyn',
      },
    ]

    it('updates the reducer state and shows results', async () => {
      const [wrapper] = await searchResultWrapper({ searchValue, results })

      expect(wrapper.find('SearchBar input[name="address-search"]').props().placeholder).toEqual(searchValue)
      expect(wrapper.find('SearchResultRow')).toHaveLength(2)
      expect(wrapper.find('SearchResults').text()).toMatch(/100 awesome street, brooklyn100a awesome street, brooklyn/)
    })

    it('handles navigation on result click', async () => {
      const [wrapper] = await searchResultWrapper({ searchValue, results })

      wrapper
        .find('SearchResultRow')
        .at(0)
        .simulate('click')

      wrapper.update()
      expect(wrapper.find('ConnectedRouter').props().history.location.pathname).toEqual('/property/1/building/1')
    })
  })

  describe('entering non-fruitful query', () => {
    it('shows the No Results row', async () => {
      const searchValue = '100 Awesome Street'
      const results = []
      const [wrapper] = await searchResultWrapper({ searchValue, results })

      expect(wrapper.find('SearchBar input[name="address-search"]').props().placeholder).toEqual(searchValue)
      expect(wrapper.find('SearchResultRow')).toHaveLength(1)
      expect(wrapper.find('SearchResults').text()).toMatch(/No results/)
    })
  })
})

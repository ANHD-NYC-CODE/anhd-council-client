import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Axios } from 'shared/utilities/Axios'
import MockAdapter from 'axios-mock-adapter'
import { setupStore, flushAllPromises } from 'shared/testUtilities'

import { Provider } from 'react-redux'

const mock = new MockAdapter(Axios)

import App from 'App'
import { IDBFactory, IDBKeyRange, reset } from 'shelving-mock-indexeddb'

configure({ adapter: new Adapter() })

window.indexedDB = new IDBFactory()

// Make IDBKeyRange global so your code can create key ranges.
window.IDBKeyRange = IDBKeyRange

beforeEach(() => {
  reset()
  jest.useFakeTimers()
})
afterEach(() => {
  reset()
  jest.runAllTimers()
})

describe('initial startup', () => {
  const store = setupStore()
  describe('before completed requests', () => {
    it('does not crash', () => {
      const wrapper = mount(
        <Provider store={store}>
          <App />
        </Provider>
      )
      expect(wrapper.find(App)).toBeDefined()
    })
    it('Displays the loading module', () => {
      const wrapper = mount(
        <Provider store={store}>
          <App />
        </Provider>
      )

      expect(wrapper.find('Loading')).toHaveLength(1)
    })
  })

  describe('after completed requests', () => {
    it('Does not display the loading module', () => {
      const datasets = [{ model_name: 'hpdviolation' }]

      mock.onGet('/datasets/').reply(200, datasets)
      mock.onGet('/councils/').reply(200, [1, 2])
      mock.onGet('/communities/').reply(200, [1, 2])
      const wrapper = mount(
        <Provider store={store}>
          <App />
        </Provider>
      )

      const request = window.indexedDB.open('test', 1)
      request.addEventListener('success', async () => {
        await flushAllPromises()
        wrapper.update()
        expect(wrapper.find('Loading')).toHaveLength(0)
      })
    })
  })

  describe('after an error with requests', () => {
    it('Displays the error screens', () => {
      mock.onGet('/datasets/').reply(500, [])
      mock.onGet('/councils/').reply(500, [])
      mock.onGet('/communities/').reply(500, [])
      const wrapper = mount(
        <Provider store={store}>
          <App />
        </Provider>
      )

      const request = window.indexedDB.open('test', 1)
      request.addEventListener('success', async () => {
        await flushAllPromises()
        wrapper.update()
        expect(wrapper.find('PageError')).toHaveLength(1)
        expect(wrapper.find('Loading')).toHaveLength(0)
      })
    })
  })
})

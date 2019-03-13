import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Axios } from 'shared/utilities/Axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(Axios)

import App from '../App.js'
import { setupStore } from 'shared/testUtilities'
import { IDBFactory, IDBKeyRange, reset } from 'shelving-mock-indexeddb'

configure({ adapter: new Adapter() })

const flushAllPromises = () => new Promise(resolve => window.setImmediate(resolve))

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
  beforeAll(() => {})

  describe('before completed requests', () => {
    it('does not crash', () => {
      const wrapper = mount(<App />)
      expect(wrapper.find(App)).toBeDefined()
    })
    it('Displays the loading module', () => {
      const wrapper = mount(<App />)

      expect(wrapper.find('Loading')).toHaveLength(1)
    })
  })

  describe('after completed requests', () => {
    it('Does not display the loading module', async () => {
      const datasets = [{ model_name: 'hpdviolation' }]

      mock.onGet('/datasets/').reply(200, datasets)
      mock.onGet('/councils/').reply(200, [1, 2])
      mock.onGet('/communities/').reply(200, [1, 2])
      const wrapper = mount(<App />)

      await flushAllPromises()
      wrapper.update()
      const request = window.indexedDB.open('test', 1)
      request.addEventListener('success', async () => {
        await flushAllPromises()
        wrapper.update()
        expect(wrapper.find('Loading')).toHaveLength(0)
      })
    })
  })

  describe('after an error with requests', () => {
    it('Displays the error screens', async () => {
      mock.onGet('/datasets/').reply(500, [])
      mock.onGet('/councils/').reply(500, [])
      mock.onGet('/communities/').reply(500, [])
      const wrapper = mount(<App />)

      await flushAllPromises()
      wrapper.update()

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

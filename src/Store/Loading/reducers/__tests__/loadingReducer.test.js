import * as reducer from 'Store/Loading/reducers'

import * as actions from 'Store/Loading/actions'

describe('Loading reducer', () => {
  describe('GET_RESOURCE_REQUEST', () => {
    const action = actions.handleRequest('GET_RESOURCE')
    const expectedState = { ...reducer.initialState, GET_RESOURCE: true }

    it('sets GET_RESOURCE to true', () => {
      expect(reducer.loadingReducer(reducer.initialState, action)).toEqual(expectedState)
    })
  })

  describe('GET_RESOURCE_COMPLETE', () => {
    const action = actions.handleCompletedRequest('GET_RESOURCE')
    const expectedState = { ...reducer.initialState, GET_RESOURCE: false }

    it('sets GET_RESOURCE to false', () => {
      expect(reducer.loadingReducer(reducer.initialState, action)).toEqual(expectedState)
    })
  })

  describe('GET_RESOURCE_TYPO', () => {
    const action = { type: 'GET_RESOURCE_TYPO' }
    const expectedState = { ...reducer.initialState }

    it('does not set GET_RESOURCE', () => {
      expect(reducer.loadingReducer(reducer.initialState, action)).toEqual(expectedState)
    })
  })
})

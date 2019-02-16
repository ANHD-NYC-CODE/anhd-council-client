import * as reducer from '../index'
import * as actions from '../../actions'

describe('Loading reducer', () => {
  describe('GET_RESOURCE_REQUEST', () => {
    const action = actions.handleRequest('GET_RESOURCE')
    const expectedState = { ...reducer.initialState, GET_RESOURCE: true }

    it('sets GET_RESOURCE to true', () => {
      expect(reducer.loadingReducer(reducer.initialState, action)).toEqual(expectedState)
    })
  })

  describe('GET_RESOURCE_SUCCESS', () => {
    const action = actions.handleSuccess('GET_RESOURCE')
    const expectedState = { ...reducer.initialState, GET_RESOURCE: false }

    it('sets GET_RESOURCE to false', () => {
      expect(reducer.loadingReducer(reducer.initialState, action)).toEqual(expectedState)
    })
  })

  describe('GET_RESOURCE_FAILURE', () => {
    const action = actions.handleFailure('GET_RESOURCE')
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

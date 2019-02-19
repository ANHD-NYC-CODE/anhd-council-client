import * as reducer from 'Store/Error/reducers'
import * as actions from 'Store/Error/actions'

describe('Error reducer', () => {
  describe('GET_RESOURCE_REQUEST', () => {
    const action = actions.handleClearErrors('GET_RESOURCE')
    const expectedState = { ...reducer.initialState, GET_RESOURCE: null }

    it('sets GET_RESOURCE to null', () => {
      expect(reducer.errorReducer(reducer.initialState, action)).toEqual(expectedState)
    })
  })

  describe('GET_RESOURCE_FAILURE', () => {
    const errorResponse = { status: 400, data: { detail: 'forbidden' } }
    const action = actions.handleFailure('GET_RESOURCE', errorResponse.status, errorResponse.data.detail)
    const expectedState = { ...reducer.initialState, GET_RESOURCE: { status: 400, message: 'forbidden' } }

    it('sets GET_RESOURCE to true', () => {
      expect(reducer.errorReducer(reducer.initialState, action)).toEqual(expectedState)
    })
  })

  describe('GET_RESOURCE_TYPO', () => {
    const action = { type: 'GET_RESOURCE_TYPO' }
    const expectedState = { ...reducer.initialState }

    it('does not set GET_RESOURCE', () => {
      expect(reducer.errorReducer(reducer.initialState, action)).toEqual(expectedState)
    })
  })
})

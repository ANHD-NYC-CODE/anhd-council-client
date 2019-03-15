import * as r from '../'
import * as a from '../../actions'

describe('App State reducer', () => {
  it('should return the initial state', () => {
    expect(r.requestReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('ADD_REQUEST', () => {
    const requestConstant = 'PROPERTY_HPD_VIOLATIONS'
    it('sets the boundary', () => {
      expect(r.requestReducer(undefined, a.addRequest(requestConstant))).toEqual({
        ...r.initialState,
        [requestConstant]: undefined,
      })
    })
  })

  describe('RECEIVE_REQUEST_RESULTS', () => {
    const requestConstant = 'PROPERTY_HPD_VIOLATIONS'
    const results = [{ id: 1 }, { id: 2 }]
    it('sets the boundary', () => {
      expect(
        r.requestReducer({ [requestConstant]: undefined }, a.receiveRequestResults(requestConstant, results))
      ).toEqual({
        ...r.initialState,
        [requestConstant]: results,
      })
    })
  })

  describe('REMOVE_REQUEST', () => {
    const requestConstant = 'PROPERTY_HPD_VIOLATIONS'
    it('sets the boundary', () => {
      expect(r.requestReducer({ [requestConstant]: undefined }, a.removeRequest(requestConstant))).toEqual({
        ...r.initialState,
      })
    })
  })
})

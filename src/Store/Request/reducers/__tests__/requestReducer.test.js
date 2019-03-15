import * as r from '../'
import * as a from '../../actions'

describe('App State reducer', () => {
  it('should return the initial state', () => {
    expect(r.requestReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('ADD_REQUEST', () => {
    const requestConstant = 'PROPERTY_HPD_VIOLATIONS'
    it('adds a request key', () => {
      expect(r.requestReducer(undefined, a.addRequest(requestConstant))).toEqual({
        ...r.initialState,
        [requestConstant]: undefined,
      })
    })
  })

  describe('HANDLE_REQUEST_RESULTS', () => {
    const requestConstant = 'PROPERTY_HPD_VIOLATIONS'
    const results = [{ id: 1 }, { id: 2 }]
    it('adds results to the request if present', () => {
      expect(
        r.requestReducer({ [requestConstant]: undefined }, a.handleRequestResults({ data: results }, requestConstant))
      ).toEqual({
        ...r.initialState,
        [requestConstant]: results,
      })
    })

    it('does not add results if key not found', () => {
      const requestConstant = 'PROPERTY_HPD_VIOLATIONS'
      const results = [{ id: 1 }, { id: 2 }]
      expect(r.requestReducer(undefined, a.handleRequestResults({ data: results }, requestConstant))).toEqual({
        ...r.initialState,
      })
    })
  })

  describe('REMOVE_REQUEST', () => {
    const requestConstant = 'PROPERTY_HPD_VIOLATIONS'
    it('removes the request key', () => {
      expect(r.requestReducer({ [requestConstant]: undefined }, a.removeRequest(requestConstant))).toEqual({
        ...r.initialState,
      })
    })
  })
})

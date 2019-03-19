import * as r from '../'
import * as a from '../../actions'

describe('App State reducer', () => {
  it('should return the initial state', () => {
    expect(r.appStateReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('SET_GEOGRAPHY_TYPE_AND_ID', () => {
    const type = 'COUNCIL'
    const id = '1'
    const requests = [1, 2, 3]
    it('sets the geography', () => {
      expect(r.appStateReducer(undefined, a.handleSetGeographyRequests(type, id, requests))).toEqual({
        ...r.initialState,
        currentGeographyType: type,
        currentGeographyId: id,
        requests: requests,
      })
    })
  })

  describe('SET_PROPERTY_AND_BUILDING', () => {
    const bbl = '1000010001'
    const bin = '9999999'
    const requests = [1, 2, 3]
    it('sets the geography', () => {
      expect(r.appStateReducer(undefined, a.handleSetPropertyBuildingLookupRequests(bbl, bin, requests))).toEqual({
        ...r.initialState,
        currentProperty: bbl,
        currentBuilding: bin,
        requests: requests,
      })
    })
  })

  describe('SET_ADVANCED_SEARCH_REQUEST', () => {
    const advancedSearchRequest = 4
    const requests = [1, 2, 3]
    it('sets the request', () => {
      expect(
        r.appStateReducer({ ...r.initialState, requests }, a.handleSetAdvancedSearchRequest(advancedSearchRequest))
      ).toEqual({
        ...r.initialState,
        requests: [...requests, advancedSearchRequest],
      })
    })
  })

  describe('REMOVE_REQUEST_TYPE', () => {
    const requests = [{ type: 'A' }, { type: 'B' }]
    it('removes requests of the specified type', () => {
      expect(r.appStateReducer({ requests }, a.removeRequestType('A'))).toEqual({
        ...r.initialState,

        requests: [{ type: 'B' }],
      })
    })
  })
})

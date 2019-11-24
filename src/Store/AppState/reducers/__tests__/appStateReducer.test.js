import * as r from '../'
import * as a from '../../actions'
import * as c from 'shared/constants'

describe('App State reducer', () => {
  it('should return the initial state', () => {
    expect(r.appStateReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('SET_GEOGRAPHY_TYPE_AND_ID', () => {
    const type = 'COUNCIL'
    const id = '1'
    const defaultRequest = { type: 'GEOGRAPHY_HOUSING_TYPE' }
    const requests = [defaultRequest, 2, 3]
    it('sets the geography, and default selectedRequest', () => {
      expect(r.appStateReducer(undefined, a.handleSetGeographyRequests(type, id, requests))).toEqual({
        ...r.initialState,
        currentGeographyType: type,
        currentGeographyId: id,
        requests: requests,
        selectedRequests: [defaultRequest],
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
    const advancedSearchRequest = { resourceModel: { ownResultFilters: [] } }
    const requests = [1, 2, 3]
    const selectedRequests = requests
    it('sets the request', () => {
      expect(
        r.appStateReducer(
          { ...r.initialState, requests, selectedRequests },
          a.handleSetAdvancedSearchRequest(advancedSearchRequest)
        )
      ).toEqual({
        ...r.initialState,
        requests: [...requests, advancedSearchRequest],
        selectedRequests: selectedRequests,
      })
    })
  })

  describe('REMOVE_REQUEST_TYPE', () => {
    const requests = [{ type: 'A' }, { type: 'B' }]
    it('removes requests of the specified type', () => {
      expect(r.appStateReducer({ ...r.initialState, requests }, a.removeRequestType('A'))).toEqual({
        ...r.initialState,

        requests: [{ type: 'B' }],
      })
    })
  })

  describe('TOGGLE_SELECTED_REQUEST', () => {
    describe('if request is not in array', () => {
      const requests = [{ type: 'A' }]
      const newRequest = { type: 'B' }

      it('adds the request', () => {
        expect(
          r.appStateReducer(
            { ...r.initialState, selectedRequests: requests, requests },
            a.toggleSelectedRequest(newRequest)
          )
        ).toEqual({
          ...r.initialState,
          requests,
          selectedRequests: [...requests, newRequest],
        })
      })
    })

    describe('if request is in array', () => {
      const removeRequest = { type: 'B' }
      const requests = [{ type: 'GEOGRAPHY_HOUSING_TYPE' }, { type: 'A' }, removeRequest]
      const selectedRequests = [{ type: 'A' }, removeRequest]

      it('removes the request', () => {
        expect(
          r.appStateReducer(
            { ...r.initialState, selectedRequests: selectedRequests, requests },
            a.toggleSelectedRequest(removeRequest)
          )
        ).toEqual({
          ...r.initialState,
          requests,
          selectedRequests: [{ type: 'A' }],
        })
      })
    })

    describe('if removed request is last element in array', () => {
      const removeRequest = { type: 'B' }
      const requests = [{ type: 'GEOGRAPHY_HOUSING_TYPE' }, removeRequest]
      const initialSelectedRequests = [removeRequest]

      it('adds the default request', () => {
        expect(
          r.appStateReducer(
            { ...r.initialState, selectedRequests: initialSelectedRequests, requests },
            a.toggleSelectedRequest(removeRequest)
          )
        ).toEqual({
          ...r.initialState,
          requests,
          selectedRequests: [{ type: 'GEOGRAPHY_HOUSING_TYPE' }],
        })
      })
    })

    describe('if default request is present', () => {
      const defaultRequest = { type: 'GEOGRAPHY_HOUSING_TYPE' }
      const newRequest = { type: 'B' }
      const requests = [defaultRequest, newRequest]
      it('it removes default request', () => {
        expect(
          r.appStateReducer(
            { ...r.initialState, selectedRequests: [defaultRequest], requests },
            a.toggleSelectedRequest(newRequest)
          )
        ).toEqual({
          ...r.initialState,
          requests,
          selectedRequests: [newRequest],
        })
      })
    })

    describe('if advanced search request is present', () => {
      const defaultRequest = { type: c.ADVANCED_SEARCH }
      const newRequest = { type: 'B' }
      const requests = [defaultRequest, newRequest]
      it('it removes advanced search request', () => {
        expect(
          r.appStateReducer(
            { ...r.initialState, selectedRequests: [defaultRequest], requests },
            a.toggleSelectedRequest(newRequest)
          )
        ).toEqual({
          ...r.initialState,
          requests,
          selectedRequests: [newRequest],
        })
      })
    })
  })
})

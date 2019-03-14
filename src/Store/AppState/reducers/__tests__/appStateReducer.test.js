import * as r from '../'
import * as a from '../../actions'

describe('App State reducer', () => {
  it('should return the initial state', () => {
    expect(r.appStateReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('SET_BOUNDARY_TYPE', () => {
    const type = 'COUNCIL'
    it('sets the boundary', () => {
      expect(r.appStateReducer(undefined, a.handleSetBoundaryType(type))).toEqual({
        ...r.initialState,
        currentBoundaryType: type,
      })
    })
  })

  describe('SET_BOUNDARY_ID', () => {
    const type = 'COUNCIL'
    const id = '1'
    it('sets the boundary', () => {
      expect(r.appStateReducer({ ...r.initialState, currentBoundaryType: type }, a.handleSetBoundaryId(id))).toEqual({
        ...r.initialState,
        currentBoundaryType: type,
        currentBoundaryId: id,
      })
    })
  })

  describe('SET_BOUNDARY_TYPE_AND_ID', () => {
    const type = 'COUNCIL'
    const id = '1'
    it('sets the boundary', () => {
      expect(r.appStateReducer(undefined, a.handleSetBoundaryTypeAndId(type, id))).toEqual({
        ...r.initialState,
        currentBoundaryType: type,
        currentBoundaryId: id,
      })
    })
  })

  describe('SET_PROPERTY', () => {
    const property = '1000010001'
    it('sets the boundary', () => {
      expect(r.appStateReducer(undefined, a.handleSetProperty(property))).toEqual({
        ...r.initialState,
        currentProperty: property,
      })
    })
  })

  describe('SET_BUILDING', () => {
    const building = '9999999'
    it('sets the boundary', () => {
      expect(r.appStateReducer(undefined, a.handleSetBuilding(building))).toEqual({
        ...r.initialState,
        currentBuilding: building,
      })
    })
  })

  describe('SET_PROPERTY_AND_BUILDING', () => {
    const property = '1000010001'
    const building = '9999999'
    it('sets the boundary', () => {
      expect(r.appStateReducer(undefined, a.handleSetPropertyAndBuilding(property, building))).toEqual({
        ...r.initialState,
        currentProperty: property,
        currentBuilding: building,
      })
    })
  })
})

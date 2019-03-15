import * as r from '../'
import * as a from '../../actions'

describe('App State reducer', () => {
  it('should return the initial state', () => {
    expect(r.appStateReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('SET_GEOGRAPHY_TYPE', () => {
    const type = 'COUNCIL'
    it('sets the geography', () => {
      expect(r.appStateReducer(undefined, a.handleSetGeographyType(type))).toEqual({
        ...r.initialState,
        currentGeographyType: type,
      })
    })
  })

  describe('SET_GEOGRAPHY_ID', () => {
    const type = 'COUNCIL'
    const id = '1'
    it('sets the geography', () => {
      expect(r.appStateReducer({ ...r.initialState, currentGeographyType: type }, a.handleSetGeographyId(id))).toEqual({
        ...r.initialState,
        currentGeographyType: type,
        currentGeographyId: id,
      })
    })
  })

  describe('SET_GEOGRAPHY_TYPE_AND_ID', () => {
    const type = 'COUNCIL'
    const id = '1'
    it('sets the geography', () => {
      expect(r.appStateReducer(undefined, a.handleSetGeographyTypeAndId(type, id))).toEqual({
        ...r.initialState,
        currentGeographyType: type,
        currentGeographyId: id,
      })
    })
  })

  describe('SET_PROPERTY', () => {
    const property = '1000010001'
    it('sets the geography', () => {
      expect(r.appStateReducer(undefined, a.handleSetProperty(property))).toEqual({
        ...r.initialState,
        currentProperty: property,
      })
    })
  })

  describe('SET_BUILDING', () => {
    const building = '9999999'
    it('sets the geography', () => {
      expect(r.appStateReducer(undefined, a.handleSetBuilding(building))).toEqual({
        ...r.initialState,
        currentBuilding: building,
      })
    })
  })

  describe('SET_PROPERTY_AND_BUILDING', () => {
    const property = '1000010001'
    const building = '9999999'
    it('sets the geography', () => {
      expect(r.appStateReducer(undefined, a.handleSetPropertyAndBuilding(property, building))).toEqual({
        ...r.initialState,
        currentProperty: property,
        currentBuilding: building,
      })
    })
  })
})

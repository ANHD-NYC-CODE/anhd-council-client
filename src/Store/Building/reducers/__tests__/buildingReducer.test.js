import * as r from '../'
import * as a from '../../actions'

describe('Building reducer', () => {
  it('should return the initial state', () => {
    expect(r.buildingReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('HANDLE_GET_BUILDING', () => {
    const response = { id: 1 }
    it('fetches the resource', () => {
      expect(r.buildingReducer(undefined, a.handleGetBuilding({ data: response }))).toEqual({
        ...r.initialState,
        currentBuilding: response,
      })
    })
  })

  describe('HANDLE_GET_BUILDING_RESOURCE', () => {
    const response = [{ id: 1 }, { id: 2 }]
    it('fetches the resource', () => {
      expect(
        r.buildingReducer(
          undefined,
          a.handleGetBuildingResource(
            {
              data: response,
            },
            'GET_BUILDING_RESOURCE_HPD_VIOLATIONS'
          )
        )
      ).toEqual({
        ...r.initialState,
        GET_BUILDING_RESOURCE_HPD_VIOLATIONS: response,
      })
    })
  })
})

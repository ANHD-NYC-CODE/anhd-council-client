import * as r from '../'
import * as a from '../../actions'
import * as c from '../../constants'

describe('Search reducer', () => {
  it('should return the initial state', () => {
    expect(r.buildingReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('HANDLE_GET_BUILDING', () => {
    const response = { bin: 1 }
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
          a.handleGetBuildingResource(c.buildingResourceConstant('HPD_VIOLATIONS'), {
            data: response,
          })
        )
      ).toEqual({
        ...r.initialState,
        hpd_violations: response,
      })
    })
  })
})

import * as reducer from '../'
import * as actions from '../../actions'

describe('Search reducer', () => {
  it('should return the initial state', () => {
    expect(reducer.buildingReducer(undefined, {})).toEqual(reducer.initialState)
  })

  describe('HANDLE_GET_BUILDING', () => {
    const response = { bin: 1 }
    it('fetches the resource', () => {
      expect(reducer.buildingReducer(undefined, actions.handleGetBuilding({ data: response }))).toEqual({
        ...reducer.initialState,
        currentBuilding: response,
      })
    })
  })

  describe('HANDLE_GET_BUILDING_HPD_VIOLATIONS', () => {
    const response = [{ id: 1 }, { id: 2 }]
    it('fetches the resource', () => {
      expect(reducer.buildingReducer(undefined, actions.handleGetBuildingHpdViolations({ data: response }))).toEqual({
        ...reducer.initialState,
        hpdViolations: response,
      })
    })
  })
})

import * as c from '../constants'

export const initialState = {
  currentBuilding: undefined,
}

export const buildingReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.HANDLE_GET_BUILDING: {
      return {
        ...state,
        currentBuilding: action.data,
      }
    }
    case c.HANDLE_GET_BUILDING_HPD_COMPLAINTS: {
      return {
        ...state,
        hpdComplaints: action.data,
      }
    }
    case c.HANDLE_GET_BUILDING_HPD_VIOLATIONS: {
      return {
        ...state,
        hpdViolations: action.data,
      }
    }
    case c.HANDLE_GET_BUILDING_DOB_VIOLATIONS: {
      return {
        ...state,
        dobViolations: action.data,
      }
    }
    default:
      return state
  }
}

import * as c from '../constants'

export const initialState = {
  currentBoundaryType: undefined,
  currentBoudaryId: undefined,
  currentProperty: undefined,
  currentBuilding: undefined,
  requests: [],
}

export const appStateReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.SET_BOUNDARY_TYPE: {
      return {
        ...state,
        currentBoundaryType: action.data,
      }
    }
    case c.SET_BOUNDARY_ID: {
      return {
        ...state,
        currentBoundaryId: action.data,
      }
    }
    case c.SET_BOUNDARY_TYPE_AND_ID: {
      return {
        ...state,
        currentBoundaryType: action.boundaryType,
        currentBoundaryId: action.boundaryId,
      }
    }
    case c.SET_PROPERTY: {
      return {
        ...state,
        currentProperty: action.data,
      }
    }
    case c.SET_BUILDING: {
      return {
        ...state,
        currentBuilding: action.data,
      }
    }
    case c.SET_PROPERTY_AND_BUILDING: {
      return {
        ...state,
        currentProperty: action.propertyId,
        currentBuilding: action.buildingId,
      }
    }
    case c.SET_PROPERTY_BUILDING_LOOKUP_REQUESTS: {
      return {
        ...state,
        currentProperty: action.propertyId,
        currentBuilding: action.buildingId,
        requests: action.requests,
      }
    }
    default:
      return state
  }
}

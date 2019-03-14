import * as c from '../constants'

export const initialState = {
  currentBoundaryType: undefined,
  currentBoudaryId: undefined,
  currentProperty: undefined,
  currentBuilding: undefined,
  mapFilters: [],
  lookupFilters: [],
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
    case c.UPDATE_MAP_FILTER: {
      return {
        state,
        mapFilters: [
          ...state.mapFilters.slice(0, action.filterIndex),
          action.filter,
          ...state.mapFilters.slice(action.filterIndex),
        ],
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
        lookupFilters: action.lookupFilters,
      }
    }
    default:
      return state
  }
}

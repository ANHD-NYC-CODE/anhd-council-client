import * as c from '../constants'

export const initialState = {
  currentGeographyType: undefined,
  currentGeographyId: undefined,
  currentProperty: undefined,
  currentBuilding: undefined,
  requests: [],
}

export const appStateReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.SET_GEOGRAPHY_TYPE: {
      return {
        ...state,
        currentGeographyType: action.data,
      }
    }
    case c.SET_GEOGRAPHY_ID: {
      return {
        ...state,
        currentGeographyId: action.data,
      }
    }
    case c.SET_GEOGRAPHY_TYPE_AND_ID: {
      return {
        ...state,
        currentGeographyType: action.geographyType,
        currentGeographyId: action.geographyId,
      }
    }
    case c.SET_GEOGRAPHY_REQUESTS: {
      return {
        ...state,
        currentGeographyType: action.geographyType,
        currentGeographyId: action.geographyId,
        requests: [...state.requests, ...action.requests],
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
        requests: [...state.requests, ...action.requests],
      }
    }
    case c.REMOVE_REQUEST_TYPE: {
      return {
        ...state,
        requests: state.requests.filter(request => request.type === action.requestType),
      }
    }
    default:
      return state
  }
}

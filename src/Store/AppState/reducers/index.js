import * as c from '../constants'
import { alertMapFilterdates } from 'shared/utilities/componentUtils'

export const initialState = {
  currentGeographyType: undefined,
  currentGeographyId: undefined,
  currentProperty: undefined,
  currentBuilding: undefined,
  changingGeography: false,
  changingGeographyType: undefined,
  changingGeographyId: undefined,
  mapFilterDate: alertMapFilterdates()[0],
  requests: [],
}

export const appStateReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.SET_APP_STATE: {
      return {
        ...state,
        ...action.state,
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

    case c.SET_PROPERTY_BUILDING_LOOKUP_REQUESTS: {
      return {
        ...state,
        currentProperty: action.bbl,
        currentBuilding: action.bin,
        requests: [...state.requests, ...action.requests],
      }
    }
    case c.SET_ADVANCED_SEARCH_REQUEST: {
      return {
        ...state,
        requests: [...state.requests, action.advancedSearchRequest],
      }
    }
    case c.REMOVE_REQUEST_TYPE: {
      return {
        ...state,
        requests: state.requests.filter(request => request.type !== action.requestType),
      }
    }
    case c.SET_MAP_FILTER_DATE: {
      return {
        ...state,
        mapFilterDate: action.date,
      }
    }
    default:
      return state
  }
}

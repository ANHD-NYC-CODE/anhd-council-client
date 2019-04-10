import * as c from '../constants'
import { districtDashboardFilterdates } from 'shared/utilities/componentUtils'
import { getDefaultRequest, getDefaultResultsFilter } from 'Store/AppState/selectors'
export const initialState = {
  currentGeographyType: undefined,
  currentGeographyId: undefined,
  currentProperty: undefined,
  currentBuilding: undefined,
  changingGeography: false,
  changingGeographyType: undefined,
  changingGeographyId: undefined,
  mapFilterDate: districtDashboardFilterdates()[0],
  selectedRequests: [],
  selectedRequest: undefined, // DEPRECATED
  selectedResultsFilter: undefined,
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
    case c.TOGGLE_SELECTED_REQUEST: {
      const defaultRequest = getDefaultRequest(state.requests)
      let selectedRequests = [...state.selectedRequests]

      // Remove default request if it exists
      if (selectedRequests.includes(defaultRequest)) {
        selectedRequests = []
      }

      // Add or remove request
      if (selectedRequests.includes(action.toggledRequest)) {
        selectedRequests = selectedRequests.filter(request => request !== action.toggledRequest)
      } else {
        selectedRequests.push(action.toggledRequest)
      }

      // Add default request if empty
      if (!selectedRequests.length) {
        selectedRequests.push(defaultRequest)
      }

      return {
        ...state,
        selectedRequests: [...selectedRequests],
      }
    }
    case c.SET_GEOGRAPHY_REQUESTS: {
      const newRequests = [...state.requests, ...action.requests]
      return {
        ...state,
        currentGeographyType: action.geographyType,
        currentGeographyId: action.geographyId,
        requests: [...state.requests, ...action.requests],
        selectedRequests: state.selectedRequests.length ? state.selectedRequests : [getDefaultRequest(newRequests)],
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
        selectedRequest: action.advancedSearchReques,
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

    case c.SET_DEFAULT_SELECTED_REQUEST: {
      return {
        ...state,
        selectedRequests: [getDefaultRequest(state.requests)],
        selectedRequest: getDefaultRequest(state.requests),
        selectedResultsFilter: getDefaultResultsFilter(action.model),
      }
    }
    default:
      return state
  }
}

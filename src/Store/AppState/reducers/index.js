import * as c from 'shared/constants'
import { getDefaultRequest } from 'Store/AppState/selectors'

export const initialState = {
  currentGeographyType: undefined,
  currentGeographyId: undefined,
  currentProperty: undefined,
  currentPropertyWowData: undefined,
  currentBuilding: undefined,
  changingGeography: false, // whether or not the user is in the process of changing the geo
  changingGeographyType: undefined, // the geography type the user has currently selected for changing.
  changingGeographyId: undefined, // the ID that the user has currently selected for changing
  selectedRequests: [],
  selectedRequest: undefined, // DEPRECATED, still used in lookup however
  requests: [],
  linkLookupBackToDashboard: false, // whether or not to show "back to dashboard button in lookup"
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
      const exclusiveRequests = [defaultRequest, { type: c.ADVANCED_SEARCH }].filter(r => r)
      let selectedRequests = [...state.selectedRequests]
      // Remove exclusive requests if present
      if (selectedRequests.some(request => exclusiveRequests.some(r => r.type === request.type))) {
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
        requests: [...state.requests, action.advancedSearchRequest],
      }
    }
    case c.SET_WOW_PROPERTY_DATA: {
      return {
        ...state,
        currentPropertyWowData: action.data,
      }
    }

    case c.REMOVE_REQUEST_TYPE: {
      return {
        ...state,
        requests: state.requests.filter(request => request.type !== action.requestType),
      }
    }
    default:
      return state
  }
}

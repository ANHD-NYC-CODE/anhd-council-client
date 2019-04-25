import * as c from 'shared/constants'
import { getDefaultRequest, getDefaultAmountFilter } from 'Store/AppState/selectors'

export const initialState = {
  currentGeographyType: undefined,
  currentGeographyId: undefined,
  currentProperty: undefined,
  currentBuilding: undefined,
  changingGeography: false,
  changingGeographyType: undefined,
  changingGeographyId: undefined,
  mapFilterDate: c.DISTRICT_REQUEST_DATE_ONE,
  selectedRequests: [],
  selectedFilters: [],
  selectedRequest: undefined, // DEPRECATED
  housingTypeResultFilter: undefined,
  resultFilters: [], // initialize in Config/index.js
  requests: [],
  districtShowCustomView: false,
}

export const appStateReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.SET_APP_STATE: {
      return {
        ...state,
        ...action.state,
      }
    }
    case c.LOAD_RESULT_FILTERS: {
      return {
        ...state,
        resultFilters: action.resultFilters,
        housingTypeResultFilter: action.resultFilters[0],
      }
    }
    case c.TOGGLE_SELECTED_AMOUNT_FILTER: {
      const defaultAmountFilter = getDefaultAmountFilter(state.resultFilters.filter(fil => fil.category === 'AMOUNT'))

      let selectedFilters = [...state.selectedFilters]

      if (selectedFilters.includes(action.toggledFilter)) {
        selectedFilters = selectedFilters.filter(request => request !== action.toggledFilter)
      } else {
        selectedFilters.push(action.toggledFilter)
      }

      // Add default request if empty
      // if (!selectedFilters.length) {
      //   selectedFilters.push(defaultAmountFilter)
      // }

      return {
        ...state,
        selectedFilters: [...selectedFilters],
      }
    }
    case c.UPDATE_AMOUNT_FILTER: {
      const selectedFilters = [...state.selectedFilters]
      selectedFilters[selectedFilters.indexOf(action.amountFilter)] = action.amountFilter
      return {
        ...state,
        selectedFilters,
      }
    }
    case c.TOGGLE_SELECTED_REQUEST: {
      const defaultRequest = getDefaultRequest(state.requests)
      const exclusiveRequests = [defaultRequest, { type: 'ADVANCED_SEARCH' }].filter(r => r)
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
        districtShowCustomView: true,
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
        housingTypeResultFilter: state.resultFilters[0],
      }
    }
    default:
      return state
  }
}

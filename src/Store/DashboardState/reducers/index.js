import * as c from 'shared/constants'

export const initialState = {
  dashboardMapZoom: 14,
  housingTypeResultFilter: undefined,
  mapFilterDate: c.DISTRICT_REQUEST_DATE_ONE,
  resultFilters: [], // initialize in Config/index.js
  districtShowCustomView: false,
  selectedFilters: [],
}

export const dashboardStateReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.SET_DASHBOARD_MAP_ZOOM: {
      return {
        ...state,
        dashboardMapZoom: action.dashboardMapZoom,
      }
    }
    case c.SET_HOUSING_TYPE_RESULT_FILTER: {
      return {
        ...state,
        housingTypeResultFilter: action.housingTypeResultFilter,
      }
    }
    case c.LOAD_RESULT_FILTERS: {
      return {
        ...state,
        resultFilters: action.resultFilters,
        housingTypeResultFilter: action.resultFilters[0],
      }
    }
    case c.SET_MAP_FILTER_DATE: {
      return {
        ...state,
        mapFilterDate: action.date,
      }
    }
    case c.SET_DASHBOARD_CUSTOM_VIEW: {
      return {
        ...state,
        districtShowCustomView: action.districtShowCustomView,
      }
    }
    case c.TOGGLE_SELECTED_AMOUNT_FILTER: {
      let selectedFilters = [...state.selectedFilters]

      if (selectedFilters.includes(action.toggledFilter)) {
        selectedFilters = selectedFilters.filter(request => request !== action.toggledFilter)
      } else {
        selectedFilters.push(action.toggledFilter)
      }

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

    default:
      return state
  }
}

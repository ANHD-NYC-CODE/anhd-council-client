import * as c from 'shared/constants'
import Property from 'shared/models/resources/Property'

export const initialState = {
  dashboardMapZoom: 14,
  housingTypeResultFilter: undefined,
  mapFilterDate: c.DISTRICT_REQUEST_DATE_ONE,
  resultFilterCalculations: [],
  resultFilters: [], // initialize in Config/index.js
  selectedFilters: [],
  districtShowCustomView: false,
  resultRecords: [],
  housingTypeResults: [],
  housingTypeResultsIndex: 0,
  totalPropertyResults: [],
  customSearchResults: [],
  dashboardTableView: false, // Showing the map vs the table in dashboard
  dashboardTableState: {
    page: 1,
  },
}

const calculateHousingTypeResults = ({ state, totalPropertyResults = undefined }) => {
  if (totalPropertyResults === undefined) totalPropertyResults = state.totalPropertyResults

  return Property().ownResultFilters.map(ownResultFilter => {
    return ownResultFilter.internalFilter(totalPropertyResults, ownResultFilter.paramMaps)
  })
}

const getResultRecords = ({
  state,
  housingTypeResultFilter = undefined,
  districtShowCustomView = undefined,
  selectedFilters = undefined,
  totalPropertyResults = undefined,
  customSearchResults = undefined,
} = {}) => {
  if (housingTypeResultFilter === undefined) housingTypeResultFilter = state.housingTypeResultFilter
  if (districtShowCustomView === undefined) districtShowCustomView = state.districtShowCustomView
  if (selectedFilters === undefined) selectedFilters = state.selectedFilters
  if (totalPropertyResults === undefined) totalPropertyResults = state.totalPropertyResults
  if (customSearchResults === undefined) customSearchResults = state.customSearchResults

  const housingTypeFilter =
    !districtShowCustomView && housingTypeResultFilter
      ? results => housingTypeResultFilter.internalFilter(results, housingTypeResultFilter.paramMaps)
      : results => results

  let propertyResults = totalPropertyResults

  if (districtShowCustomView) {
    propertyResults = customSearchResults
  } else if (selectedFilters.length) {
    propertyResults = propertyResults.filter(result =>
      selectedFilters.some(selectedFilter => selectedFilter.evaluate(result))
    )
  }

  return housingTypeFilter(propertyResults)
}

const calculateAmountTotals = ({ state, housingTypeResultFilter, selectedFilters, totalPropertyResults }) => {
  if (housingTypeResultFilter === undefined) housingTypeResultFilter = state.housingTypeResultFilter
  if (selectedFilters === undefined) selectedFilters = state.selectedFilters
  if (totalPropertyResults === undefined) totalPropertyResults = state.totalPropertyResults

  return state.resultFilters
    .filter(f => f.category === 'AMOUNT')
    .map(amountFilter => {
      return housingTypeResultFilter.internalFilter(
        amountFilter.internalFilter(totalPropertyResults),
        housingTypeResultFilter.paramMaps
      )
    })
}

export const dashboardStateReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.SET_DASHBOARD_MAP_ZOOM: {
      return {
        ...state,
        dashboardMapZoom: action.dashboardMapZoom,
      }
    }
    case c.SET_DASHBOARD_TABLE_VIEW: {
      return {
        ...state,
        dashboardTableView: action.dashboardTableView,
      }
    }
    case c.SET_DASHBOARD_TABLE_STATE: {
      return {
        ...state,
        dashboardTableState: action.dashboardTableState,
      }
    }
    case c.SET_HOUSING_TYPE_RESULT_FILTER: {
      return {
        ...state,
        housingTypeResultFilter: action.housingTypeResultFilter,
        resultRecords: getResultRecords({ state, housingTypeResultFilter: action.housingTypeResultFilter }),
        resultFilterCalculations: calculateAmountTotals({
          state,
          housingTypeResultFilter: action.housingTypeResultFilter,
        }),
      }
    }
    case c.SET_HOUSING_TYPE_RESULTS_INDEX: {
      return {
        ...state,
        housingTypeResultsIndex: action.housingTypeResultsIndex,
      }
    }
    case c.LOAD_RESULT_FILTERS: {
      return {
        ...state,
        resultFilters: action.resultFilters,
        housingTypeResultFilter: action.resultFilters[0],
        resultRecords: getResultRecords({ state, housingTypeResultFilter: action.resultFilters[0] }),
        resultFilterCalculations: calculateAmountTotals({ state, housingTypeResultFilter: action.resultFilters[0] }),
      }
    }
    case c.SET_MAP_FILTER_DATE: {
      return {
        ...state,
        mapFilterDate: action.date,
        resultRecords: getResultRecords({ state }),
        resultFilterCalculations: calculateAmountTotals({ state }),
      }
    }
    case c.SET_DASHBOARD_CUSTOM_VIEW: {
      return {
        ...state,
        districtShowCustomView: action.districtShowCustomView,
        resultRecords: getResultRecords({ state, districtShowCustomView: action.districtShowCustomView }),
      }
    }
    case c.TOGGLE_SELECTED_AMOUNT_FILTER: {
      let selectedFilters = [...state.selectedFilters]

      if (selectedFilters.includes(action.toggledFilter)) {
        selectedFilters = selectedFilters.filter(request => request !== action.toggledFilter)
      } else {
        selectedFilters.push(action.toggledFilter)
      }

      selectedFilters = [...selectedFilters]
      return {
        ...state,
        selectedFilters,
        resultRecords: getResultRecords({ state, selectedFilters }),
      }
    }
    case c.UPDATE_AMOUNT_FILTER: {
      const selectedFilters = [...state.selectedFilters]
      selectedFilters[selectedFilters.indexOf(action.amountFilter)] = action.amountFilter
      return {
        ...state,
        selectedFilters,
        resultRecords: getResultRecords({ state, selectedFilters }),
        resultFilterCalculations: calculateAmountTotals({ state, selectedFilters }),
      }
    }

    case c.SET_TOTAL_PROPERTY_RESULTS: {
      return {
        ...state,
        totalPropertyResults: action.totalPropertyResults,
        resultRecords: getResultRecords({ state, totalPropertyResults: action.totalPropertyResults }),
        housingTypeResults: calculateHousingTypeResults({ state, totalPropertyResults: action.totalPropertyResults }),
        resultFilterCalculations: calculateAmountTotals({ state, totalPropertyResults: action.totalPropertyResults }),
      }
    }

    case c.SET_CUSTOM_SEARCH_RESULTS: {
      return {
        ...state,
        customSearchResults: action.customSearchResults,
        resultRecords: getResultRecords({ state, customSearchResults: action.customSearchResults }),
        resultFilterCalculations: calculateAmountTotals({ state, customSearchResults: action.customSearchResults }),
      }
    }

    default:
      return state
  }
}

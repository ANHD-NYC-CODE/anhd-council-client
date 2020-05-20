import * as c from 'shared/constants'

export const resetDashboardState = () => ({
  type: c.RESET_DASHBOARD_STATE,
})

export const setDashboardMapZoom = dashboardMapZoom => ({
  type: c.SET_DASHBOARD_MAP_ZOOM,
  dashboardMapZoom,
})

export const loadResultFilters = resultFilters => ({
  type: c.LOAD_RESULT_FILTERS,
  resultFilters,
})

export const setHousingTypeResultFilter = housingTypeResultFilter => ({
  type: c.SET_HOUSING_TYPE_RESULT_FILTER,
  housingTypeResultFilter,
})

export const setHousingTypeResultsIndex = housingTypeResultsIndex => ({
  type: c.SET_HOUSING_TYPE_RESULTS_INDEX,
  housingTypeResultsIndex,
})

export const setMapFilterDate = date => ({
  type: c.SET_MAP_FILTER_DATE,
  date,
})

export const setDashboardCustomView = districtShowCustomView => ({
  type: c.SET_DASHBOARD_CUSTOM_VIEW,
  districtShowCustomView,
})

export const toggleSelectedAmountFilter = amountFilter => ({
  type: c.TOGGLE_SELECTED_AMOUNT_FILTER,
  toggledFilter: amountFilter,
})

export const updateAmountFilter = amountFilter => ({
  type: c.UPDATE_AMOUNT_FILTER,
  amountFilter,
})

export const setTotalPropertyResults = (totalPropertyResults = []) => ({
  type: c.SET_TOTAL_PROPERTY_RESULTS,
  totalPropertyResults,
})

export const setDashboardTableView = dashboardTableView => ({
  type: c.SET_DASHBOARD_TABLE_VIEW,
  dashboardTableView,
})

export const setDashboardTableState = (dashboardTableState = {}) => ({
  type: c.SET_DASHBOARD_TABLE_STATE,
  dashboardTableState,
})

export const setDashboardFilterCondition = (filterCondition = 'OR') => ({
  type: c.SET_DASHBOARD_FILTER_CONDITION,
  filterCondition,
})

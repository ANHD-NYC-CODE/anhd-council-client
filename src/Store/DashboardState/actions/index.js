import * as c from 'shared/constants'

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

export const setCustomSearchResults = (customSearchResults = []) => ({
  type: c.SET_CUSTOM_SEARCH_RESULTS,
  customSearchResults,
})

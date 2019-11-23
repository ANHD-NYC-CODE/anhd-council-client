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

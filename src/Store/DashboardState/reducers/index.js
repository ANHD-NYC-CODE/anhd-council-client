import * as c from 'shared/constants'

export const initialState = {
  dashboardMapZoom: 14,
  housingTypeResultFilter: undefined,
  resultFilters: [], // initialize in Config/index.js
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

    default:
      return state
  }
}

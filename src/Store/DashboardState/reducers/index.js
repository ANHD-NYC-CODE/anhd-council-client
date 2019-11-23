import * as c from 'shared/constants'

export const initialState = {
  dashboardMapZoom: 14,
}

export const dashboardStateReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.SET_DASHBOARD_MAP_ZOOM: {
      return {
        ...state,
        dashboardMapZoom: action.dashboardMapZoom,
      }
    }
    default:
      return state
  }
}

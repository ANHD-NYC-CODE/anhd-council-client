import * as r from '../'
import * as a from '../../actions'
import * as c from 'shared/constants'

describe('DashboardState reducer', () => {
  it('should return the initial state', () => {
    expect(r.dashboardStateReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('SET_DASHBOARD_MAP_ZOOM', () => {
    it('sets dashboardMapZoom', () => {
      expect(r.dashboardStateReducer(undefined, a.setDashboardMapZoom(10))).toEqual({
        ...r.initialState,
        dashboardMapZoom: 10,
      })
    })
  })
})

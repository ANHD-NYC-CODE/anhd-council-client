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

  describe('LOAD_RESULT_FILTERS', () => {
    it('sets resultFilters and housingTypeResultFilter', () => {
      const filters = [1, 2]
      expect(r.dashboardStateReducer(undefined, a.loadResultFilters(filters))).toEqual({
        ...r.initialState,
        resultFilters: filters,
        housingTypeResultFilter: 1,
      })
    })
  })

  describe('SET_HOUSING_TYPE_RESULT_FILTER', () => {
    it('sets housingTypeResultFilter', () => {
      expect(r.dashboardStateReducer(undefined, a.setHousingTypeResultFilter(1))).toEqual({
        ...r.initialState,
        housingTypeResultFilter: 1,
      })
    })
  })

  describe('SET_MAP_FILTER_DATE', () => {
    it('sets mapFilterDate', () => {
      expect(r.dashboardStateReducer(undefined, a.setMapFilterDate(1))).toEqual({
        ...r.initialState,
        mapFilterDate: 1,
      })
    })
  })
})

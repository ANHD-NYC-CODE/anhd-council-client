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

  describe('SET_DASHBOARD_TABLE_VIEW', () => {
    it('sets dashboardTableView', () => {
      expect(r.dashboardStateReducer(undefined, a.setDashboardTableView(true))).toEqual({
        ...r.initialState,
        dashboardTableView: true,
      })
    })
  })

  describe('SET_DASHBOARD_TABLE_STATE', () => {
    it('sets dashboardTableView', () => {
      expect(r.dashboardStateReducer(undefined, a.setDashboardTableState({ page: 2 }))).toEqual({
        ...r.initialState,
        dashboardTableState: { page: 2 },
      })
    })
  })

  describe('LOAD_RESULT_FILTERS', () => {
    it('sets resultFilters and housingTypeResultFilter', () => {
      const filter1 = {
        id: 1,
        internalFilter: e => {
          return e
        },
      }
      const filters = [
        filter1,
        {
          id: 2,
          internalFilter: e => {
            return e
          },
        },
      ]
      expect(r.dashboardStateReducer(undefined, a.loadResultFilters(filters))).toEqual({
        ...r.initialState,
        resultFilters: filters,
        housingTypeResultFilter: filter1,
      })
    })
  })

  describe('SET_HOUSING_TYPE_RESULT_FILTER', () => {
    const filter1 = {
      id: 1,
      internalFilter: e => {
        return e
      },
    }
    it('sets housingTypeResultFilter', () => {
      expect(r.dashboardStateReducer(undefined, a.setHousingTypeResultFilter(filter1))).toEqual({
        ...r.initialState,
        housingTypeResultFilter: filter1,
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

  describe('SET_DASHBOARD_CUSTOM_VIEW', () => {
    it('sets mapFilterDate', () => {
      expect(r.dashboardStateReducer(undefined, a.setDashboardCustomView(true))).toEqual({
        ...r.initialState,
        districtShowCustomView: true,
      })
    })
  })

  describe('SET_DASHBOARD_FILTER_CONDITION', () => {
    it('sets the filter condition to AND', () => {
      expect(r.dashboardStateReducer(undefined, a.setDashboardFilterCondition('AND'))).toEqual({
        ...r.initialState,
        filterCondition: 'AND',
      })
    })

    it('sets the filter condition to OR', () => {
      expect(r.dashboardStateReducer(undefined, a.setDashboardFilterCondition('OR'))).toEqual({
        ...r.initialState,
        filterCondition: 'OR',
      })
    })
  })

  describe('TOGGLE_SELECTED_AMOUNT_FILTER', () => {
    it('sets selectedFilters', () => {
      const filter = 1
      expect(r.dashboardStateReducer(undefined, a.toggleSelectedAmountFilter(filter))).toEqual({
        ...r.initialState,
        selectedFilters: [1],
      })
    })

    it('removes a filter from  selectedFilters', () => {
      const filter = 1
      expect(
        r.dashboardStateReducer({ ...r.initialState, selectedFilters: [1] }, a.toggleSelectedAmountFilter(filter))
      ).toEqual({
        ...r.initialState,
        selectedFilters: [],
      })
    })
  })
})

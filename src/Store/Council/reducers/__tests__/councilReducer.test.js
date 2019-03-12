import * as r from '../'
import * as a from '../../actions'
import * as c from '../../constants'

describe('Council reducer', () => {
  it('should return the initial state', () => {
    expect(r.councilReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('HANDLE_GET_COUNCILS', () => {
    const response = [{ id: 1 }, { id: 2 }]
    it('fetches the resources', () => {
      expect(r.councilReducer(undefined, a.handleGetCouncils({ data: response }, null, false))).toEqual({
        ...r.initialState,
        districts: response,
      })
    })
  })

  describe('HANDLE_GET_COUNCIL', () => {
    const response = { id: 1 }
    it('fetches the resource', () => {
      expect(r.councilReducer(undefined, a.handleGetCouncil({ data: response }))).toEqual({
        ...r.initialState,
        district: response,
      })
    })
  })

  describe('HANDLE_GET_COUNCIL_HOUSING', () => {
    const response = { id: 1 }
    it('fetches the resource', () => {
      expect(r.councilReducer(undefined, a.handleGetCouncilHousing({ data: response }))).toEqual({
        ...r.initialState,
        districtHousing: response,
      })
    })
  })

  describe('HANDLE_GET_COUNCIL_PROPERTY_SUMMARY', () => {
    const response = [{ id: 1 }, { id: 2 }]
    it('fetches the resources', () => {
      expect(
        r.councilReducer(
          undefined,
          a.handleGetCouncilPropertySummary(
            {
              data: response,
            },
            c.constructSummaryConstant('GET_COUNCIL_PROPERTY_SUMMARY', {
              type: 'hpdviolations',
              comparison: 'gte',
              value: '10',
              startDate: '2017-01-01',
              endDate: '2018-01-01',
            })
          )
        )
      ).toEqual({
        ...r.initialState,
        districtPropertySummaries: {
          ['GET_COUNCIL_PROPERTY_SUMMARY_HPDVIOLATIONS_GTE_10_2017-01-01_2018-01-01']: response,
        },
      })
    })
  })
})

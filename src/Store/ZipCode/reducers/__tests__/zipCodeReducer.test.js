import * as r from '../'
import * as a from '../../actions'
import { constructSummaryConstant } from 'shared/constants'

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(r.zipCodeReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('HANDLE_GET_ZIPCODES', () => {
    const response = [{ id: 1 }, { id: 2 }]
    it('fetches the resources', () => {
      expect(r.zipCodeReducer(undefined, a.handleGetZipCodes({ data: response }, null, false))).toEqual({
        ...r.initialState,
        districts: response,
      })
    })
  })

  describe('HANDLE_GET_ZIPCODE', () => {
    const response = { id: 1 }
    it('fetches the resource', () => {
      expect(r.zipCodeReducer(undefined, a.handleGetZipCode({ data: response }))).toEqual({
        ...r.initialState,
        district: response,
      })
    })
  })

  describe('HANDLE_GET_ZIPCODE_HOUSING', () => {
    const response = { id: 1 }
    it('fetches the resource', () => {
      expect(r.zipCodeReducer(undefined, a.handleGetZipCodeHousing({ data: response }))).toEqual({
        ...r.initialState,
        districtHousing: response,
      })
    })
  })

  describe('HANDLE_GET_ZIPCODE_PROPERTY_SUMMARY', () => {
    const response = [{ id: 1 }, { id: 2 }]
    it('fetches the resources', () => {
      expect(
        r.zipCodeReducer(
          undefined,
          a.handleGetZipCodePropertySummary(
            {
              data: response,
            },
            constructSummaryConstant('GET_ZIPCODE_PROPERTY_SUMMARY', {
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
          ['GET_ZIPCODE_PROPERTY_SUMMARY_HPDVIOLATIONS_GTE_10_2017-01-01_2018-01-01']: response,
        },
      })
    })
  })
})

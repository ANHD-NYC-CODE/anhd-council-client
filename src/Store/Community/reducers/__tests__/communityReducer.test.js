import * as r from '../'
import * as a from '../../actions'
import * as c from '../../constants'

describe('Community reducer', () => {
  it('should return the initial state', () => {
    expect(r.communityReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('HANDLE_GET_COMMUNITIES', () => {
    const response = [{ id: 1 }, { id: 2 }]
    it('fetches the resources', () => {
      expect(r.communityReducer(undefined, a.handleGetCommunities({ data: response }))).toEqual({
        ...r.initialState,
        districts: response,
      })
    })
  })

  describe('HANDLE_GET_COMMUNITY', () => {
    const response = { id: 1 }
    it('fetches the resource', () => {
      expect(r.communityReducer(undefined, a.handleGetCommunity({ data: response }))).toEqual({
        ...r.initialState,
        district: response,
      })
    })
  })

  describe('HANDLE_GET_COMMUNITY_HOUSING', () => {
    const response = { id: 1 }
    it('fetches the resource', () => {
      expect(r.communityReducer(undefined, a.handleGetCommunityHousing({ data: response }))).toEqual({
        ...r.initialState,
        districtHousing: response,
      })
    })
  })

  describe('HANDLE_GET_COMMUNITY_PROPERTY_SUMMARY', () => {
    const response = [{ id: 1 }, { id: 2 }]
    it('fetches the resources', () => {
      expect(
        r.communityReducer(
          undefined,
          a.handleGetCommunityPropertySummary(
            {
              data: response,
            },
            c.constructSummaryConstant('GET_COMMUNITY_PROPERTY_SUMMARY', {
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
          ['GET_COMMUNITY_PROPERTY_SUMMARY_HPDVIOLATIONS_GTE_10_2017-01-01_2018-01-01']: response,
        },
      })
    })
  })
})

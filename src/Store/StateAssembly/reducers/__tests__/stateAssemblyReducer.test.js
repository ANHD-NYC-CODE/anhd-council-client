import * as r from '../'
import * as a from '../../actions'
import { constructSummaryConstant } from 'shared/constants'

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(r.stateAssemblyReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('HANDLE_GET_STATE_ASSEMBLIES', () => {
    const response = [{ id: 1 }, { id: 2 }]
    it('fetches the resources', () => {
      expect(r.stateAssemblyReducer(undefined, a.handleGetStateAssemblies({ data: response }, null, false))).toEqual({
        ...r.initialState,
        districts: response,
      })
    })
  })

  describe('HANDLE_GET_STATE_ASSEMBLY', () => {
    const response = { id: 1 }
    it('fetches the resource', () => {
      expect(r.stateAssemblyReducer(undefined, a.handleGetStateAssembly({ data: response }))).toEqual({
        ...r.initialState,
        district: response,
      })
    })
  })

  describe('HANDLE_GET_STATE_ASSEMBLY_HOUSING', () => {
    const response = { id: 1 }
    it('fetches the resource', () => {
      expect(r.stateAssemblyReducer(undefined, a.handleGetStateAssemblyHousing({ data: response }))).toEqual({
        ...r.initialState,
        districtHousing: response,
      })
    })
  })

  describe('HANDLE_GET_STATE_ASSEMBLY_PROPERTY_SUMMARY', () => {
    const response = [{ id: 1 }, { id: 2 }]
    it('fetches the resources', () => {
      expect(
        r.stateAssemblyReducer(
          undefined,
          a.handleGetStateAssemblyPropertySummary(
            {
              data: response,
            },
            constructSummaryConstant('GET_STATE_ASSEMBLY_PROPERTY_SUMMARY', {
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
          ['GET_STATE_ASSEMBLY_PROPERTY_SUMMARY_HPDVIOLATIONS_GTE_10_2017-01-01_2018-01-01']: response,
        },
      })
    })
  })
})

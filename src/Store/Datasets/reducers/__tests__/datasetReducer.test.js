import * as r from '../'
import * as a from '../../actions'

describe('Dataset reducer', () => {
  it('should return the initial state', () => {
    expect(r.datasetReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('HANDLE_GET_DATASETS', () => {
    const response = [{ id: 1 }, { id: 2 }]
    it('fetches the resources', () => {
      expect(r.datasetReducer(undefined, a.handleGetDatasets({ data: response }))).toEqual({
        ...r.initialState,
        datasets: response,
      })
    })
  })
})

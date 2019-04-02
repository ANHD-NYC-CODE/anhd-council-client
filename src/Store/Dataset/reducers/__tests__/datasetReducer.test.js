import * as r from '../'
import * as a from '../../actions'

describe('Dataset reducer', () => {
  it('should return the initial state', () => {
    expect(r.datasetReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('HANDLE_GET_DATASETS', () => {
    const datasets = [{ model_name: 'hpdviolation' }, { model_name: 'something' }]

    it('fetches the resources and loads the models', () => {
      const reducer = r.datasetReducer(undefined, a.handleGetDatasets({ data: datasets }))

      expect(reducer.datasets).toEqual(datasets)
    })
  })
})

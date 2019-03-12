import * as r from '../'
import * as a from '../../actions'
import * as datasetModels from 'shared/models/datasets'

describe('Dataset reducer', () => {
  it('should return the initial state', () => {
    expect(r.datasetReducer(undefined, {})).toEqual(r.initialState)
  })

  describe('HANDLE_GET_DATASETS', () => {
    const response = [{ model_name: 'hpdviolations' }, { model_name: 'something' }]
    it('fetches the resources and loads the models', () => {
      const reducer = r.datasetReducer(undefined, a.handleGetDatasets({ data: response }))
      expect(reducer.datasets).toEqual(response)
      expect(reducer.datasetModels.length).toEqual(Object.keys(datasetModels).length)
    })
  })
})

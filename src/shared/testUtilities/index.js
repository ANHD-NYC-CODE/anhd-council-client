import configureStore from 'Store/configureStore'
import { setupDatasetModels, setupHousingTypeModels } from 'shared/utilities/actionUtils'

export const setupStore = initialState => {
  return configureStore({ ...initialState })
}

export const flushAllPromises = () => new Promise(resolve => window.setImmediate(resolve))

export const configuredState = state => {
  const datasetsResponse = [{ model_name: 'hpdviolation' }]
  const dataset = {
    datasets: datasetsResponse,
    housingTypeModels: setupHousingTypeModels(datasetsResponse),
    datasetModels: setupDatasetModels(datasetsResponse),
  }
  const council = { districts: [{ id: 1 }, { id: 2 }, { id: 3 }] }
  const community = { boards: [{ id: 1 }] }
  return { dataset, council, community, ...state }
}

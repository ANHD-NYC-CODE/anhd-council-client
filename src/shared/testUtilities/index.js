import configureStore from 'Store/configureStore'
import { setupDatasetModels, setupHousingTypeModels } from 'shared/utilities/actionUtils'

export const setupStore = initialState => {
  return configureStore({ ...initialState })
}

export const flushAllPromises = () => new Promise(resolve => window.setImmediate(resolve))

const mockGeography = id => {
  return {
    id,
    data: {
      type: 'Feature',
      id: id,
      properties: {
        id: id,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.9721628924519, 40.6331198638061],
            [-73.9814330149274, 40.6349633592035],
            [-73.9723127246017, 40.6330501559777],
            [-73.9721628924519, 40.6331198638061],
          ],
        ],
      },
    },
  }
}

export const configuredState = state => {
  const datasetsResponse = [{ model_name: 'hpdviolation' }]
  const dataset = {
    datasets: datasetsResponse,
    housingTypeModels: setupHousingTypeModels(datasetsResponse),
    datasetModels: setupDatasetModels(datasetsResponse),
  }
  const council = { districts: [mockGeography(1), mockGeography(2), mockGeography(3)] }
  const community = { boards: [mockGeography(1)] }
  return { dataset, council, community, ...state }
}

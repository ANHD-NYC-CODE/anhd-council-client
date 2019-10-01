import configureStore from 'Store/configureStore'
import { setupResourceModels } from 'shared/utilities/configUtils'
import * as resources from 'shared/models/resources'
import Resource from 'shared/classes/Resource'

export const mockSetupResourceModels = () => {
  let loadedResources = {}
  Object.keys(resources).forEach(constant => {
    loadedResources[constant] = new Resource({ resourceModel: resources[constant]() })
  })
  return loadedResources
}

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

export const mockDatasetsResponse = [
  { model_name: 'Property' },
  {
    model_name: 'HPDViolation',
  },
  { model_name: 'DOBViolation' },
  { model_name: 'HPDComplaint' },
  { model_name: 'DOBComplaint' },
  { model_name: 'ECBViolation' },
  {
    model_name: 'AcrisRealMaster',
    records_start: '2018-01-01',
    records_end: '2019-01-01',
    automated: true,
    update_schedule: 'monthly',
  },
  { model_name: 'Eviction' },
  { model_name: 'Lispenden' },
  { model_name: 'Foreclosure' },
  { model_name: 'HousingLitigation' },
  { model_name: 'DOBFiledPermit' },
  { model_name: 'DOBIssuedPermit' },
  { model_name: 'CONHRecord', version: '2018' },
  { model_name: 'RentStabilizationRecord', version: '2017' },
  { model_name: 'TaxLien', version: '2018' },
]

export const configuredState = state => {
  const dataset = {
    datasets: mockDatasetsResponse,
    resourceModels: setupResourceModels(mockDatasetsResponse),
  }
  const council = { districts: [mockGeography(1), mockGeography(2), mockGeography(3)] }
  const community = { boards: [mockGeography(1)] }
  return { dataset, council, community, ...state }
}

import configureStore from 'Store/configureStore'
import { setupResourceModels } from 'shared/utilities/configUtils'
import * as resources from 'shared/models/resources'
import Resource from 'shared/classes/Resource'
import * as dashboardReducer from 'Store/DashboardState/reducers'
import { constantToModelName } from 'shared/utilities/filterUtils'

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

// **
// Mock response of the /datasets endpoint
// which populates the config wrapper.
// So make sure to add in each new dataset here
// **
export const mockDatasetsResponse = () => {
  const resp = Object.keys(resources).map(constant => ({ model_name: constantToModelName(constant) }))

  // add in RentStabilizationRecord + other datasets we don't have frontend models for
  resp.push({ model_name: 'RentStabilizationRecord', version: '2017' })

  // setup misc model data for tests
  const acrisrealmaster = resp.find(obj => obj.model_name.toLowerCase() === 'acrisrealmaster')
  acrisrealmaster.records_start = '2018-01-01'
  acrisrealmaster.records_end = '2019-01-01'
  acrisrealmaster.automated = true
  acrisrealmaster.update_schedule = 'monthly'

  const conh = resp.find(obj => obj.model_name.toLowerCase() === 'conhrecord')
  conh.version = '2018'

  const taxlien = resp.find(obj => obj.model_name.toLowerCase() === 'taxlien')
  taxlien.version = '2018'

  return resp
}

// [
//   { model_name: 'Property', version: '1' },
//   {
//     model_name: 'HPDViolation',
//   },
//   { model_name: 'DOBViolation' },
//   { model_name: 'HPDComplaint' },
//   { model_name: 'DOBComplaint' },
//   { model_name: 'ECBViolation' },
//   {
//     model_name: 'AcrisRealMaster',
//     records_start: '2018-01-01',
//     records_end: '2019-01-01',
//     automated: true,
//     update_schedule: 'monthly',
//   },
//   { model_name: 'Eviction' },
//   { model_name: 'Lispenden' },
//   { model_name: 'Foreclosure' },
//   { model_name: 'PSForeclosure' },
//   { model_name: 'HousingLitigation' },
//   { model_name: 'DOBFiledPermit' },
//   { model_name: 'DOBIssuedPermit' },
//   { model_name: 'CONHRecord', version: '2018' },
//   { model_name: 'RentStabilizationRecord', version: '2017' },
//   { model_name: 'TaxLien', version: '2018' },
// ]

export const configuredState = state => {
  const dataset = {
    datasets: mockDatasetsResponse(),
    resourceModels: setupResourceModels(mockDatasetsResponse()),
  }
  const council = { districts: [mockGeography(1), mockGeography(2), mockGeography(3)] }
  const community = { districts: [mockGeography(101), mockGeography(102)] }
  const stateAssembly = { districts: [mockGeography(1)] }
  const stateSenate = { districts: [mockGeography(1)] }
  const zipCode = { districts: [mockGeography(1)] }
  const dashboardState = dashboardReducer.initialState

  return { dataset, council, community, stateAssembly, stateSenate, zipCode, dashboardState, ...state }
}

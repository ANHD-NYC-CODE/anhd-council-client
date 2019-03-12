import { constructAxiosGet } from 'shared/utilities/Axios'
import * as u from 'shared/constants/urls'

import * as c from '../constants'
import * as d from 'shared/models/datasets'
import * as ht from 'shared/models/housingTypes'

import { Dataset } from 'shared/classes/Dataset'
import { constantToModelName } from 'shared/utilities/filterUtils'

export const handleGetDatasets = (response, key = null) => {
  const datasetModels = setupDatasetModels(response)
  const housingTypeModels = setupHousingTypeModels(response)
  return {
    type: c.HANDLE_GET_DATASETS,
    data: { datasets: response.data, datasetModels, housingTypeModels },
  }
}

const setupHousingTypeModels = response => {
  return Object.keys(ht).map(constant => {
    let databaseObject
    switch (constant) {
      case 'RENTSTABILIZED':
        databaseObject = response.data.find(object => object.model_name.toUpperCase() === 'CORESUBSIDYRECORD')
    }
    return new Dataset({ model: ht[constant](databaseObject) })
  })
}

const setupDatasetModels = response => {
  return Object.keys(d).map(constant => {
    const databaseObject = response.data.find(
      object => object.model_name.toUpperCase() === constantToModelName(constant).toUpperCase
    )
    return new Dataset({ model: d[constant](databaseObject) })
  })
}

export const getDatasets = () => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    u.DATASET_URL,
    null,
    access_token,
    c.GET_DATASETS,
    handleGetDatasets
  )
}

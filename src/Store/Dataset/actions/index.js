import { constructAxiosGet } from 'shared/utilities/Axios'
import * as u from 'shared/constants/urls'

import * as c from '../constants'
import { setupDatasetModels, setupHousingTypeModels } from 'shared/utilities/actionUtils'

export const handleGetDatasets = (response, key = null) => {
  const datasetModels = setupDatasetModels(response.data)
  const housingTypeModels = setupHousingTypeModels(response.data)
  return {
    type: c.HANDLE_GET_DATASETS,
    data: { datasets: response.data, datasetModels, housingTypeModels },
  }
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

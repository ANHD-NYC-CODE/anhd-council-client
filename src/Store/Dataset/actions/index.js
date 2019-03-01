import { constructAxiosGet } from 'shared/utilities/Axios'
import * as u from 'shared/constants/urls'

import * as c from '../constants'

export const handleGetDatasets = (response, key = null) => ({
  type: c.HANDLE_GET_DATASETS,
  data: response.data,
})

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

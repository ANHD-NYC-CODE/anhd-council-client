import { constructAxiosGet } from 'shared/utilities/Axios'
import * as u from 'shared/constants/urls'
import * as c from '../constants'

export const handleGetBuilding = (response) => ({
  type: c.HANDLE_GET_BUILDING,
  data: response.data,
})

export const handleGetBuildingResource = (response, key = null) => ({
  type: c.HANDLE_GET_BUILDING_RESOURCE,
  key,
  data: response.data,
})

export const getBuilding = id => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.BUILDING_URL}${id}`,
    null,
    access_token,
    c.GET_BUILDING,
    handleGetBuilding
  )
}

export const getBuildingResource = (dataset, id, _, actionKey) => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.BUILDING_URL}${id}${dataset.url}`,
    null,
    access_token,
    actionKey,
    handleGetBuildingResource
  )
}

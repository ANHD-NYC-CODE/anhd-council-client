import { constructAxiosGet } from 'shared/utilities/Axios'
import * as u from 'shared/constants/urls'
import * as c from '../constants'
import { constructActionKey } from 'shared/utilities/actionUtils'

export const handleGetBuilding = (response, key = null) => ({
  type: c.HANDLE_GET_BUILDING,
  data: response.data,
})

export const handleGetBuildingResource = (response, key = null) => ({
  type: c.HANDLE_GET_BUILDING_RESOURCE,
  key: key,
  data: response.data,
})

export const getBuilding = id => (dispatch, access_token) => {
  return constructAxiosGet(`${u.BUILDING_URL}${id}`, null, access_token, dispatch, c.GET_BUILDING, handleGetBuilding)
}

export const getBuildingResource = (dataset, id, params = null) => (dispatch, access_token) => {
  const CONSTANT = constructActionKey(dataset.constant, params)
  return constructAxiosGet(
    `${u.BUILDING_URL}${id}${dataset.url}`,
    null,
    access_token,
    dispatch,
    CONSTANT,
    handleGetBuildingResource
  )
}

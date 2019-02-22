import { constructAxiosGet } from 'shared/utilities/Axios'
import * as u from 'shared/constants/urls'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'

import * as c from '../constants'
import { handleCatchError, handleActionDispatch } from 'shared/utilities/actionUtils'

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

export const getBuildingResource = (constant, id) => (dispatch, access_token) => {
  const resourceUrl = constant.split('GET_BUILDING_')[1] + '_URL'
  return constructAxiosGet(
    `${u.BUILDING_URL}${id}${u[resourceUrl]}`,
    null,
    access_token,
    dispatch,
    constant,
    handleGetBuildingResource
  )
}

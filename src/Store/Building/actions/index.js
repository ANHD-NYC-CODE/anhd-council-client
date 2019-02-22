import { Axios } from 'shared/utilities/Axios'
import * as u from 'shared/constants/urls'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'

import * as c from '../constants'
import { handleCatchError } from 'shared/utilities/actionUtils'

export const handleGetBuilding = response => ({
  type: c.HANDLE_GET_BUILDING,
  data: response.data,
})

export const handleGetBuildingResource = (type, response) => ({
  type: c.HANDLE_GET_BUILDING_RESOURCE,
  key: type,
  data: response.data,
})

export const getBuilding = id => (dispatch, access_token) => {
  dispatch(loadingActions.handleRequest(c.GET_BUILDING))
  dispatch(errorActions.handleClearErrors(c.GET_BUILDING))
  return Axios.get(`${u.BUILDING_URL}${id}`, {
    params: { format: 'json' },
    headers: typeof access_token === 'string' ? { authorization: `Bearer ${access_token}` } : null,
  })
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(c.GET_BUILDING))
      dispatch(handleGetBuilding(response))
    })
    .catch(error => {
      handleCatchError(error, c.GET_BUILDING, dispatch)
    })
}

export const getBuildingResource = (constant, id) => (dispatch, access_token) => {
  dispatch(loadingActions.handleRequest(constant))
  dispatch(errorActions.handleClearErrors(constant))
  const resourceUrl = constant.split('GET_BUILDING_')[1] + '_URL'
  return Axios.get(`${u.BUILDING_URL}${id}${u[resourceUrl]}`, {
    params: { format: 'json' },
    headers: typeof access_token === 'string' ? { authorization: `Bearer ${access_token}` } : null,
  })
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(constant))
      dispatch(handleGetBuildingResource(constant, response))
    })
    .catch(error => {
      handleCatchError(error, constant, dispatch)
    })
}

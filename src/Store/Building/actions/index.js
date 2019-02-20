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

export const handleGetBuildingHpdViolations = response => ({
  type: c.HANDLE_GET_BUILDING_HPD_VIOLATIONS,
  data: response.data,
})

export const handleGetBuildingDobViolations = response => ({
  type: c.HANDLE_GET_BUILDING_DOB_VIOLATIONS,
  data: response.data,
})

export const getBuilding = id => (dispatch, access_token) => {
  dispatch(loadingActions.handleRequest(c.GET_BUILDING))
  dispatch(errorActions.handleClearErrors(c.GET_BUILDING))
  return Axios.get(`${u.BUILDING_URL}${id}`, {
    params: { format: 'json' },
    headers: access_token ? { authorization: `Bearer ${access_token}` } : null,
  })
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(c.GET_BUILDING))
      dispatch(handleGetBuilding(response))
    })
    .catch(error => {
      handleCatchError(error, c.GET_BUILDING, dispatch)
    })
}

export const getBuildingHpdViolations = id => (dispatch, access_token) => {
  dispatch(loadingActions.handleRequest(c.GET_BUILDING_HPD_VIOLATIONS))
  dispatch(errorActions.handleClearErrors(c.GET_BUILDING_HPD_VIOLATIONS))
  return Axios.get(`${u.BUILDING_URL}${id}${u.HPD_VIOLATIONS_URL}`, {
    params: { format: 'json' },
    headers: access_token ? { authorization: `Bearer ${access_token}` } : null,
  })
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(c.GET_BUILDING_HPD_VIOLATIONS))
      dispatch(handleGetBuildingHpdViolations(response))
    })
    .catch(error => {
      handleCatchError(error, c.GET_BUILDING_HPD_VIOLATIONS, dispatch)
    })
}

export const getBuildingDobViolations = id => (dispatch, access_token) => {
  dispatch(loadingActions.handleRequest(c.GET_BUILDING_DOB_VIOLATIONS))
  dispatch(errorActions.handleClearErrors(c.GET_BUILDING_DOB_VIOLATIONS))
  return Axios.get(`${u.BUILDING_URL}${id}${u.DOB_VIOLATIONS_URL}`, {
    params: { format: 'json' },
    headers: access_token ? { authorization: `Bearer ${access_token}` } : null,
  })
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(c.GET_BUILDING_DOB_VIOLATIONS))
      dispatch(handleGetBuildingDobViolations(response))
    })
    .catch(error => {
      handleCatchError(error, c.GET_BUILDING_DOB_VIOLATIONS, dispatch)
    })
}

import { constructAxiosGet } from 'shared/utilities/Axios'
import * as u from 'shared/constants/urls'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'

import * as c from '../constants'
import { handleCatchError, constructActionKey, constructSimplePropertyParams } from 'shared/utilities/actionUtils'

export const handleGetCouncils = response => ({
  type: c.HANDLE_GET_COUNCILS,
  data: response.data,
})

export const handleGetCouncil = response => ({
  type: c.HANDLE_GET_COUNCIL,
  data: response.data,
})

export const handleGetCouncilHousing = response => ({
  type: c.HANDLE_GET_COUNCIL_HOUSING,
  data: response.data,
})

export const handleGetCouncilPropertySummary = (type, response) => ({
  type: c.HANDLE_GET_COUNCIL_PROPERTY_SUMMARY,
  data: response.data,
  key: type,
})

export const getCouncils = () => (dispatch, access_token) => {
  dispatch(loadingActions.handleRequest(c.GET_COUNCILS))
  dispatch(errorActions.handleClearErrors(c.GET_COUNCILS))
  return constructAxiosGet(u.COUNCILS_URL, null, access_token)
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(c.GET_COUNCILS))
      dispatch(handleGetCouncils(response))
    })
    .catch(error => {
      handleCatchError(error, c.GET_COUNCILS, dispatch)
    })
}

export const getCouncil = id => (dispatch, access_token) => {
  dispatch(loadingActions.handleRequest(c.GET_COUNCIL))
  dispatch(errorActions.handleClearErrors(c.GET_COUNCIL))
  return constructAxiosGet(`${u.COUNCILS_URL}${id}`, null, access_token)
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(c.GET_COUNCIL))
      dispatch(handleGetCouncil(response))
    })
    .catch(error => {
      handleCatchError(error, c.GET_COUNCIL, dispatch)
    })
}

export const getCouncilHousing = (id, params) => (dispatch, access_token) => {
  dispatch(loadingActions.handleRequest(c.GET_COUNCIL_HOUSING))
  dispatch(errorActions.handleClearErrors(c.GET_COUNCIL_HOUSING))
  return constructAxiosGet(`${u.COUNCILS_URL}${id}/housing`, params, access_token)
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(c.GET_COUNCIL_HOUSING))
      dispatch(handleGetCouncilHousing(response))
    })
    .catch(error => {
      handleCatchError(error, c.GET_COUNCIL, dispatch)
    })
}

export const getCouncilPropertySummary = (constant, id, params) => (dispatch, access_token) => {
  const CONSTANT = constructActionKey(c.GET_COUNCIL_PROPERTY_SUMMARY, params)
  dispatch(loadingActions.handleRequest(CONSTANT))
  dispatch(errorActions.handleClearErrors(CONSTANT))
  return constructAxiosGet(
    `${u.COUNCILS_URL}${id}${u.PROPERTY_URL}`,
    constructSimplePropertyParams(params),
    access_token
  )
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(CONSTANT))
      dispatch(handleGetCouncilPropertySummary(CONSTANT, response))
    })
    .catch(error => {
      handleCatchError(error, CONSTANT, dispatch)
    })
}

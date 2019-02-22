import { Axios } from 'shared/utilities/Axios'
import * as u from 'shared/constants/urls'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'

import * as c from '../constants'
import { handleCatchError } from 'shared/utilities/actionUtils'

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

export const handleGetCouncilPropertySummary = response => ({
  type: c.HANDLE_GET_COUNCIL_PROPERTY_SUMMARY,
  data: response.data,
  key: '',
})

export const getCouncils = () => (dispatch, access_token) => {
  dispatch(loadingActions.handleRequest(c.GET_COUNCILS))
  dispatch(errorActions.handleClearErrors(c.GET_COUNCILS))
  return Axios.get(u.COUNCILS_URL, {
    params: { format: 'json' },
    headers: typeof access_token === 'string' ? { authorization: `Bearer ${access_token}` } : null,
  })
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
  return Axios.get(`${u.COUNCILS_URL}${id}`, {
    params: { format: 'json' },
    headers: typeof access_token === 'string' ? { authorization: `Bearer ${access_token}` } : null,
  })
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
  return Axios.get(`${u.COUNCILS_URL}${id}/housing`, {
    params: { format: 'json', ...params },
    headers: typeof access_token === 'string' ? { authorization: `Bearer ${access_token}` } : null,
  })
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(c.GET_COUNCIL_HOUSING))
      dispatch(handleGetCouncilHousing(response))
    })
    .catch(error => {
      handleCatchError(error, c.GET_COUNCIL, dispatch)
    })
}

export const getCouncilPropertySummary = (id, params) => (dispatch, access_token) => {
  const CONSTANT = c.constructSummaryConstant(c.GET_COUNCIL_PROPERTY_SUMMARY, params)
  dispatch(loadingActions.handleRequest(CONSTANT))
  dispatch(errorActions.handleClearErrors(CONSTANT))
  return Axios.get(`${u.COUNCILS_URL}${id}${u.PROPERTY_URL}`, {
    params: { format: 'json', ...params },
    headers: typeof access_token === 'string' ? { authorization: `Bearer ${access_token}` } : null,
  })
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(CONSTANT))
      dispatch(handleGetCouncilHousing(response))
    })
    .catch(error => {
      handleCatchError(error, CONSTANT, dispatch)
    })
}

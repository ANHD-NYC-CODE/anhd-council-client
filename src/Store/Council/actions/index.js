import { constructAxiosGet } from 'shared/utilities/Axios'
import * as u from 'shared/constants/urls'

import * as c from '../constants'
import { constructSimplePropertyParams } from 'shared/utilities/actionUtils'

export const handleGetCouncils = (response, key = null) => ({
  type: c.HANDLE_GET_COUNCILS,
  data: response.data,
})

export const handleGetCouncil = (response, key = null) => ({
  type: c.HANDLE_GET_COUNCIL,
  data: response.data,
})

export const handleGetCouncilHousing = (response, key = null) => ({
  type: c.HANDLE_GET_COUNCIL_HOUSING,
  data: response.data,
})

export const handleGetCouncilPropertySummary = (response, key = null) => ({
  type: c.HANDLE_GET_COUNCIL_PROPERTY_SUMMARY,
  data: response.data,
  key: key,
})

export const getCouncils = () => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    u.COUNCIL_URL,
    null,
    access_token,
    c.GET_COUNCILS,
    handleGetCouncils
  )
}

export const getCouncil = id => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.COUNCIL_URL}${id}/`,
    null,
    access_token,
    c.GET_COUNCIL,
    handleGetCouncil
  )
}

export const getCouncilHousing = (id, params) => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.COUNCIL_URL}${id}/housing`,
    params,
    access_token,
    c.GET_COUNCIL_HOUSING,
    handleGetCouncilHousing
  )
}

export const getCouncilPropertySummary = (dataset, id, params, actionKey) => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.COUNCIL_URL}${id}${u.PROPERTY_URL}`,
    constructSimplePropertyParams(params),
    access_token,
    actionKey,
    handleGetCouncilPropertySummary
  )
}

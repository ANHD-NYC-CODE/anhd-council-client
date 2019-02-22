import { constructAxiosGet } from 'shared/utilities/Axios'
import * as u from 'shared/constants/urls'

import * as c from '../constants'
import { constructActionKey, constructSimplePropertyParams } from 'shared/utilities/actionUtils'

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

export const getCouncils = () => (dispatch, access_token) => {
  return constructAxiosGet(u.COUNCILS_URL, null, access_token, dispatch, c.GET_COUNCILS, handleGetCouncils)
}

export const getCouncil = id => (dispatch, access_token) => {
  return constructAxiosGet(`${u.COUNCILS_URL}${id}`, null, access_token, dispatch, c.GET_COUNCIL, handleGetCouncil)
}

export const getCouncilHousing = (id, params) => (dispatch, access_token) => {
  return constructAxiosGet(
    `${u.COUNCILS_URL}${id}/housing`,
    params,
    access_token,
    dispatch,
    c.GET_COUNCIL_HOUSING,
    handleGetCouncilHousing
  )
}

export const getCouncilPropertySummary = (constant, id, params) => (dispatch, access_token) => {
  const CONSTANT = constructActionKey(c.GET_COUNCIL_PROPERTY_SUMMARY, params)
  return constructAxiosGet(
    `${u.COUNCILS_URL}${id}${u.PROPERTY_URL}`,
    constructSimplePropertyParams(params),
    access_token,
    dispatch,
    CONSTANT,
    handleGetCouncilPropertySummary
  )
}

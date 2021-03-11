import { constructAxiosGet } from 'shared/utilities/Axios'
import * as u from 'shared/constants/urls'

import {
  ZIPCODE_INDEX,
  getStorageDataAction,
  setIndexedDataThenUpdateReducer,
  delZipCodeData,
} from 'shared/utilities/storageUtils'

import * as c from '../constants'
import { constructSimplePropertyParams } from 'shared/utilities/actionUtils'

const getZipCodeActionObject = response => ({
  type: c.HANDLE_GET_ZIPCODES,
  data: response.data,
})

export const handleGetZipCodes = (response, _, setStorage = true) => {
  if (setStorage) {
    delZipCodeData().then(() => {
      setIndexedDataThenUpdateReducer(ZIPCODE_INDEX, response)
    })
  }
  return getZipCodeActionObject(response)
}

export const handleGetZipCode = (response) => ({
  type: c.HANDLE_GET_ZIPCODE,
  data: response.data,
})

export const handleGetZipCodeHousing = (response) => ({
  type: c.HANDLE_GET_ZIPCODE_HOUSING,
  data: response.data,
})

export const handleGetZipCodePropertySummary = (response, key = null) => ({
  type: c.HANDLE_GET_ZIPCODE_PROPERTY_SUMMARY,
  data: response.data,
  key,
})

export const getZipCodes = () => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)
  return getStorageDataAction(dispatch, c.GET_ZIPCODES, requestId, ZIPCODE_INDEX, handleGetZipCodes)
    .then(storageData => {
      // TODO: Temporary - reset the DBs
      if (!storageData) {
        return zipCodesAxios(dispatch, getState, access_token, requestId)
      }
    })
    .catch(() => zipCodesAxios(dispatch, getState, access_token, requestId))
}

const zipCodesAxios = (dispatch, getState, access_token, requestId) => {
  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    u.ZIPCODE_URL,
    null,
    access_token,
    c.GET_ZIPCODES,
    handleGetZipCodes
  )
}

export const getZipCode = id => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.ZIPCODE_URL}${id}/`,
    null,
    access_token,
    c.GET_ZIPCODE,
    handleGetZipCode
  )
}

export const getZipCodeHousing = (id, params) => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.ZIPCODE_URL}${id}/housing`,
    params,
    access_token,
    c.GET_ZIPCODE_HOUSING,
    handleGetZipCodeHousing
  )
}

export const getZipCodePropertySummary = (dataset, id, params, actionKey) => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.ZIPCODE_URL}${id}${u.PROPERTY_URL}`,
    constructSimplePropertyParams(params),
    access_token,
    actionKey,
    handleGetZipCodePropertySummary
  )
}

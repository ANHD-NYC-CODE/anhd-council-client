import { constructAxiosGet } from 'shared/utilities/Axios'
import * as u from 'shared/constants/urls'

import {
  STATE_SENATE_INDEX,
  getStorageDataAction,
  setIndexedDataThenUpdateReducer,
  delStateSenateData,
} from 'shared/utilities/storageUtils'

import * as c from '../constants'
import { constructSimplePropertyParams } from 'shared/utilities/actionUtils'

const getStateSenateActionObject = response => ({
  type: c.HANDLE_GET_STATE_SENATES,
  data: response.data,
})

export const handleGetStateSenates = (response, _, setStorage = true) => {
  if (setStorage) {
    delStateSenateData().then(() => {
      setIndexedDataThenUpdateReducer(STATE_SENATE_INDEX, response)
    })
  }
  return getStateSenateActionObject(response)
}

export const handleGetStateSenate = (response) => ({
  type: c.HANDLE_GET_STATE_SENATE,
  data: response.data,
})

export const handleGetStateSenateHousing = (response) => ({
  type: c.HANDLE_GET_STATE_SENATE_HOUSING,
  data: response.data,
})

export const handleGetStateSenatePropertySummary = (response, key = null) => ({
  type: c.HANDLE_GET_STATE_SENATE_PROPERTY_SUMMARY,
  data: response.data,
  key,
})

export const getStateSenates = () => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)
  return getStorageDataAction(dispatch, c.GET_STATE_SENATES, requestId, STATE_SENATE_INDEX, handleGetStateSenates)
    .then(storageData => {
      // TODO: Temporary - reset the DBs
      if (!storageData) {
        return stateSenatesAxios(dispatch, getState, access_token, requestId)
      }
    })
    .catch(() => stateSenatesAxios(dispatch, getState, access_token, requestId))
}

const stateSenatesAxios = (dispatch, getState, access_token, requestId) => {
  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    u.STATE_SENATE_URL,
    null,
    access_token,
    c.GET_STATE_SENATES,
    handleGetStateSenates
  )
}

export const getStateSenate = id => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.STATE_SENATE_URL}${id}/`,
    null,
    access_token,
    c.GET_STATE_SENATE,
    handleGetStateSenate
  )
}

export const getStateSenateHousing = (id, params) => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.STATE_SENATE_URL}${id}/housing`,
    params,
    access_token,
    c.GET_STATE_SENATE_HOUSING,
    handleGetStateSenateHousing
  )
}

export const getStateSenatePropertySummary = (dataset, id, params, actionKey) => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.STATE_SENATE_URL}${id}${u.PROPERTY_URL}`,
    constructSimplePropertyParams(params),
    access_token,
    actionKey,
    handleGetStateSenatePropertySummary
  )
}

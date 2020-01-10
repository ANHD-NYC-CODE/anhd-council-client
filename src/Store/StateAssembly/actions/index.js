import { constructAxiosGet } from 'shared/utilities/Axios'
import * as u from 'shared/constants/urls'

import {
  STATE_ASSEMBLY_INDEX,
  getStorageDataAction,
  setIndexedDataThenUpdateReducer,
  delStateAssemblyData,
} from 'shared/utilities/storageUtils'

import * as c from '../constants'
import { constructSimplePropertyParams } from 'shared/utilities/actionUtils'

const getStateAssemblyActionObject = response => ({
  type: c.HANDLE_GET_STATE_ASSEMBLIES,
  data: response.data,
})

export const handleGetStateAssemblies = (response, key = null, setStorage = true) => {
  if (setStorage) {
    delStateAssemblyData().then(() => {
      setIndexedDataThenUpdateReducer(STATE_ASSEMBLY_INDEX, response)
    })
  }
  return getStateAssemblyActionObject(response)
}

export const handleGetStateAssembly = (response, key = null) => ({
  type: c.HANDLE_GET_STATE_ASSEMBLY,
  data: response.data,
})

export const handleGetStateAssemblyHousing = (response, key = null) => ({
  type: c.HANDLE_GET_STATE_ASSEMBLY_HOUSING,
  data: response.data,
})

export const handleGetStateAssemblyPropertySummary = (response, key = null) => ({
  type: c.HANDLE_GET_STATE_ASSEMBLY_PROPERTY_SUMMARY,
  data: response.data,
  key: key,
})

export const getStateAssemblies = () => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)
  return getStorageDataAction(
    dispatch,
    c.GET_STATE_ASSEMBLIES,
    requestId,
    STATE_ASSEMBLY_INDEX,
    handleGetStateAssemblies
  )
    .then(storageData => {
      // TODO: Temporary - reset the DBs
      if (!storageData) {
        return stateAssembliesAxios(dispatch, getState, access_token, requestId)
      }
    })
    .catch(error => {
      return stateAssembliesAxios(dispatch, getState, access_token, requestId)
    })
}

const stateAssembliesAxios = (dispatch, getState, access_token, requestId) => {
  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    u.STATE_ASSEMBLY_URL,
    null,
    access_token,
    c.GET_STATE_ASSEMBLIES,
    handleGetStateAssemblies
  )
}

export const getStateAssembly = id => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.STATE_ASSEMBLY_URL}${id}/`,
    null,
    access_token,
    c.GET_STATE_ASSEMBLY,
    handleGetStateAssembly
  )
}

export const getStateAssemblyHousing = (id, params) => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.STATE_ASSEMBLY_URL}${id}/housing`,
    params,
    access_token,
    c.GET_STATE_ASSEMBLY_HOUSING,
    handleGetStateAssemblyHousing
  )
}

export const getStateAssemblyPropertySummary = (dataset, id, params, actionKey) => (
  dispatch,
  getState,
  access_token
) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.STATE_ASSEMBLY_URL}${id}${u.PROPERTY_URL}`,
    constructSimplePropertyParams(params),
    access_token,
    actionKey,
    handleGetStateAssemblyPropertySummary
  )
}

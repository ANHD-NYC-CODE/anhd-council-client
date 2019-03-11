import { constructAxiosGet } from 'shared/utilities/Axios'
import * as u from 'shared/constants/urls'
import { COMMUNITY_BOARDS_INDEX, getStorageDataAction, setCommunityBoardsData } from 'shared/utilities/storageUtils'

import * as c from '../constants'
import { constructSimplePropertyParams } from 'shared/utilities/actionUtils'

const getCommunitiesActionObject = response => ({
  type: c.HANDLE_GET_COMMUNITIES,
  data: response.data,
})

export const handleGetCommunities = (response, key = null, setStorage = true) => {
  if (setStorage) {
    setCommunityBoardsData(response.data)
      .then(response => {
        return getCommunitiesActionObject(response)
      })
      .catch(error => {
        return getCommunitiesActionObject(response)
      })
  } else {
    return getCommunitiesActionObject(response)
  }
}

export const handleGetCommunity = (response, key = null) => ({
  type: c.HANDLE_GET_COMMUNITY,
  data: response.data,
})

export const handleGetCommunityHousing = (response, key = null) => ({
  type: c.HANDLE_GET_COMMUNITY_HOUSING,
  data: response.data,
})

export const handleGetCommunityPropertySummary = (response, key = null) => ({
  type: c.HANDLE_GET_COMMUNITY_PROPERTY_SUMMARY,
  data: response.data,
  key: key,
})

export const getCommunities = () => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)
  getStorageDataAction(dispatch, c.GET_COMMUNITIES, requestId, COMMUNITY_BOARDS_INDEX, handleGetCommunities)
    .then(storageData => {
      if (!storageData) {
        return communitiesAxios(dispatch, getState, access_token, requestId)
      }
    })
    .catch(() => {
      return communitiesAxios(dispatch, getState, access_token, requestId)
    })
}

const communitiesAxios = (dispatch, getState, access_token, requestId) => {
  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    u.COMMUNITY_URL,
    null,
    access_token,
    c.GET_COMMUNITIES,
    handleGetCommunities
  )
}

export const getCommunity = id => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.COMMUNITY_URL}${id}/`,
    null,
    access_token,
    c.GET_COMMUNITY,
    handleGetCommunity
  )
}

export const getCommunityHousing = (id, params) => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.COMMUNITY_URL}${id}/housing`,
    params,
    access_token,
    c.GET_COMMUNITY_HOUSING,
    handleGetCommunityHousing
  )
}

export const getCommunityPropertySummary = (dataset, id, params, actionKey) => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)

  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.COMMUNITY_URL}${id}${u.PROPERTY_URL}`,
    constructSimplePropertyParams(params),
    access_token,
    actionKey,
    handleGetCommunityPropertySummary
  )
}

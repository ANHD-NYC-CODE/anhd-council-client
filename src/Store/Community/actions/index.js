import { constructAxiosGet } from 'shared/utilities/Axios'
import * as u from 'shared/constants/urls'

import * as c from '../constants'
import { constructSimplePropertyParams } from 'shared/utilities/actionUtils'

export const handleGetCommunities = (response, key = null) => ({
  type: c.HANDLE_GET_COMMUNITIES,
  data: response.data,
})

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

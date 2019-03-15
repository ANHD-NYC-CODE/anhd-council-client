import * as c from '../constants'
import { push } from 'connected-react-router'
import { getBoundaryPath, addressResultToPath } from 'shared/utilities/routeUtils'
import { constructAxiosGet } from 'shared/utilities/Axios'

import { newLookupRequests } from 'shared/utilities/actionUtils'

export const handleSetBoundaryType = boundaryType => ({
  type: c.SET_BOUNDARY_TYPE,
  data: boundaryType,
})

export const handleSetBoundaryId = boundaryId => ({
  type: c.SET_BOUNDARY_ID,
  data: boundaryId,
})

export const handleSetBoundaryTypeAndId = (boundaryType, boundaryId) => ({
  type: c.SET_BOUNDARY_TYPE_AND_ID,
  boundaryType,
  boundaryId,
})

export const handleSetProperty = propertyId => ({
  type: c.SET_PROPERTY,
  data: propertyId,
})

export const handleSetBuilding = buildingId => ({
  type: c.SET_BUILDING,
  data: buildingId,
})

export const handleSetPropertyAndBuilding = (propertyId, buildingId) => ({
  type: c.SET_PROPERTY_AND_BUILDING,
  propertyId,
  buildingId,
})

export const handleSetPropertyBuildingLookupRequests = (propertyId, buildingId, requests) => ({
  type: c.SET_PROPERTY_BUILDING_LOOKUP_REQUESTS,
  propertyId,
  buildingId,
  requests,
})

export const handleDataRequest = (response, requestConstant = undefined) => ({
  type: c.HANDLE_DATA_REQUEST,
  data: response.data,
})

export const setBoundaryTypeAndIdAndRedirect = (boundaryType, boundaryId) => dispatch => {
  dispatch(handleSetBoundaryTypeAndId(boundaryType, boundaryId))
  const path = getBoundaryPath(boundaryType)
  dispatch(push(`/${path}/${boundaryId}`))
}

export const setLookupAndRequestsAndRedirect = ({ bbl, bin }) => dispatch => {
  const requests = newLookupRequests({ bbl, bin })

  dispatch(handleSetPropertyBuildingLookupRequests(bbl, bin, requests))
  dispatch(push(addressResultToPath({ bbl: bbl, bin: bin })))
}

export const makeDataRequest = dataRequest => (dispatch, getState, access_token) => {
  if (dataRequest.called) return
  dataRequest.called = true
  const requestId = Math.floor(Math.random() * 1000000)
  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    dataRequest.path,
    dataRequest.params,
    access_token,
    dataRequest.requestConstant,
    handleDataRequest
  )
}

import * as c from '../constants'
import { push } from 'connected-react-router'
import { getBoundaryPath, addressResultToPath } from 'shared/utilities/routeUtils'

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

export const handleSetPropertyBuildingLookupRequests = (propertyId, buildingId, lookupFilters) => ({
  type: c.SET_PROPERTY_BUILDING_LOOKUP_REQUESTS,
  propertyId,
  buildingId,
  lookupFilters,
})

export const updateMapFilter = (filter, filterIndex) => ({
  type: c.UPDATE_MAP_FILTER,
  filter,
  filterIndex,
})

export const updateLookupFilter = (filter, filterIndex) => ({
  type: c.UPDATE_LOOKUP_FILTER,
  filter,
  filterIndex,
})

export const setBoundaryTypeAndIdAndRedirect = (boundaryType, boundaryId) => dispatch => {
  dispatch(handleSetBoundaryTypeAndId(boundaryType, boundaryId))
  const path = getBoundaryPath(boundaryType)
  dispatch(push(`/${path}/${boundaryId}`))
}

export const setLookupAndRequestsAndRedirect = ({ propertyId, buildingId }) => dispatch => {
  const lookupFilters = newLookupRequests({ propertyId, buildingId })

  debugger
  dispatch(handleSetPropertyBuildingLookupRequests(propertyId, buildingId, lookupFilters))
  dispatch(push(addressResultToPath({ bbl: propertyId, bin: buildingId })))
}

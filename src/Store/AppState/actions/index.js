import * as c from '../constants'
import { push } from 'connected-react-router'
import { getBoundaryPath } from 'shared/utilities/componentUtils'

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

export const setBoundaryTypeAndIdAndRedirect = (boundaryType, boundaryId) => dispatch => {
  dispatch(handleSetBoundaryTypeAndId(boundaryType, boundaryId))
  const path = getBoundaryPath(boundaryType)
  dispatch(push(`/${path}/${boundaryId}`))
}

export const updateBoundaryFilter = (filter, filterIndex) => ({
  type: c.SET_BOUNDARY_ID,
  filter,
  filterIndex,
})

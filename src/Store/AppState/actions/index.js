import * as c from '../constants'

export const setBoundaryType = boundaryType => ({
  type: c.SET_BOUNDARY_TYPE,
  data: boundaryType,
})

export const setBoundaryId = boundaryId => ({
  type: c.SET_BOUNDARY_ID,
  data: boundaryId,
})

export const setBoundaryTypeAndId = (boundaryType, boundaryId) => ({
  type: c.SET_BOUNDARY_TYPE_AND_ID,
  boundaryType,
  boundaryId,
})

export const updateBoundaryFilter = (filter, filterIndex) => ({
  type: c.SET_BOUNDARY_ID,
  filter,
  filterIndex,
})

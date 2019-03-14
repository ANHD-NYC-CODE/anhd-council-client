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

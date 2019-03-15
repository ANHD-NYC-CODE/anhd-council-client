import * as c from '../constants'
import { push } from 'connected-react-router'
import { getGeographyPath, addressResultToPath } from 'shared/utilities/routeUtils'

import { newLookupRequests } from 'shared/utilities/actionUtils'

export const handleSetGeographyType = geographyType => ({
  type: c.SET_GEOGRAPHY_TYPE,
  data: geographyType,
})

export const handleSetGeographyId = geographyId => ({
  type: c.SET_GEOGRAPHY_ID,
  data: geographyId,
})

export const handleSetGeographyTypeAndId = (geographyType, geographyId) => ({
  type: c.SET_GEOGRAPHY_TYPE_AND_ID,
  geographyType,
  geographyId,
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

export const setGeographyTypeAndIdAndRedirect = (geographyType, geographyId) => dispatch => {
  dispatch(handleSetGeographyTypeAndId(geographyType, geographyId))
  const path = getGeographyPath(geographyType)
  dispatch(push(`/${path}/${geographyId}`))
}

export const setLookupAndRequestsAndRedirect = ({ bbl, bin }) => dispatch => {
  const requests = newLookupRequests({ bbl, bin })

  dispatch(handleSetPropertyBuildingLookupRequests(bbl, bin, requests))
  dispatch(push(addressResultToPath({ bbl: bbl, bin: bin })))
}

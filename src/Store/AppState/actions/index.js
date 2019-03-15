import * as c from '../constants'
import { push, replace } from 'connected-react-router'
import { getGeographyPath, addressResultToPath } from 'shared/utilities/routeUtils'
import { removeManyRequests } from 'Store/Request/actions'
import { newMapRequests, newLookupRequests } from 'shared/utilities/actionUtils'

export const removeRequestType = requestType => ({
  type: c.REMOVE_REQUEST_TYPE,
  requestType,
})

export const handleSetGeographyRequests = (geographyType, geographyId, requests) => ({
  type: c.SET_GEOGRAPHY_REQUESTS,
  geographyType,
  geographyId,
  requests,
})

export const handleSetPropertyBuildingLookupRequests = (bbl, bin, requests) => ({
  type: c.SET_PROPERTY_BUILDING_LOOKUP_REQUESTS,
  bbl,
  bin,
  requests,
})

export const setGeographyAndRequestsAndRedirect = ({
  geographyType,
  geographyId,
  replaceHistory = false,
} = {}) => dispatch => {
  const requests = newMapRequests({ geographyType, geographyId })
  dispatch(removeRequestType('MAP_FILTER'))
  dispatch(removeRequestType('MAP_PROFILE'))
  dispatch(removeManyRequests(requests.map(r => r.requestConstant)))
  dispatch(handleSetGeographyRequests(geographyType, geographyId, requests))

  if (replaceHistory) {
    const path = getGeographyPath(geographyType)
    dispatch(replace(`/${path}/${geographyId}`))
  } else {
    const path = getGeographyPath(geographyType)
    dispatch(push(`/${path}/${geographyId}`))
  }
}

export const setLookupAndRequestsAndRedirect = ({ bbl, bin, replaceHistory = false } = {}) => dispatch => {
  const requests = newLookupRequests({ bbl, bin })
  dispatch(removeRequestType('LOOKUP_FILTER'))
  dispatch(removeRequestType('LOOKUP_PROFILE'))
  dispatch(removeManyRequests(requests.map(r => r.requestConstant)))

  dispatch(handleSetPropertyBuildingLookupRequests(bbl, bin, requests))
  if (replaceHistory) {
    dispatch(replace(addressResultToPath({ bbl: bbl, bin: bin })))
  } else {
    dispatch(push(addressResultToPath({ bbl: bbl, bin: bin })))
  }
}

import * as c from '../constants'
import { push, replace } from 'connected-react-router'
import { getGeographyPath, addressResultToPath } from 'shared/utilities/routeUtils'
import { removeRequest, removeManyRequests } from 'Store/Request/actions'
import { newMapRequests, newLookupRequests, newAdvancedSearchRequest } from 'shared/utilities/actionUtils'

export const removeRequestType = requestType => ({
  type: c.REMOVE_REQUEST_TYPE,
  requestType,
})

export const setMapFilterDate = date => ({
  type: c.SET_MAP_FILTER_DATE,
  date,
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

export const handleSetAdvancedSearchRequest = advancedSearchRequest => ({
  type: c.SET_ADVANCED_SEARCH_REQUEST,
  advancedSearchRequest,
})

export const setGeographyAndRequestsAndRedirect = ({
  geographyType,
  geographyId,
  redirect = true,
  replaceHistory = false,
} = {}) => dispatch => {
  const requests = newMapRequests({ geographyType, geographyId })
  dispatch(removeRequestType('MAP_FILTER'))
  dispatch(removeRequestType('MAP_PROFILE'))
  dispatch(removeRequestType('GEOGRAPHY_HOUSING_TYPE'))
  dispatch(removeRequestType('ADVANCED_SEARCH'))
  dispatch(removeManyRequests(requests.map(r => r.requestConstant)))
  dispatch(handleSetGeographyRequests(geographyType, geographyId, requests))

  if (redirect) {
    const path = getGeographyPath(geographyType)
    if (replaceHistory) {
      dispatch(replace(`/${path}/${geographyId}`))
    } else {
      dispatch(push(`/${path}/${geographyId}`))
    }
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

export const setAdvancedSearchRequestAndRedirect = ({ redirect, replaceHistory } = {}) => (dispatch, getState) => {
  const appState = getState().appState
  const advancedSearchRequest = newAdvancedSearchRequest({
    geographyType: appState.currentGeographyType,
    geographyId: appState.currentGeographyId,
    advancedSearch: getState().advancedSearch,
  })
  dispatch(removeRequestType('ADVANCED_SEARCH'))
  dispatch(removeRequest(advancedSearchRequest.requestConstant))
  dispatch(handleSetAdvancedSearchRequest(advancedSearchRequest))

  if (redirect) {
    const path = getGeographyPath(appState.currentGeographyType)
    if (replaceHistory) {
      dispatch(replace(`/${path}/${appState.currentGeographyId}`))
    } else {
      dispatch(push(`/${path}/${appState.currentGeographyId}`))
    }
  }
}

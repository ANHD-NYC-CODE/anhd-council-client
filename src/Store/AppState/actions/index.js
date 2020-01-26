import * as c from 'shared/constants'
import { push, replace } from 'connected-react-router'
import { getGeographyPath, addressResultToPath } from 'shared/utilities/routeUtils'
import { removeRequest, removeManyRequests } from 'Store/Request/actions'
import { handleCompletedRequest } from 'Store/Loading/actions'
import { handleClearErrors } from 'Store/Error/actions'
export const setAppState = state => ({
  type: c.SET_APP_STATE,
  state,
})

export const toggleSelectedRequest = request => ({
  type: c.TOGGLE_SELECTED_REQUEST,
  toggledRequest: request,
})

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

export const handleSetAdvancedSearchRequest = advancedSearchRequest => ({
  type: c.SET_ADVANCED_SEARCH_REQUEST,
  advancedSearchRequest,
})

export const setGeographyAndRequestsAndRedirect = ({
  geographyType,
  geographyId,
  requests,
  redirect = true,
  replaceHistory = false,
} = {}) => dispatch => {
  dispatch(removeRequestType('MAP_FILTER'))
  dispatch(removeRequestType('MAP_PROFILE'))
  dispatch(removeRequestType('GEOGRAPHY_HOUSING_TYPE'))
  dispatch(removeRequestType(c.GET_ADVANCED_SEARCH))
  dispatch(removeManyRequests(requests.map(r => r.requestConstant)))
  dispatch(setAppState({ selectedRequests: [] }))
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

export const setLookupAndRequestsAndRedirect = ({ bbl, bin, replaceHistory = false, requests } = {}) => (
  dispatch,
  getState
) => {
  const currentProperty = getState().appState.currentProperty
  const currentBuilding = getState().appState.currentBuilding
  if (currentProperty === bbl && currentBuilding === bin) {
    return dispatch(replace(addressResultToPath({ bbl, bin })))
  }

  dispatch(removeRequestType('LOOKUP_FILTER'))
  dispatch(removeRequestType('LOOKUP_PROFILE'))
  dispatch(removeManyRequests(requests.map(r => r.requestConstant)))

  dispatch(handleSetPropertyBuildingLookupRequests(bbl, bin, requests))
  if (replaceHistory) {
    dispatch(replace(addressResultToPath({ bbl, bin })))
  } else {
    dispatch(push(addressResultToPath({ bbl, bin })))
  }
}

export const setAdvancedSearchRequest = ({ advancedSearchRequest } = {}) => (dispatch, getState) => {
  dispatch(removeRequestType(c.ADVANCED_SEARCH))
  dispatch(removeRequest(advancedSearchRequest.requestConstant))
  dispatch(handleSetAdvancedSearchRequest(advancedSearchRequest))
}

export const clearAdvancedSearchRequest = () => dispatch => {
  dispatch(removeRequestType(c.ADVANCED_SEARCH))
  dispatch(removeRequest(c.ADVANCED_SEARCH))
  dispatch(handleCompletedRequest(c.ADVANCED_SEARCH))
  dispatch(handleClearErrors(c.ADVANCED_SEARCH))
}

import Axios from 'axios'
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

export const handleSetAdvancedSearchRequest = (advancedSearchRequest, advancedSearch, geographyType, geographyId) => ({
  type: c.SET_ADVANCED_SEARCH_REQUEST,
  advancedSearchRequest,
  advancedSearch,
  geographyType,
  geographyId
})

export const handleSetWowPropertyData = data => ({
  type: c.SET_WOW_PROPERTY_DATA,
  data,
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
      dispatch(replace(`/district-dashboard/${path}/${geographyId}`))
    } else {
      dispatch(push(`/district-dashboard/${path}/${geographyId}`))
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
  dispatch(getWowPropertyData(bbl))
  dispatch(handleSetPropertyBuildingLookupRequests(bbl, bin, requests))
  if (replaceHistory) {
    dispatch(replace(addressResultToPath({ bbl, bin })))
  } else {
    dispatch(push(addressResultToPath({ bbl, bin })))
  }
}

export const setAdvancedSearchRequest = ({ advancedSearchRequest, geographyType, geographyId, advancedSearch } = {}) => dispatch => {
  dispatch(removeRequestType(c.ADVANCED_SEARCH))
  dispatch(removeRequest(advancedSearchRequest.requestConstant))
  dispatch(handleSetAdvancedSearchRequest(advancedSearchRequest, advancedSearch, geographyType, geographyId))
}

export const clearAdvancedSearchRequest = () => dispatch => {
  dispatch(removeRequestType(c.ADVANCED_SEARCH))
  dispatch(removeRequest(c.ADVANCED_SEARCH))
  dispatch(handleCompletedRequest(c.ADVANCED_SEARCH))
  dispatch(handleClearErrors(c.ADVANCED_SEARCH))
}

export const getWowPropertyData = bbl => dispatch => {
  Axios.get('https://wow-django.herokuapp.com/api/address/dap-portfoliosize?', { params: { bbl } })
    .then(response => {
      const data = response.data.result
      dispatch(handleSetWowPropertyData(data))
    })
    .catch(error => {
      console.error(error)
      // silently fail and return blank data
      dispatch(handleSetWowPropertyData({}))
    })
}

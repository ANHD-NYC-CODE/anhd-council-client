import * as c from '../constants'
import { push, replace } from 'connected-react-router'
import { getGeographyPath, addressResultToPath } from 'shared/utilities/routeUtils'
import { removeRequest, removeManyRequests } from 'Store/Request/actions'

export const setAppState = state => ({
  type: c.SET_APP_STATE,
  state,
})

export const loadResultFilters = resultFilters => ({
  type: c.LOAD_RESULT_FILTERS,
  resultFilters,
})

export const toggleSelectedRequest = request => ({
  type: c.TOGGLE_SELECTED_REQUEST,
  toggledRequest: request,
})

export const toggleSelectedAmountFilter = amountFilter => ({
  type: c.TOGGLE_SELECTED_AMOUNT_FILTER,
  toggledFilter: amountFilter,
})

export const updateAmountFilter = amountFilter => ({
  type: c.UPDATE_AMOUNT_FILTER,
  amountFilter,
})

export const setDefaultSelections = model => ({
  type: c.SET_DEFAULT_SELECTED_REQUEST,
  model,
})

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
  requests,
  redirect = true,
  replaceHistory = false,
} = {}) => dispatch => {
  dispatch(removeRequestType('MAP_FILTER'))
  dispatch(removeRequestType('MAP_PROFILE'))
  dispatch(removeRequestType('GEOGRAPHY_HOUSING_TYPE'))
  dispatch(removeRequestType('ADVANCED_SEARCH'))
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

export const setAdvancedSearchRequestAndRedirect = ({
  redirect = true,
  replaceHistory = false,
  advancedSearchRequest,
} = {}) => (dispatch, getState) => {
  const appState = getState().appState

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

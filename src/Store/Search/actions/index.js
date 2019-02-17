import { Axios } from 'shared/utilities/Axios'
import { SEARCH_URL } from 'shared/constants/urls'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'

export const HANDLE_READ_SEARCH_RESPONSE = 'HANDLE_READ_SEARCH_RESPONSE'
export const HANDLE_ERROR_RESPONSE = 'HANDLE_ERROR_RESPONSE'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'
export const SET_SEARCH_TIMEOUT = 'SET_SEARCH_TIMEOUT'
import { GET_BUILDING_SEARCH } from 'shared/constants/actions'

export const handleReadSearchResponse = response => {
  let results = response.data
  if (!results.length) {
    results = [{ bin: undefined, housenumber: '', street: 'No results', borough: '' }]
  }

  return {
    type: HANDLE_READ_SEARCH_RESPONSE,
    data: results,
  }
}
export const clearSearch = () => {
  return {
    type: CLEAR_SEARCH,
  }
}

export const setSearchTimeout = event => {
  return {
    type: SET_SEARCH_TIMEOUT,
    data: event,
  }
}

export const queryBuildingAddress = data => dispatch => {
  dispatch(loadingActions.handleRequest(GET_BUILDING_SEARCH))
  return Axios.get(SEARCH_URL, { params: { fts: data, format: 'json' } })
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(GET_BUILDING_SEARCH))
      dispatch(handleReadSearchResponse(response))
    })
    .catch(error => {
      dispatch(loadingActions.handleCompletedRequest(GET_BUILDING_SEARCH))
      dispatch(errorActions.handleFailure(GET_BUILDING_SEARCH, error.response))
    })
}

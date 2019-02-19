import { Axios } from 'shared/utilities/Axios'
import { SEARCH_URL } from 'shared/constants/urls'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'

import { GET_BUILDING_SEARCH } from 'shared/constants/actions'
export const HANDLE_READ_SEARCH_RESPONSE = 'HANDLE_READ_SEARCH_RESPONSE'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'
export const SET_SEARCH_TIMEOUT = 'SET_SEARCH_TIMEOUT'
import { handleCatchError } from 'shared/utilities/actionUtils'

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
export const clearSearch = () => ({
  type: CLEAR_SEARCH,
})

export const setSearchTimeout = event => ({
  type: SET_SEARCH_TIMEOUT,
  data: event,
})

export const queryBuildingAddress = value => (dispatch, access_token) => {
  dispatch(loadingActions.handleRequest(GET_BUILDING_SEARCH))
  dispatch(errorActions.handleClearErrors(GET_BUILDING_SEARCH))
  return Axios.get(SEARCH_URL, {
    params: { fts: value, format: 'json' },
    headers: { authorization: `Bearer ${access_token}` },
  })
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(GET_BUILDING_SEARCH))
      dispatch(handleReadSearchResponse(response))
    })
    .catch(error => {
      handleCatchError(error, GET_BUILDING_SEARCH, dispatch)
    })
}

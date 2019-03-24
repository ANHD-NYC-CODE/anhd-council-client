import { constructAxiosGet } from 'shared/utilities/Axios'
import { SEARCH_URL } from 'shared/constants/urls'
import { GET_BUILDING_SEARCH } from 'shared/constants/actions'
export const HANDLE_READ_SEARCH_RESPONSE = 'HANDLE_READ_SEARCH_RESPONSE'
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'
export const SET_SEARCH_TIMEOUT = 'SET_SEARCH_TIMEOUT'
import { AddressResult } from 'shared/classes/AddressResult'
export const handleReadSearchResponse = (response, key = null) => {
  let results = response.data.map(result => new AddressResult({ addressObject: result }))
  if (!results.length) {
    results = [new AddressResult()]
  }
  return {
    type: HANDLE_READ_SEARCH_RESPONSE,
    data: results,
  }
}

export const setSearchValue = value => ({
  type: SET_SEARCH_VALUE,
  data: value,
})

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
})

export const setSearchTimeout = event => ({
  type: SET_SEARCH_TIMEOUT,
  data: event,
})

export const queryAddress = value => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)
  dispatch(setSearchValue(value))
  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    SEARCH_URL,
    { fts: value },
    access_token,
    GET_BUILDING_SEARCH,
    handleReadSearchResponse
  )
}

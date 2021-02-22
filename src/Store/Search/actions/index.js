import { constructAxiosGet } from 'shared/utilities/Axios'
import { SEARCH_URL } from 'shared/constants/urls'
import { GET_BUILDING_SEARCH } from 'shared/constants/actions'

import * as c from '../constants'
import AddressResult from 'shared/classes/AddressResult'
export const handleReadSearchResponse = resp => {
  const { data } = resp
  let results = data.features.map(f => new AddressResult({ addressObject: f.properties }))
  if (!results.length) {
    results = [new AddressResult()]
  }
  return {
    type: c.HANDLE_READ_SEARCH_RESPONSE,
    data: results,
  }
}

export const setSearchValue = value => ({
  type: c.SET_SEARCH_VALUE,
  data: value,
})

export const clearSearch = () => ({
  type: c.CLEAR_SEARCH,
})

export const setSearchTimeout = event => ({
  type: c.SET_SEARCH_TIMEOUT,
  data: event,
})

export const queryAddress = value => async (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)
  dispatch(setSearchValue(value))
  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `https://geosearch.planninglabs.nyc/v1/search?text=${value}`,
    {},
    access_token,
    GET_BUILDING_SEARCH,
    handleReadSearchResponse
  )
}

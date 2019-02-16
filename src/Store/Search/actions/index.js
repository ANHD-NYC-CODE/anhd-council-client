import { Axios } from 'shared/utilities/Axios'
import { SEARCH_URL } from 'shared/constants/apiUrls'

export const AWAITING_SEARCH_RESPONSE = 'AWAITING_SEARCH_RESPONSE'
export const HANDLE_READ_SEARCH_RESPONSE = 'HANDLE_READ_SEARCH_RESPONSE'
export const HANDLE_ERROR_RESPONSE = 'HANDLE_ERROR_RESPONSE'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'
export const SET_SEARCH_TIMEOUT = 'SET_SEARCH_TIMEOUT'

export const awaitingSearchResponse = () => ({
  type: AWAITING_SEARCH_RESPONSE,
})

export const handleErrorResponse = response => ({
  type: HANDLE_ERROR_RESPONSE,
  data: { status: response.status, message: (response.data || {}).results || response },
})

export const handleReadSearchResponse = response => ({
  type: HANDLE_READ_SEARCH_RESPONSE,
  data: response.data,
})
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
  dispatch(awaitingSearchResponse())
  return Axios.get(SEARCH_URL, { params: { fts: data, format: 'json' } })
    .then(response => {
      console.log(response)
      dispatch(handleReadSearchResponse(response))
    })
    .catch(error => {
      if ((error.response || {}).status === 500) {
        dispatch(handleErrorResponse(error.response))
      } else {
        dispatch(handleErrorResponse(error.response || error))
      }
    })
}

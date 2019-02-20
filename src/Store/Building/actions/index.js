import { Axios } from 'shared/utilities/Axios'
import { BUILDING_URL } from 'shared/constants/urls'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'

import { GET_BUILDING, HANDLE_GET_BUILDING } from '../constants'
import { handleCatchError } from 'shared/utilities/actionUtils'

export const handleGetBuilding = response => ({
  type: HANDLE_GET_BUILDING,
  data: response.data,
})

export const getBuilding = id => (dispatch, access_token) => {
  dispatch(loadingActions.handleRequest(GET_BUILDING))
  dispatch(errorActions.handleClearErrors(GET_BUILDING))
  return Axios.get(`${BUILDING_URL}${id}`, {
    params: { format: 'json' },
    headers: { authorization: `Bearer ${access_token}` },
  })
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(GET_BUILDING))
      dispatch(handleGetBuilding(response))
    })
    .catch(error => {
      handleCatchError(error, GET_BUILDING, dispatch)
    })
}

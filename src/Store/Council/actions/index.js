import { Axios } from 'shared/utilities/Axios'
import * as u from 'shared/constants/urls'
import * as loadingActions from 'Store/Loading/actions'
import * as errorActions from 'Store/Error/actions'

import * as c from '../constants'
import { handleCatchError } from 'shared/utilities/actionUtils'

export const handleGetCouncils = response => ({
  type: c.HANDLE_GET_COUNCILS,
  data: response.data,
})

export const getCouncils = () => (dispatch, access_token) => {
  dispatch(loadingActions.handleRequest(c.GET_COUNCILS))
  dispatch(errorActions.handleClearErrors(c.GET_COUNCILS))
  return Axios.get(u.COUNCILS_URL, {
    params: { format: 'json' },
    headers: typeof access_token === 'string' ? { authorization: `Bearer ${access_token}` } : null,
  })
    .then(response => {
      dispatch(loadingActions.handleCompletedRequest(c.GET_COUNCILS))
      dispatch(handleGetCouncils(response))
    })
    .catch(error => {
      handleCatchError(error, c.GET_COUNCILS, dispatch)
    })
}

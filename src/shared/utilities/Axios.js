import axios from 'axios'
import { handleCatchError, handleActionDispatch } from 'shared/utilities/actionUtils'
import { handleCompletedRequest } from 'Store/Loading/actions'

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  headers: { 'Content-type': 'application/json' },
})

export const constructAxiosGet = (url, params, access_token, dispatch, constant, handleAction) => {
  handleActionDispatch(dispatch, constant)

  return Axios.get(url, {
    params: { format: 'json', ...params },
    headers: typeof access_token === 'string' ? { authorization: `Bearer ${access_token}` } : null,
  })
    .then(response => {
      dispatch(handleCompletedRequest(constant))
      dispatch(handleAction(response, constant))
    })
    .catch(error => {
      handleCatchError(error, constant, dispatch)
    })
}

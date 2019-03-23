import axios from 'axios'
import { handleCatchError, handleActionDispatch } from 'shared/utilities/actionUtils'
import { handleCompletedRequest } from 'Store/Loading/actions'
import FileDownload from 'js-file-download'

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 240000,
  headers: { 'Content-type': 'application/json' },
})

export const constructAxiosGet = (dispatch, getState, requestId, url, params, access_token, constant, handleAction) => {
  if (!requestId) throw 'Misconfigured Axios Request (missing id)'
  handleActionDispatch(dispatch, constant, requestId)
  return Axios.get(url, {
    params: { format: 'json', ...params },
    headers: typeof access_token === 'string' ? { authorization: `Bearer ${access_token}` } : null,
  })
    .then(response => {
      const requestIsValid = !!getState().loading.requests.filter(request => request.id === requestId).length
      if (requestIsValid) {
        if (handleAction) {
          dispatch(handleAction(response, constant))
        }
        dispatch(handleCompletedRequest(constant, requestId))

        if (response.headers && response.headers['content-type'].match(/csv/)) {
          FileDownload(response.data, response.config.params.filename)
        }
      }
    })
    .catch(error => {
      handleCatchError(error, constant, dispatch, requestId)
    })
}

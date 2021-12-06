import axios from 'axios'
import { handleCatchError, handleActionDispatch } from 'shared/utilities/actionUtils'
import { handleCompletedRequest } from 'Store/Loading/actions'
import FileDownload from 'js-file-download'

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 120000, // 2 min
  headers: { 'Content-type': 'application/json' },
})

export const constructAxiosGet = (dispatch, getState, requestId, url, params, access_token, constant, dispatchAction, handleAction) => {
  if (!requestId) throw 'Misconfigured Axios Request (missing id)'
  handleActionDispatch(dispatch, constant, requestId)

  const isExternal = url.indexOf('https') !== -1
  let opts = {
    params: { format: 'json', ...params },
    headers: typeof access_token === 'string' ? { authorization: `Bearer ${access_token}` } : null,
  }
  if (isExternal) {
    opts = {}
  }

  return Axios.get(url, opts)
    .then(response => {
      const requestIsValid = !!getState().loading.requests.filter(request => request.id === requestId).length
      if (requestIsValid) {
        if (dispatchAction) {
          dispatch(dispatchAction(response, constant, dispatch))
        }

        if (handleAction) {
          handleAction()
        }
        dispatch(handleCompletedRequest(constant, requestId))

        if (constant.includes('_CSV')) {
          FileDownload(response.data, response.config.params.filename)
        }
      }
    })
    .catch(error => {
      handleCatchError(error, constant, dispatch, requestId)
    })
}

export const constructAxiosPost = (
  dispatch,
  getState,
  requestId,
  url,
  body,
  params,
  access_token,
  constant,
  dispatchAction,
  handleAction
) => {
  if (!requestId) throw 'Misconfigured Axios Request (missing id)'
  handleActionDispatch(dispatch, constant, requestId)
  return Axios.post(url, body, {
    params: { format: 'json', ...params },
    headers: typeof access_token === 'string' ? { authorization: `Bearer ${access_token}` } : null,
  })
    .then(response => {
      const requestIsValid = !!getState().loading.requests.filter(request => request.id === requestId).length
      if (requestIsValid) {
        if (dispatchAction) {
          dispatch(dispatchAction(response, constant))
        }

        if (handleAction) {
          handleAction()
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

export const constructAxiosDelete = (
  dispatch,
  getState,
  requestId,
  url,
  body,
  params,
  access_token,
  constant,
  dispatchAction,
  handleAction
) => {
  if (!requestId) throw 'Misconfigured Axios Request (missing id)'
  handleActionDispatch(dispatch, constant, requestId)
  return Axios.delete(url,
  {
    params: { format: 'json', ...params },
    data: body,
    headers: typeof access_token === 'string' ? { authorization: `Bearer ${access_token}` } : null,
  })
    .then(response => {
      const requestIsValid = !!getState().loading.requests.filter(request => request.id === requestId).length
      if (requestIsValid) {
        if (dispatchAction) {
          dispatch(dispatchAction(response, constant))
        }

        if (handleAction) {
          handleAction()
        }
        dispatch(handleCompletedRequest(constant, requestId))
      }
    })
    .catch(error => {
      handleCatchError(error, constant, dispatch, requestId)
    })
}

export const constructAxiosPatch = (
  dispatch,
  getState,
  requestId,
  url,
  body,
  params,
  access_token,
  constant,
  dispatchAction,
  handleAction
) => {
  if (!requestId) throw 'Misconfigured Axios Request (missing id)'
  handleActionDispatch(dispatch, constant, requestId)
  return Axios.patch(url, body, {
    params: { format: 'json', ...params },
    headers: typeof access_token === 'string' ? { authorization: `Bearer ${access_token}` } : null,
  })
    .then(response => {
      const requestIsValid = !!getState().loading.requests.filter(request => request.id === requestId).length
      if (requestIsValid) {
        if (dispatchAction) {
          dispatch(dispatchAction(response, constant))
        }

        if (handleAction) {
          handleAction()
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
import { getApiMap } from 'shared/utilities/classUtils'

export class DataRequest {
  constructor({ results = [], paramMaps = [], apiMaps = [] } = {}) {
    this._results = results
    this._paramMaps = paramMaps
    this._apiMaps = apiMaps
  }

  get results() {
    return this._results
  }

  set results(results) {
    this._results = results
  }

  get paramMaps() {
    return this._paramMaps
  }

  set paramMaps(paramMaps) {
    this._paramMaps = paramMaps
  }

  get resourceId() {
    return this._resourceId
  }

  set resourceId(resourceId) {
    this._resourceId = resourceId
  }

  get apiMaps() {
    return this._apiMaps
  }

  set apiMaps(apiMaps) {
    this._apiMaps = apiMaps
  }

  get path() {
    return `${this.apiMaps
      .map(apiMap => apiMap.url)
      .join('')
      .replace('//', '/')}`
  }

  get params() {
    return {
      ...Object.assign(
        {},
        ...this.paramMaps.map(paramMap => {
          return paramMap.toParamObject()
        })
      ),
    }
  }

  get requestConstant() {
    return this.apiMaps.map(apiMap => apiMap.constant).join('_')
  }
}

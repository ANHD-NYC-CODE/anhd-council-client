export class DataRequest {
  constructor({ type = undefined, paramMaps = [], apiMaps = [], tableConfig = undefined } = {}) {
    this._type = type
    this._paramMaps = paramMaps
    this._apiMaps = apiMaps
    this._tableConfig = tableConfig
    this._called = false
  }

  get type() {
    return this._type
  }

  set type(type) {
    this._type = type
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

  get tableConfig() {
    return this._tableConfig
  }

  set tableConfig(tableConfig) {
    this._tableConfig = tableConfig
  }

  get called() {
    return this._called
  }

  set called(called) {
    this._called = called
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
    return []
      .concat(
        this.apiMaps.map(apiMap => apiMap.constant).join('_'),
        this.paramMaps.map(paramMap => paramMap.field.toUpperCase()).join('_')
      )
      .filter(a => a)
      .join('_')
  }
}

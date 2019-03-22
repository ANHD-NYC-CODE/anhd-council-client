import { constantToName } from 'shared/utilities/filterUtils'
import { stringifyParamsObject } from 'shared/utilities/routeUtils'
export class DataRequest {
  constructor({
    type = undefined,
    requestConstant = undefined,
    paramMaps = [],
    apiMaps = [],
    tableConfig = undefined,
  } = {}) {
    this._type = type
    this._requestConstant = requestConstant
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
      .replace(/\/\//g, '/')}`
  }

  get csv_filename() {
    if (this.type === 'ADVANCED_SEARCH') {
      return `dapportal-${this.path}-custom-search.csv`
        .replace(/\//g, '-')
        .replace(/--/g, '-')
        .replace('-.csv', '.csv')
    } else {
      return `dapportal-${this.path}${stringifyParamsObject(this.params)}.csv`
        .replace(/\//g, '-')
        .replace(/--/g, '-')
        .replace('-.csv', '.csv')
    }
  }

  get csv_params() {
    return {
      ...Object.assign(
        {},
        ...this.paramMaps.map(paramMap => {
          return paramMap.toParamObject()
        })
      ),
      format: 'csv',
      filename: this.csv_filename,
    }
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
    return (
      this._requestConstant ||
      []
        .concat(
          this.apiMaps.map(apiMap => apiMap.constant).join('_'),
          this.paramMaps.map(paramMap => paramMap.field.toUpperCase()).join('_')
        )
        .filter(a => a)
        .join('_')
    )
  }

  set requestConstant(requestConstant) {
    this._requestConstant = requestConstant
  }

  get label() {
    const amountPm = this._paramMaps.find(pm => pm.type === 'AMOUNT')
    return `${this._apiMaps[this._apiMaps.length - 1].name}${
      amountPm ? ` with ${amountPm.summaryString} ${constantToName({ constant: amountPm.resourceConstant })}` : ''
    }`
  }
}

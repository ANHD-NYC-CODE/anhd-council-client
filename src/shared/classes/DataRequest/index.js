import { grammaticalNoun } from 'shared/utilities/languageUtils'

import { stringifyParamsObject } from 'shared/utilities/routeUtils'
export default class DataRequest {
  constructor({
    type = undefined,
    requestConstant = undefined,
    resourceModel = undefined,
    paramMaps = [],
    apiMaps = [],
    tableConfig = undefined,
    isAuthenticated = false,
    level = undefined,
  } = {}) {
    this._type = type
    this._resourceModel = resourceModel
    this._requestConstant = requestConstant
    this._paramMaps = paramMaps
    this._apiMaps = apiMaps
    this._tableConfig = tableConfig
    this._called = false
    this._isAuthenticated = isAuthenticated
    this._level = level
  }

  get type() {
    return this._type
  }

  set type(type) {
    this._type = type
  }

  get resourceModel() {
    return this._resourceModel
  }

  set resourceModel(resourceModel) {
    this._resourceModel = resourceModel
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

  get isAuthenticated() {
    return this._isAuthenticated
  }

  get level() {
    return this._level
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
    if (this.type === 'ADVANCED_SEARCH') return this.type
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

  get csvRequestConstant() {
    return `${this.requestConstant}_CSV`
  }

  get summaryCardLabel() {
    if (this.type === 'ADVANCED_SEARCH') return 'Custom Search'
    const amountPm = this._paramMaps.find(pm => pm.type === 'AMOUNT')

    return `${amountPm ? `${amountPm.summaryString}` : ''}`
  }
}

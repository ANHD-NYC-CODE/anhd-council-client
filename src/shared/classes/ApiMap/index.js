import { constantToQueryName, constantToName, constantToModelName } from 'shared/utilities/filterUtils'

export default class ApiMap {
  constructor({ constant = '', name = '', queryName = '', url = '', model = '', resourceId = undefined } = {}) {
    this._constant = constant
    this._name = name
    this._queryName = queryName
    this._url = url
    this._model = model
    this._resourceId = resourceId
  }

  get constant() {
    return this._constant
  }

  set constant(constant) {
    this._constant = constant
  }

  get name() {
    return this._name || constantToName({ constant: this._constant })
  }

  get queryName() {
    return this._queryName.toLowerCase() || constantToQueryName(this._constant).toLowerCase()
  }

  get resourceId() {
    return this._resourceId
  }

  set resourceId(resourceId) {
    this._resourceId = resourceId
  }

  get url() {
    return this._url || `/${this.queryName}/${this.resourceId ? this.resourceId + '/' : ''}`
  }

  get model() {
    return this._model.toLowerCase() || constantToModelName(this._constant).toLowerCase()
  }
}

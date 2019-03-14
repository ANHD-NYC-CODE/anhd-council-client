import { constantToQueryName, constantToName, constantToModelName } from 'shared/utilities/filterUtils'

export class ApiMap {
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
    return this._queryName || constantToQueryName(this._constant)
  }

  get resourceId() {
    return this._resourceId
  }

  set resourceId(resourceId) {
    this._resourceId = resourceId
  }

  get url() {
    return (
      this._url ||
      `/${constantToQueryName(this.constant).toLowerCase()}/${this.resourceId ? this.resourceId + '/' : ''}`
    )
  }

  get model() {
    return this._model || constantToModelName(this._constant)
  }
}

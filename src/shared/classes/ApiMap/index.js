import { constantToQueryName, constantToName } from 'shared/utilities/filterUtils'

export class ApiMap {
  constructor({ constant = '', name = '', queryName = '', url = '', model = '' } = {}) {
    this._constant = constant
    this._name = name
    this._queryName = queryName
    this._url = url
    this._model = model
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

  get url() {
    return this._url || `/${this._constant.replace('_', '').toLowerCase()}s/`
  }

  get model() {
    return this._model || this._constant.replace('_', '').toLowerCase()
  }
}

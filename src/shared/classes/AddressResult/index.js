export class AddressResult {
  constructor({ addressObject = undefined } = {}) {
    if (!addressObject) {
      addressObject = { bin: undefined, housenumber: '', street: 'No results', borough: '' }
    }

    this._addressObject = addressObject
    Object.keys(addressObject).forEach(key => {
      this[key] = addressObject[key]
    })
  }

  get addressObject() {
    return this._addressObject
  }

  set addressObject(addressObject) {
    this._addressObject = addressObject
  }
}

export class ParameterMapping {
  constructor({ field = '', comparison = '', value = '' } = {}) {
    this._field = field
    this._comparison = comparison
    this._value = value
  }

  get field() {
    return this._field
  }

  get comparison() {
    return this._comparison
  }

  get value() {
    return this._value
  }

  get filter() {
    return this._filter
  }

  set comparison(value) {
    this._comparison = value
  }

  set value(value) {
    this._value = value
  }

  updateParameterMapValue(inputObject) {
    this[inputObject['name']] = inputObject['value']
  }
}

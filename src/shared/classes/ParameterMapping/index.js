export class ParameterMapping {
  constructor(field, comparison, value, filter) {
    this._field = field
    this._comparison = comparison
    this._value = value
    this._filter = filter
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

  set field(value) {
    this._field = value
  }

  set comparison(value) {
    this._comparison = value
  }

  set value(value) {
    this._value = value
  }

  set newLabel(value) {
    this._newLabel = value
  }
}

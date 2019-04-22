export default class ResultAmountFilter {
  constructor({ resourceModel = undefined, category = 'AMOUNT', field = '', comparison = 'gte', value = 5 } = {}) {
    this._resourceModel = resourceModel
    this._category = category
    this._field = field
    this._comparison = comparison
    this._value = value
  }

  get resourceModel() {
    return this._resourceModel
  }

  set resourceModel(resourceModel) {
    this._resourceModel = resourceModel
  }

  get category() {
    return this._category
  }

  set category(category) {
    this._category = category
  }

  get field() {
    return this._field
  }

  set field(field) {
    this._field = field
  }

  get comparison() {
    return this._comparison
  }

  set comparison(comparison) {
    this._comparison = comparison
  }

  get value() {
    return this._value
  }

  set value(value) {
    this._value = value
  }

  evaluate(result) {
    switch (this.comparison) {
      case 'gte':
        return result[this.field] >= this.value
      case 'gt':
        return result[this.field] > this.value
      case 'lte':
        return result[this.field] <= this.value
      case 'lt':
        return result[this.field] < this.value
      case 'bool':
        return Array.isArray(result[this.field])
          ? !!result[this.field].length === this.value
          : !!result[this.field] == this.value
      default:
        return result[this.field] == this.value
    }
  }
}

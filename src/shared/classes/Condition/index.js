export class Condition {
  constructor({ key = undefined, type = undefined, filters = [] } = {}) {
    this._key = key
    this._type = type
    this._filters = filters
  }

  get key() {
    return this._key
  }

  get type() {
    return this._type
  }

  get filters() {
    return this._filters
  }

  set filters(filters) {
    this._filters = filters
  }

  addFilter({ filter }) {
    this._filters = [...this._filters, filter]
  }

  removeFilter({ filterId }) {
    this._filters = [...this._filters.slice(0, filterId), this._filters.slice(filterId + 1)]
  }
}

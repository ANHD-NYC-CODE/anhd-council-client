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

  hasCondition() {
    return this._filters.some(filter => filter.conditionGroup)
  }

  addFilter({ filter }) {
    // Adds condition groups to the end
    if (filter.conditionGroup) {
      this._filters = [...this._filters, filter]
    } else {
      let conditionGroups = this.filters.filter(f => f.conditionGroup)
      this.filters = this.filters.filter(f => !f.conditionGroup)
      this._filters = [...this._filters, filter]
      this.filters = this.filters.concat(conditionGroups)
    }
  }

  removeFilter({ filterIndex }) {
    this._filters = this._filters.filter((f, index) => index !== filterIndex)
  }
}

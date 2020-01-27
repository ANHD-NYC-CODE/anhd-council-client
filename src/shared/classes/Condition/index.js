import ParamError from 'shared/classes/ParamError'

export default class Condition {
  constructor({ key = undefined, type = undefined, filters = [], errors = [] } = {}) {
    this._key = key
    this._type = type
    this._filters = filters
    this._errors = errors
  }

  keys() {
    return {
      key: this._key,
      type: this._type,
      filters: [],
      errors: this._errors,
    }
  }

  clone() {
    const newSelf = new Condition({ ...this.keys() })
    this.filters.forEach(filter => newSelf.addFilter({ filter: filter.clone() }))
    return newSelf
  }

  get key() {
    return this._key
  }

  get type() {
    return this._type
  }

  set type(type) {
    if (type !== 'AND' && type !== 'OR') throw 'Please pass type AND or OR'
    this._type = type
  }

  get filters() {
    return this._filters
  }

  set filters(filters) {
    this._filters = filters
  }

  toggleType() {
    if (this.isAnd()) {
      this.type = 'OR'
    } else if (this.isOr()) {
      this.type = 'AND'
    }
  }

  isAnd() {
    return this._type.toUpperCase() === 'AND'
  }

  isOr() {
    return this._type.toUpperCase() === 'OR'
  }

  hasCondition() {
    return this._filters.some(filter => filter.conditionGroup)
  }

  addFilter({ dispatchAction, filter } = {}) {
    // Adds condition groups to the end
    if (filter.conditionGroup) {
      this._filters = [...this._filters, filter]
    } else {
      let conditionGroups = this.filters.filter(f => f.conditionGroup)
      this._filters = this.filters.filter(f => !f.conditionGroup)
      this._filters = [...this._filters, filter]
      this._filters = this.filters.concat(conditionGroups)
    }

    if (dispatchAction) {
      dispatchAction()
    }
  }

  replaceFilter({ dispatchAction, filterIndex, filter } = {}) {
    this._filters = [...this._filters.slice(0, filterIndex), filter, ...this._filters.slice(filterIndex + 1)]

    if (dispatchAction) {
      dispatchAction()
    }
  }

  removeFilter({ dispatchAction, filterIndex } = {}) {
    this._filters = this._filters.filter((f, index) => index !== filterIndex)
    // Reset condition 0 type to 'AND' if only 1 filter exists
    if (this.key === '0' && this._filters.length <= 1) {
      this._type = 'AND'
    }

    if (dispatchAction) {
      dispatchAction()
    }
  }

  removeNewFilters({ dispatchAction = undefined } = {}) {
    this._filters
      .filter(f => f.id === 'NEW_FILTER')
      .map(f => this._filters.indexOf(f))
      .forEach(index => this.removeFilter({ filterIndex: index }))
    if (dispatchAction) {
      dispatchAction()
    }
  }

  removeDatasetFilters({ dispatchAction = undefined } = {}) {
    this._filters = this._filters.filter(f => !f.conditionGroup)

    if (dispatchAction) {
      dispatchAction()
    }
  }

  addConditionGroup({ filter: conditionFilter } = {}) {
    this.removeDatasetFilters()
    this._filters = [conditionFilter]
  }

  get paramMaps() {
    return [].concat.apply([], this._filters.map(filter => filter.paramMaps))
  }

  get errors() {
    return this._errors
  }

  set errors(errors) {
    this._errors = errors
  }

  addError(error) {
    this._errors = [...this._errors, error]
  }

  clearErrors() {
    this._errors = []
  }

  validate() {
    this.clearErrors()
    const datasetFilterCount = this.filters.filter(f => !f.conditionGroup).length
    const conditionFilterCount = this.filters.filter(f => f.conditionGroup).length
    if (this.key === '0') {
      // If has 1 condition filters, but no other filters
      if (conditionFilterCount === 1 && !datasetFilterCount) {
        this.addError(new ParamError({ message: 'Please add a filter to this group.' }))
      }

      if (this.type === 'OR' && this.filters.length === 1) {
        this.addError(new ParamError({ message: 'Please add at least 2 filters to an "OR" condition.' }))
      }
    } else if (this.key !== '0') {
      if (!datasetFilterCount) {
        this.addError(new ParamError({ message: 'Please add a filter' }))
      }

      if (this.type === 'OR' && datasetFilterCount < 2) {
        this.addError(new ParamError({ message: 'Please add at least 2 filters to an "OR" condition.' }))
      }
    }
  }
}

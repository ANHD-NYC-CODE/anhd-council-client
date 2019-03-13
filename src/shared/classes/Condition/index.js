import { StandardizedInput } from 'shared/classes/StandardizedInput'
import { ParamError } from 'shared/classes/ParamError'

export class Condition {
  constructor({ key = undefined, type = undefined, filters = [], errors = [] } = {}) {
    this._key = key
    this._type = type
    this._filters = filters
    this._errors = errors
  }

  get key() {
    return this._key
  }

  get type() {
    return this._type
  }

  set type(type) {
    this._type = type
  }

  get filters() {
    return this._filters
  }

  set filters(filters) {
    this._filters = filters
  }

  toggleAndOrConditionType(e) {
    if (e && !(e instanceof StandardizedInput))
      throw 'please pass a StandardizedInput class instance into the "e" parameter'

    if (e.value.toUpperCase() === 'AND') {
      this._type = 'OR'
    } else if (e.value.toUpperCase() === 'OR') {
      this._type = 'AND'
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

  addFilter({ dispatchAction, filter }) {
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

  replaceFilter({ dispatchAction, filterIndex, filter }) {
    this._filters = [...this._filters.slice(0, filterIndex), filter, ...this._filters.slice(filterIndex + 1)]

    if (dispatchAction) {
      dispatchAction()
    }
  }

  removeFilter({ dispatchAction, filterIndex }) {
    this._filters = this._filters.filter((f, index) => index !== filterIndex)
    if (dispatchAction) {
      dispatchAction()
    }
  }

  removeNewFilters({ dispatchAction }) {
    this._filters = this._filters.filter(f => f.id !== 'NEW_FILTER')
    if (dispatchAction) {
      dispatchAction()
    }
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
    const filterCount = this.filters.filter(f => !f.conditionGroup).length
    const conditionFilterCount = this.filters.filter(f => f.conditionGroup).length
    if (this.key === '0') {
      if (!!conditionFilterCount && !filterCount) {
        this.addError(new ParamError({ message: 'Please add a filter' }))
      }

      if (this.type === 'OR' && filterCount === 1) {
        this.addError(new ParamError({ message: 'Please add at least 2 filters to an "OR" condition.' }))
      }
    } else if (this.key !== '0') {
      if (!filterCount) {
        this.addError(new ParamError({ message: 'Please add a filter' }))
      }

      if (this.type === 'OR' && filterCount < 2) {
        this.addError(new ParamError({ message: 'Please add at least 2 filters to an "OR" condition.' }))
      }
    }
  }
}

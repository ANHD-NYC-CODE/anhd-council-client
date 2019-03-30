import { StandardizedInput } from 'shared/classes/StandardizedInput'
import { comparisonOptions } from 'shared/utilities/filterUtils'

import { shortAmountComparisonString } from 'shared/utilities/languageUtils'

import {
  minValidate,
  maxValidate,
  requiredValidate,
  typeValidate,
} from 'shared/classes/ParameterMapping/utilities/validations'

export class ParameterMapping {
  constructor({
    component = {},
    baseComponent = {},
    languageModule = {},
    props = {},
    validations = {},
    defaultOptions = undefined,
    field = '',
    comparison = '',
    value = '',
    type = '',
    rangeKey = undefined,
    rangePosition = undefined,
    resourceConstant = '',
    resourceModel = undefined,
  } = {}) {
    this._component = component
    this._baseComponent = baseComponent
    this._languageModule = languageModule
    this._props = props
    this._validations = validations
    this._field = field
    this._comparison = comparison
    this._value = value
    this._type = type
    this._defaultOptions = defaultOptions
    this._rangeKey = rangeKey
    this._rangePosition = rangePosition
    this._errors = []
    this._resourceConstant = resourceConstant
    this._resourceModel = resourceModel
  }

  get field() {
    return this._field
  }

  get comparison() {
    return this._comparison
  }

  set comparison(value) {
    this._comparison = value
  }

  get value() {
    return this._value
  }

  set value(value) {
    this._value = value
  }

  get type() {
    return this._type
  }

  set type(type) {
    this._type = type
  }

  get component() {
    return this._component
  }

  set component(component) {
    this._component = component
  }

  get baseComponent() {
    return this._baseComponent
  }

  set baseComponent(baseComponent) {
    this._baseComponent = baseComponent
  }

  get languageModule() {
    return this._languageModule
  }

  set languageModule(languageModule) {
    this._languageModule = languageModule
  }

  get props() {
    return this._props
  }

  set props(props) {
    this._props = props
  }

  get validations() {
    return this._validations
  }

  set validations(validations) {
    this._validations = validations
  }

  get defaultOptions() {
    return this._defaultOptions
  }

  set defaultOptions(value) {
    this._defaultOptions = value
  }

  get rangeKey() {
    return this._rangeKey
  }

  get rangePosition() {
    return this._rangePosition
  }

  get options() {
    return this._defaultOptions || comparisonOptions(['gte', 'exact', 'lte'])
  }

  get resourceConstant() {
    return this._resourceConstant
  }

  set resourceConstant(resourceConstant) {
    this._resourceConstant = resourceConstant
  }

  get resourceModel() {
    return this._resourceModel
  }

  set resourceModel(resourceModel) {
    this._resourceModel = resourceModel
  }

  get summaryString() {
    return `${shortAmountComparisonString(this._comparison, this._value)}`
  }

  createOptions(values) {
    return values || this.defaultOptions || comparisonOptions(['gte', 'exact', 'lte'], [], 'INTEGER')
  }

  update({ dispatchAction = undefined, e = undefined } = {}) {
    if (e && !(e instanceof StandardizedInput))
      throw 'please pass a StandardizedInput class instance into the "e" parameter'

    let updated = this.updateParameterMapValue(e)

    if (dispatchAction) {
      dispatchAction()
    }

    return updated
  }

  updateParameterMapValue(inputObject) {
    this[inputObject['name']] = inputObject['value']
    return this
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
    requiredValidate(this)
    typeValidate(this)
    Object.keys(this._validations).forEach(key => {
      switch (key) {
        case 'min':
          minValidate(this)
          break
        case 'max':
          maxValidate(this)
          break
      }
    })
  }

  toParamObject() {
    return {
      [`${this.field}${this.comparison ? '__' + this.comparison : ''}`]:
        this.type === 'PERCENT' ? this.value / 100 : this.value,
    }
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

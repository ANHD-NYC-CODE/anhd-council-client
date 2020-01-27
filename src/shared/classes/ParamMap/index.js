import StandardizedInput from 'shared/classes/StandardizedInput'
import { amountComparisonOptions } from 'shared/utilities/filterUtils'

import { grammaticalNoun, shortAmountComparisonString } from 'shared/utilities/languageUtils'
import { minValidate, maxValidate, requiredValidate, typeValidate } from 'shared/classes/ParamMap/utilities/validations'

export default class ParamMap {
  constructor({
    component = {},
    baseComponent = {},
    props = {},
    validations = {},
    defaultOptions = amountComparisonOptions(),
    field = '',
    comparison = '',
    value = '',
    rangeKey = undefined,
    rangePosition = undefined,
    resourceConstant = '',
    resourceModel = undefined,
    type = '',
    role = 'PRIMARY',
    paramNoun = '',
    comparisonPrefix = '',
    valuePrefix = '',
    valueSuffix = '',
  } = {}) {
    this._component = component
    this._baseComponent = baseComponent
    this._props = props
    this._validations = validations
    this._field = field
    this._comparison = comparison
    this._value = value
    this._defaultOptions = defaultOptions
    this._rangeKey = rangeKey
    this._rangePosition = rangePosition
    this._errors = []
    this._resourceConstant = resourceConstant
    this._resourceModel = resourceModel
    this._type = type
    this._role = role
    this._paramNoun = paramNoun
    this._comparisonPrefix = comparisonPrefix
    this._valuePrefix = valuePrefix
    this._valueSuffix = valueSuffix
  }

  keys() {
    return {
      component: this._component,
      baseComponent: this._baseComponent,
      props: this._props,
      validations: this._validations,
      defaultOptions: this._defaultOptions,
      field: this._field,
      comparison: this._comparison,
      value: this._value,
      rangeKey: this._rangeKey,
      rangePosition: this._rangePosition,
      errors: this._errors,
      resourceConstant: this._resourceConstant,
      resourceModel: this._resourceModel,
      type: this._type,
      role: this._role,
      paramNoun: this._paramNoun,
      comparisonPrefix: this._comparisonPrefix,
      valuePrefix: this._valuePrefix,
      valueSuffix: this._valueSuffix,
    }
  }

  clone() {
    const newSelf = new ParamMap({ ...this.keys() })
    return newSelf
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

  get paramNoun() {
    return this._paramNoun
  }

  set paramNoun(paramNoun) {
    this._paramNoun = paramNoun
  }

  get role() {
    return this._role
  }

  set role(role) {
    this._role = role
  }

  get valuePrefix() {
    return this._valuePrefix
  }

  set valuePrefix(valuePrefix) {
    this._valuePrefix = valuePrefix
  }

  get valueSuffix() {
    return this._valueSuffix
  }

  set valueSuffix(valueSuffix) {
    this._valueSuffix = valueSuffix
  }

  get comparisonPrefix() {
    return this._comparisonPrefix
  }

  set comparisonPrefix(comparisonPrefix) {
    this._comparisonPrefix = comparisonPrefix
  }

  get options() {
    return this._defaultOptions
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
    return `${shortAmountComparisonString(this._comparison, this._value)}${grammaticalNoun(
      this._resourceModel.label,
      this._value
    )}`
  }

  createOptions(values) {
    return values || this.defaultOptions
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

import { StandardizedInput } from 'shared/classes/StandardizedInput'
import { comparisonOptions } from 'shared/utilities/filterUtils'

export class ParameterMapping {
  constructor({
    component = {},
    baseComponent = {},
    languageModule = {},
    props = {},
    defaultOptions = undefined,
    field = '',
    comparison = '',
    value = '',
    rangeKey = undefined,
    rangePosition = undefined,
  } = {}) {
    this._component = component
    this._baseComponent = baseComponent
    this._languageModule = languageModule
    this._props = props

    this._field = field
    this._comparison = comparison
    this._value = value
    this._defaultOptions = defaultOptions
    this._rangeKey = rangeKey
    this._rangePosition = rangePosition
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

  createOptions(values) {
    return values || this.defaultOptions || comparisonOptions(['gte', 'exact', 'lte'], [], 'INTEGER')
  }

  update({ dispatchAction = undefined, e = undefined } = {}) {
    let updated = this.updateParameterMapValue(new StandardizedInput(e).value)

    if (dispatchAction) {
      dispatchAction()
    }

    return updated
  }

  updateParameterMapValue(inputObject) {
    this[inputObject['name']] = inputObject['value']
    return this
  }
}

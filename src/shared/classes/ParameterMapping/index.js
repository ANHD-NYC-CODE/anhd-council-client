import { StandardizedInput } from 'shared/classes/StandardizedInput'

export class ParameterMapping {
  constructor({ component = {}, field = '', comparison = '', value = '' } = {}) {
    this._field = field
    this._comparison = comparison
    this._value = value
    this._component = component
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

  get component() {
    return this._component
  }

  set component(component) {
    this._component = component
  }

  set comparison(value) {
    this._comparison = value
  }

  set value(value) {
    this._value = value
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

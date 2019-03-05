export class BaseParamMapComponent {
  constructor({ component = undefined } = {}) {
    this._component = component
  }

  get component() {
    return this._component
  }

  set component(value) {
    this._component = value
  }
}

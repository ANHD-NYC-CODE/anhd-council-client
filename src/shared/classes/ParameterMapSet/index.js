export class ParameterMapSet {
  constructor({ setComponent = null, paramMaps = [], defaults = [] } = {}) {
    this._setComponent = setComponent
    this._paramMaps = paramMaps
    this._defaults = defaults
  }

  get setComponent() {
    return this._setComponent
  }

  get paramMaps() {
    return this._paramMaps
  }

  get defaults() {
    return this._defaults
  }

  set paramMaps(newArray) {
    this._paramMaps = newArray
  }

  addParameterMap(parameterMap) {
    this.paramMaps = [...this.paramMaps, parameterMap]
  }

  unshiftParameterMap(parameterMap) {
    this.paramMaps = [parameterMap, ...this.paramMaps]
  }

  updateParameterMap(paramMapIndex, inputObject) {
    const updatedParameterMap = this.paramMaps[paramMapIndex]
    updatedParameterMap[inputObject['name']] = inputObject['value']
    this.paramMaps = [
      ...this.paramMaps.slice(0, paramMapIndex),
      updatedParameterMap,
      ...this.paramMaps.slice(paramMapIndex + 1),
    ]
  }

  removeParameterMap(paramMapIndex) {
    this.paramMaps = [...this.paramMaps.slice(0, paramMapIndex), ...this.paramMaps.slice(paramMapIndex + 1)]
  }

  clearParameterMaps() {
    this.paramMaps = []
  }
}

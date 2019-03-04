export class ParameterMapSet {
  constructor(filter, paramMaps, defaults, maxMaps) {
    this._filter = filter
    this._paramMaps = paramMaps || []
    this._defaults = defaults || []
    this._maxMaps = maxMaps
  }

  get filter() {
    return this._filter
  }

  get paramMaps() {
    return this._paramMaps
  }

  get defaults() {
    return this._defaults
  }

  get maxMaps() {
    return this._maxMaps
  }

  set paramMaps(newArray) {
    this._paramMaps = newArray
  }

  addParameterMap(parameterMap) {
    this.paramMaps = [...this.paramMaps, parameterMap]
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
}

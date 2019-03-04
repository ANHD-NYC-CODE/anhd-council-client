import { cloneInstance } from 'shared/utilities/classUtils'
import { StandardizedInput } from 'shared/classes/StandardizedInput'

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

  createOne({ dispatchAction = undefined, unshift = false } = {}) {
    let created
    if (unshift) {
      created = this.unshiftParameterMap(cloneInstance(this.defaults[0]))
    } else {
      created = this.addParameterMap(cloneInstance(this.defaults[0]))
    }
    if (dispatchAction) {
      dispatchAction()
    }
    return created
  }

  createSpecific({ dispatchAction = undefined, paramMap = null, unshift = false } = {}) {
    if (!paramMap) throw "Please pass a param map instance to the 'paramMap' key parameter"

    let created
    if (unshift) {
      created = this.unshiftParameterMap(paramMap)
    } else {
      created = this.addParameterMap(paramMap)
    }
    if (dispatchAction) {
      dispatchAction()
    }
    return created
  }

  addParameterMap(parameterMap) {
    this.paramMaps = [...this.paramMaps, parameterMap]
    return parameterMap
  }

  unshiftParameterMap(parameterMap) {
    this.paramMaps = [parameterMap, ...this.paramMaps]
    return parameterMap
  }

  updateSpecific({ dispatchAction = undefined, paramMapIndex = undefined, paramMap = undefined, e = undefined } = {}) {
    if (!paramMap && paramMapIndex !== 0 && !paramMap)
      throw 'please pass a paramMapIndex or a paramMap instance as a key parameter'

    let updated
    if (paramMap) {
      updated = paramMap.updateParameterMapValue(new StandardizedInput(e).value)
    } else {
      updated = this.paramMaps[paramMapIndex].updateParameterMapValue(new StandardizedInput(e).value)
    }

    if (dispatchAction) {
      dispatchAction()
    }

    return updated
  }

  updateParameterMap(paramMapIndex, inputObject) {
    const updatedParameterMap = this.paramMaps[paramMapIndex]
    updatedParameterMap[inputObject['name']] = inputObject['value']
    this.paramMaps = [
      ...this.paramMaps.slice(0, paramMapIndex),
      updatedParameterMap,
      ...this.paramMaps.slice(paramMapIndex + 1),
    ]
    return updatedParameterMap
  }

  deleteSpecific({ dispatchAction = undefined, paramMapIndex = undefined }) {
    if (paramMapIndex !== 0 && !paramMapIndex) throw "Please pass an index into 'paramMapIndex' key parameter"
    this.removeParameterMap(paramMapIndex)
    if (dispatchAction) {
      dispatchAction()
    }
  }

  deleteAll({ dispatchAction = undefined }) {
    this.clearParameterMaps()
    if (dispatchAction) {
      dispatchAction()
    }
  }

  removeParameterMap(paramMapIndex) {
    this.paramMaps = [...this.paramMaps.slice(0, paramMapIndex), ...this.paramMaps.slice(paramMapIndex + 1)]
  }

  clearParameterMaps() {
    this.paramMaps = []
  }
}

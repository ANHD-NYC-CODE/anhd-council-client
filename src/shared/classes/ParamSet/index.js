import { cloneInstance } from 'shared/utilities/classUtils'
import StandardizedInput from 'shared/classes/StandardizedInput'
import ParamMap from 'shared/classes/ParamMap'

export default class ParamSet {
  constructor({ component = null, paramMaps = [], defaults = [], label = '', createType = 'ALL' } = {}) {
    this._component = component
    this._paramMaps = paramMaps
    this._defaults = defaults
    this._label = label
    this._createType = createType
  }

  keys() {
    return {
      component: this._component,
      paramMaps: this.paramMaps.map(pm => pm.clone()),
      defaults: this._defaults,
      label: this._label,
      createType: this._createType,
    }
  }

  clone() {
    const newSelf = new ParamSet({ ...this.keys() })
    return newSelf
  }

  get component() {
    return this._component
  }

  get paramMaps() {
    return this._paramMaps
  }

  set paramMaps(paramMaps) {
    this._paramMaps = paramMaps
  }
  get defaults() {
    return this._defaults
  }

  get label() {
    return this._label
  }

  set label(label) {
    this._label = label
  }

  get createType() {
    return this._createType
  }

  create({ dispatchAction = undefined, paramMap = null, unshift = false } = {}) {
    switch (this.createType) {
      case 'ONE':
        return this.createOne({ dispatchAction, unshift })
      case 'SPECIFIC':
        return this.createSpecific({ dispatchAction, paramMap, unshift })
      case 'ALL_RANGE_ONE':
        return this.createAllRangeOne({ dispatchAction })
      case 'ALL':
        return this.createAll({ dispatchAction })
      default:
        return this.createAll({ dispatchAction })
    }
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

  // Adds both parameters in a range set
  createOppositeRangeMap({ dispatchAction = undefined, rangePosition = 1 } = {}) {
    let created = this.addParameterMap(
      this.defaults.find(mapping => mapping.rangePosition && mapping.rangePosition !== rangePosition)
    )

    if (dispatchAction) {
      dispatchAction()
    }

    return created
  }

  createAllRangeOne({ dispatchAction = undefined } = {}) {
    this.defaults.forEach(defaultParamMap => {
      if (defaultParamMap.rangeKey && defaultParamMap.rangePosition !== 1) {
        return
      }
      this.addParameterMap(cloneInstance(defaultParamMap))
    })

    if (dispatchAction) {
      dispatchAction()
    }
  }

  createAll({ dispatchAction = undefined } = {}) {
    this.defaults.forEach(defaultParamMap => {
      this.addParameterMap(cloneInstance(defaultParamMap))
    })

    if (dispatchAction) {
      dispatchAction()
    }
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
    if (e && !(e instanceof StandardizedInput))
      throw 'please pass a StandardizedInput class instance into the "e" parameter'

    let updated
    if (paramMap) {
      updated = paramMap.updateParameterMapValue(e)
    } else {
      updated = this.paramMaps[paramMapIndex].updateParameterMapValue(new e())
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

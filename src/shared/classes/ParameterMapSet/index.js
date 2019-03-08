import { cloneInstance } from 'shared/utilities/classUtils'
import { StandardizedInput } from 'shared/classes/StandardizedInput'

export class ParameterMapSet {
  constructor({
    component = null,
    paramMaps = [],
    defaults = [],
    props = {},
    allowActions = true,
    createType = 'ALL',
  } = {}) {
    this._component = component
    this._paramMaps = paramMaps
    this._defaults = defaults
    this._props = props
    this._allowActions = allowActions
    this._createType = createType
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

  get props() {
    return this._props
  }

  set props(props) {
    this._props = props
  }

  get createType() {
    return this._createType
  }

  get allowActions() {
    return this._allowActions
  }

  set allowActions(allowActions) {
    this._allowActions = allowActions
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
    if (!(e instanceof StandardizedInput)) throw 'please pass a StandardizedInput class instance into the "e" parameter'

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

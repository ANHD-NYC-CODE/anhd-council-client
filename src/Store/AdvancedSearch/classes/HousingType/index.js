import * as ht from 'shared/constants/housingTypes'
import { ParameterMapSet } from 'shared/classes/ParameterMapSet'

export class HousingType {
  constructor(objectConstant, paramsObject) {
    this.setObject = this.setObject.bind(this)
    this._paramsObject = paramsObject || {}
    this.setObject(objectConstant)
  }

  setObject(objectConstant) {
    const object = ht[Object.keys(ht).find(obj => ht[obj].constant === objectConstant)]
    if (object) {
      this._object = object
      this._name = this.object.name
      this._queryName = this.object.queryName
      this._constant = this.object.constant
      this._paramsMappingSchema = this.object.paramsMappingSchema

      // Set default keys to ParameterMapSet without any parameter maps
      Object.keys(this._paramsMappingSchema).map(key => {
        this._paramsObject = {
          ...this.paramsObject,
          ...{
            [key]: new ParameterMapSet(this.paramsMappingSchema[key].filter, [], this.paramsMappingSchema[key].maxMaps),
          },
        }
      })
    } else {
      throw `Pass either '${Object.keys(ht)
        .map(key => ht[key].constant)
        .join("' or '")}' as the first argument.`
    }
  }

  get object() {
    return this._object
  }

  get name() {
    return this._name
  }
  get queryName() {
    return this._queryName
  }
  get constant() {
    return this._constant
  }

  get paramsMappingSchema() {
    return this._paramsMappingSchema
  }

  get queryParamsObject() {
    // Maps the params array into an object that Axios can plug in for requests.
    return Object.assign(
      {},
      ...this._paramsObject.map(p => ({
        [`${p.field}${p.comparison ? '__' + p.comparison : ''}`]: p.value,
      }))
    )
  }

  get paramsObject() {
    return this._paramsObject
  }

  set object(objectConstant) {
    this.setObject(objectConstant)
  }

  set paramsObject(newParamsObject) {
    this._paramsObject = newParamsObject
  }

  addParamMapping(paramsObjectKey, paramsSetIndex) {
    // Clone schema class
    // debugger
    const newParamsMapping = Object.assign(
      Object.create(Object.getPrototypeOf(this.paramsMappingSchema[paramsObjectKey].paramMaps[paramsSetIndex])),
      this.paramsMappingSchema[paramsObjectKey].paramMaps[paramsSetIndex]
    )

    const paramMapSet = this._paramsObject[paramsObjectKey]
    paramMapSet.addParameterMap(newParamsMapping)
    this._paramsObject = {
      ...this._paramsObject,
      ...{
        [paramsObjectKey]: paramMapSet,
      },
    }
  }

  updateParamMapping(paramsObjectKey, paramMapIndex, inputObject) {
    let paramMapSet = this._paramsObject[paramsObjectKey]
    paramMapSet.updateParameterMap(paramMapIndex, inputObject)

    this._paramsObject = { ...this._paramsObject, ...{ [paramsObjectKey]: paramMapSet } }
  }

  removeParamMapping(paramsObjectKey, paramMapsIndex) {
    const paramMapSet = this._paramsObject[paramsObjectKey]
    paramMapSet.removeParameterMap(paramMapsIndex)
  }
}

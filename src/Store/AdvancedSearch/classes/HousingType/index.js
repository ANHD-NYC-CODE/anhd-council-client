import * as ht from 'shared/constants/housingTypes'
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

      // Set default keys to blank array
      Object.keys(this._paramsMappingSchema).map(key => {
        this._paramsObject = { ...this.paramsObject, ...{ [key]: [] } }
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

  addParamMapping(paramsMappingKey, paramsSetIndex) {
    // Clone schema class
    const newParamsMapping = Object.assign(
      Object.create(Object.getPrototypeOf(this.paramsMappingSchema[paramsMappingKey][paramsSetIndex])),
      this.paramsMappingSchema[paramsMappingKey][paramsSetIndex]
    )

    this._paramsObject = {
      ...this._paramsObject,
      ...{
        [paramsMappingKey]: [newParamsMapping],
      },
    }
  }

  updateParamMapping(paramsObjectKey, paramsMapIndex, inputObject) {
    let paramMapSet = this._paramsObject[paramsObjectKey]
    let updatedParam = paramMapSet[paramsMapIndex]
    updatedParam[inputObject['name']] = inputObject['value']
    paramMapSet = [...paramMapSet.slice(0, paramsMapIndex), updatedParam, ...paramMapSet.slice(paramsMapIndex + 1)]

    this._paramsObject = { ...this._paramsObject, ...{ [paramsObjectKey]: paramMapSet } }
  }

  removeParamMapping(paramsObjectKey, paramMapsIndex) {
    this._paramsObject[paramsObjectKey] = [
      ...this._paramsObject[paramsObjectKey].slice(0, paramMapsIndex),
      ...this._paramsObject[paramsObjectKey].slice(paramMapsIndex + 1),
    ]
  }
}

import * as ht from 'shared/constants/housingTypes'
export class HousingType {
  constructor(objectConstant, paramsObject) {
    this.setObject = this.setObject.bind(this)
    this.setObject(objectConstant)

    this._paramsObject = paramsObject || {}
  }

  setObject(objectConstant) {
    const object = ht[Object.keys(ht).find(obj => ht[obj].constant === objectConstant)]
    if (object) {
      this._object = object
      this._name = this.object.name
      this._queryName = this.object.queryName
      this._constant = this.object.constant
      this._paramsMappingSchema = this.object.paramsMappingSchema
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

  addParamMapping(paramsMappingKey) {
    // Clone schema class
    const newParamsMapping = Object.assign(
      Object.create(Object.getPrototypeOf(this.paramsMappingSchema[paramsMappingKey])),
      this.paramsMappingSchema[paramsMappingKey]
    )

    this._paramsObject = {
      ...this._paramsObject,
      ...{ [paramsMappingKey]: newParamsMapping },
    }
  }

  updateParamMapping(paramsObjectKey, inputObject) {
    this._paramsObject[paramsObjectKey][inputObject['name']] = inputObject['value']
    this._paramsObject = { ...this._paramsObject, ...{ [paramsObjectKey]: this._paramsObject[paramsObjectKey] } }
  }

  removeParamMapping(paramsObjectKey) {
    delete this._paramsObject[paramsObjectKey]
  }
}

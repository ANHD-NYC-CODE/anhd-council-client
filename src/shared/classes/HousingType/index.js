import * as ht from 'shared/models/housingTypes'
import { cloneInstance } from 'shared/utilities/classUtils'

export class HousingType {
  constructor({ housingType = null, paramsObject = {} } = {}) {
    this.setObject = this.setObject.bind(this)
    this._paramsObject = paramsObject || {}
    this.setObject(housingType)
  }

  setObject(housingType) {
    const object = ht[Object.keys(ht).find(obj => ht[obj].constant === housingType)]
    if (!object)
      throw `Pass either '${Object.keys(ht)
        .map(key => ht[key].constant)
        .join("' or '")}' as the first argument. Can't match ${housingType}`

    this._object = object
    this._name = this.object.name
    this._queryName = this.object.queryName
    this._constant = this.object.constant
    this._schema = this.object.schema

    if (this._schema) {
      // Set default keys to ParameterMapSet without any parameter maps
      Object.keys(this._schema)
        .reverse()
        .map(key => {
          this._paramsObject = {
            ...{
              [key]: cloneInstance(this.schema[key]),
            },
            ...this.paramsObject,
          }
        })
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

  get schema() {
    return this._schema
  }

  get params() {
    // Maps the params array into an object that Axios can plug in for requests.
    return Object.assign(
      {},
      ...Object.keys(this.paramsObject).map(key => {
        return {
          ...Object.assign(
            {},
            ...this.paramsObject[key].paramMaps.map(paramMap => {
              return {
                [`${paramMap.field}${paramMap.comparison ? '__' + paramMap.comparison : ''}`]:
                  paramMap.type === 'PERCENT' ? paramMap.value / 100 : paramMap.value,
              }
            })
          ),
        }
      })
    )
  }

  get paramsObject() {
    return this._paramsObject
  }

  set object(housingType) {
    this.setObject(housingType)
  }

  set paramsObject(newParamsObject) {
    this._paramsObject = newParamsObject
  }
}

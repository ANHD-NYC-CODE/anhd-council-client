import * as ht from 'shared/models/housingTypes'

export class HousingType {
  constructor(housingType, params) {
    this.setObject = this.setObject.bind(this)

    this.setObject(housingType)
    this._params = params
  }

  setObject(housingType) {
    const object = ht[Object.keys(ht).find(obj => ht[obj].constant === housingType)]
    if (object) {
      this._object = object
      this._name = this.object.name
      this._queryName = this.object.queryName
      this._constant = this.object.constant
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

  get params() {
    return this._params
  }

  set object(value) {
    this.setObject(value)
    this.id = undefined // Clear the ID to avoid geography/id mismatches
  }

  set params(params) {
    this._parms = { ...this._params, ...params }
  }
}

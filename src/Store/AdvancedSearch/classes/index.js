import * as b from 'shared/constants/boundaries'
import * as ht from 'shared/constants/housingTypes'

export class Boundary {
  constructor(objectConstant, id) {
    this.setObject = this.setObject.bind(this)

    this.setObject(objectConstant)

    this._id = id
  }

  setObject(objectConstant) {
    const object = b[Object.keys(b).find(obj => b[obj].constant === objectConstant)]
    if (object) {
      this._object = object
      this._name = this.object.name
      this._queryName = this.object.queryName
      this._constant = this.object.constant
    } else {
      throw `Pass either '${Object.keys(b)
        .map(key => b[key].constant)
        .join("' or '")}' as the first argument.`
    }
  }

  get object() {
    return this._object
  }
  get id() {
    return this._id
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

  set object(value) {
    this.setObject(value)
    this.id = undefined // Clear the ID to avoid boundary/id mismatches
  }

  set id(value) {
    this._id = value
  }
}

export class HousingType {
  constructor(objectConstant, params) {
    this.setObject = this.setObject.bind(this)

    this.setObject(objectConstant)
    this._params = params
  }

  setObject(objectConstant) {
    const object = ht[Object.keys(ht).find(obj => ht[obj].constant === objectConstant)]
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
    this.id = undefined // Clear the ID to avoid boundary/id mismatches
  }

  set params(params) {
    this._parms = { ...this._params, ...params }
  }
}

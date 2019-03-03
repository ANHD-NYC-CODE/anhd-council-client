import * as b from 'shared/constants/boundaries'
import * as ht from 'shared/constants/housingTypes'

export class Boundary {
  constructor(type, id) {
    this.setObject = this.setObject.bind(this)

    this.setObject(type)

    this._id = id
  }

  setObject(type) {
    const object = b[Object.keys(b).find(obj => b[obj].constant === type)]
    if (object) {
      this._object = object
      this._queryName = this.object.queryName
      this._name = this.object.name
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

  set name(value) {
    this._name = value
  }
  set queryName(value) {
    this._queryName = value
  }
  set constant(value) {
    this._constant = value
  }
}

export class HousingType {
  constructor(type, id) {
    if (type === b.COUNCILBOUNDARY.constant) {
      this._object = b.COUNCILBOUNDARY
    } else if (type === b.COMMUNITYBOUNDARY.constant) {
      this._object = b.COMMUNITYBOUNDARY
    } else {
      throw `Pass either '${b.COUNCILBOUNDARY.constant}' or '${b.COMMUNITYBOUNDARY.constant}' as the first argument.`
    }

    this._queryName = this.object.queryName
    this._name = this.object.name
    this._constant = this.object.constant
    this._id = id
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
    if (value === b.COUNCILBOUNDARY.constant) {
      this._object = b.COUNCILBOUNDARY
    } else if (value === b.COMMUNITYBOUNDARY.constant) {
      this._object = b.COMMUNITYBOUNDARY
    } else {
      throw `Pass either '${b.COUNCILBOUNDARY.constant}' or '${b.COMMUNITYBOUNDARY.constant}' as the first argument.`
    }

    this._queryName = this.object.queryName
    this._name = this.object.name
    this._constant = this.object.constant
    this.id = undefined // Clear the ID to avoid boundary/id mismatches
  }

  set id(value) {
    this._id = value
  }

  set name(value) {
    this._name = value
  }
  set queryName(value) {
    this._queryName = value
  }
  set constant(value) {
    this._constant = value
  }
}

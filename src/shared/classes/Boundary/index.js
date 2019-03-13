import * as b from 'shared/constants/boundaries'

export class Boundary {
  constructor(boundary, id) {
    this.setObject = this.setObject.bind(this)

    this.setObject(boundary)

    this._id = id
    this._errors = []
  }

  setObject(boundary) {
    const object = b[Object.keys(b).find(obj => b[obj].constant === boundary)]
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

  get errors() {
    return this._errors
  }

  set errors(errors) {
    this._errors = errors
  }

  addError(error) {
    this._errors = [...this._errors, error]
  }

  clearErrors() {
    this._errors = []
  }

  set object(value) {
    this.setObject(value)
    this.id = undefined // Clear the ID to avoid boundary/id mismatches
  }

  set id(value) {
    this._id = value
  }
}

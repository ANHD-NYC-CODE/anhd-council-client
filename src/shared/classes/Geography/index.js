import * as b from 'shared/constants/geographies'

export default class Geography {
  constructor(GeographyConstant, id) {
    this._id = id
    this._constant = GeographyConstant
    this._errors = []
    this.handleSetGeographyType(GeographyConstant)
  }

  clone() {
    const newSelf = new Geography(this._constant, this._id)
    return newSelf
  }

  handleSetGeographyType(GeographyConstant) {
    const geographyType = b[Object.keys(b).find(obj => b[obj].constant === GeographyConstant)]
    if (geographyType) {
      this._type = geographyType
      this._name = this.geographyType.name
      this._queryName = this.geographyType.queryName
      this._constant = this.geographyType.constant
    } else {
      throw `Pass either '${Object.keys(b)
        .map(key => b[key].constant)
        .join("' or '")}' as the first argument.`
    }
  }

  get geographyType() {
    return this._type
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

  set geographyType(GeographyConstant) {
    this.handleSetGeographyType(GeographyConstant)
    this.id = undefined // Clear the ID to avoid Geography/id mismatches
  }

  set constant(value) {
    this._constant = value
  }

  set id(value) {
    this._id = value
  }
}

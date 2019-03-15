import * as b from 'shared/constants/geographies'

export class Geography {
  constructor(geographyConstant, id) {
    this._id = id
    this._errors = []
    this.handleSetGeographyType(geographyConstant)
  }

  handleSetGeographyType(geographyConstant) {
    const geographyType = b[Object.keys(b).find(obj => b[obj].constant === geographyConstant)]
    if (geographyType) {
      this._geographyType = geographyType
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
    return this._geographyType
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

  set geographyType(geographyConstant) {
    this.handleSetGeographyType(geographyConstant)
    this.id = undefined // Clear the ID to avoid geography/id mismatches
  }

  set id(value) {
    this._id = value
  }
}

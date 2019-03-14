import * as b from 'shared/constants/boundaries'

export class Boundary {
  constructor(boundaryConstant, id) {
    this._id = id
    this._errors = []
    this.handleSetBoundaryType(boundaryConstant)
  }

  handleSetBoundaryType(boundaryConstant) {
    const boundaryType = b[Object.keys(b).find(obj => b[obj].constant === boundaryConstant)]
    if (boundaryType) {
      this._boundaryType = boundaryType
      this._name = this.boundaryType.name
      this._queryName = this.boundaryType.queryName
      this._constant = this.boundaryType.constant
    } else {
      throw `Pass either '${Object.keys(b)
        .map(key => b[key].constant)
        .join("' or '")}' as the first argument.`
    }
  }

  get boundaryType() {
    return this._boundaryType
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

  set boundaryType(boundaryConstant) {
    this.handleSetBoundaryType(boundaryConstant)
    this.id = undefined // Clear the ID to avoid boundary/id mismatches
  }

  set id(value) {
    this._id = value
  }
}

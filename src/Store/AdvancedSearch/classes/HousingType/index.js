import * as ht from 'shared/constants/housingTypes'

export class HousingType {
  constructor(objectConstant, params) {
    this.setObject = this.setObject.bind(this)
    this.setObject(objectConstant)
    if (!Array.isArray(params)) throw '2nd argument must be an array.'
    this._params = params
  }

  setObject(objectConstant) {
    const object = ht[Object.keys(ht).find(obj => ht[obj].constant === objectConstant)]
    if (object) {
      this._object = object
      this._name = this.object.name
      this._queryName = this.object.queryName
      this._constant = this.object.constant
      this._filters = this.object.filters
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
    return Object.assign(
      {},
      ...this._params.map(p => ({
        [`${p.field}${p.comparison ? '__' + p.comparison : ''}`]: p.value,
      }))
    )
  }

  get filters() {
    return this._filters
  }

  set object(objectConstant) {
    this.setObject(objectConstant)
  }

  set params(newParams) {
    this._params = newParams
  }

  replaceParam(index, newParams) {
    this._params = [...this.params.slice(0, index), newParams, ...this.params.slice(index)]
  }
}

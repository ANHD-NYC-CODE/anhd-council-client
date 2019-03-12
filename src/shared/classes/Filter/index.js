import * as d from 'shared/models/datasets'
import * as ht from 'shared/models/housingTypes'

import { cloneInstance } from 'shared/utilities/classUtils'

export class Filter {
  constructor({ modelConstant = null, model = null, paramsObject = {} } = {}) {
    this._paramsObject = paramsObject
    this.id = modelConstant || model.id
    this._model = model

    if (!this.model) {
      this.setModel(modelConstant)
    } else if (!this.modelConstant) {
      return
    }

    if (modelConstant === 'NEW_FILTER' || modelConstant === 'ALL_TYPES') return

    // Post initialize actions
    if (!Object.keys(paramsObject).length) {
      Object.keys(this.paramsObject).forEach(key => {
        const paramSet = this.paramsObject[key]
        if (!paramSet.allowActions) {
          paramSet.create()
        }
      })
    }
  }

  findDataset(modelConstant) {
    return d[Object.keys(d).find(key => d[key]().id === modelConstant)]
      ? d[Object.keys(d).find(key => d[key]().id === modelConstant)]()
      : null
  }

  findHousingType(modelConstant) {
    return ht[Object.keys(ht).find(key => ht[key]().id === modelConstant)]
      ? ht[Object.keys(ht).find(key => ht[key]().id === modelConstant)]()
      : null
  }

  setModel(modelConstant) {
    const model = this.findDataset(modelConstant) || this.findHousingType(modelConstant) || this._model
    if (!model && modelConstant !== 'NEW_FILTER' && modelConstant !== 'ALL_TYPES')
      throw `Pass either '${Object.keys(d)
        .map(key => d[key].id)
        .join("' or '")}' as the first argument. ${modelConstant} does not have a match.`

    if ((model || {}).apiMap) {
      Object.keys(model.apiMap).forEach(key => {
        this[key] = model.apiMap[key]
      })
    }
    this._model = model
    this._schema = this.model.schema
    // Load the schema if no paramsObject was directly supplied
    if (!Object.keys(this.paramsObject).length) {
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

  get model() {
    return this._model
  }

  get name() {
    return this._name
  }
  get queryName() {
    return this._queryName
  }

  set queryName(queryName) {
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

  set model(model) {
    this.setModel(model)
  }

  set paramsObject(newParamsObject) {
    this._paramsObject = newParamsObject
  }

  get paramMaps() {
    return [].concat.apply([], Object.keys(this._paramsObject).map(key => this._paramsObject[key].paramMaps))
  }
}

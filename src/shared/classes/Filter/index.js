import * as d from 'shared/models/datasets'
import * as ht from 'shared/models/housingTypes'

import { cloneInstance } from 'shared/utilities/classUtils'

export class Filter {
  constructor({ modelConstant = null, dataset = null, paramsObject = {} } = {}) {
    this.setDataset = this.setDataset.bind(this)
    this._paramsObject = paramsObject
    this.id = modelConstant || dataset.id
    this._dataset = dataset

    this.setDataset(modelConstant)

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

  setDataset(modelConstant) {
    const dataset =
      d[Object.keys(d).find(obj => d[obj].id === modelConstant)] ||
      ht[Object.keys(ht).find(obj => ht[obj].id === modelConstant)] ||
      this._dataset
    if (!dataset && modelConstant !== 'NEW_FILTER' && modelConstant !== 'ALL_TYPES')
      throw `Pass either '${Object.keys(d)
        .map(key => d[key].id)
        .join("' or '")}' as the first argument. ${modelConstant} does not have a match.`

    if ((dataset || {}).apiMap) {
      Object.keys(dataset.apiMap).forEach(key => {
        this[key] = dataset.apiMap[key]
      })
    }
    this._dataset = dataset
    this._schema = this.dataset.schema
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

  get dataset() {
    return this._dataset
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

  set dataset(dataset) {
    this.setDataset(dataset)
  }

  set paramsObject(newParamsObject) {
    this._paramsObject = newParamsObject
  }

  get paramMaps() {
    return [].concat.apply([], Object.keys(this._paramsObject).map(key => this._paramsObject[key].paramMaps))
  }
}

import * as d from 'shared/models/datasets'
import { cloneInstance } from 'shared/utilities/classUtils'

export class Filter {
  constructor({ datasetConstant = null, paramsObject = {} } = {}) {
    this.setDataset = this.setDataset.bind(this)
    this._paramsObject = paramsObject

    this.setDataset(datasetConstant)

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

  setDataset(datasetConstant) {
    const dataset = d[Object.keys(d).find(obj => d[obj].apiMap.constant === datasetConstant)]

    if (!dataset)
      throw `Pass either '${Object.keys(d)
        .map(key => d[key].apiMap.constant)
        .join("' or '")}' as the first argument.`

    this._dataset = dataset
    this._name = this.dataset.apiMap.name
    this._queryName = this.dataset.apiMap.queryName
    this._constant = this.dataset.apiMap.constant
    this._url = this.dataset.apiMap.url
    this._schema = this.dataset.schema

    // Load the schema if no paramsObject was directly supplied
    if (!Object.keys(this.paramsObject).length) {
      Object.keys(this._schema).map(key => {
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
                [`${paramMap.field}${paramMap.comparison ? '__' + paramMap.comparison : ''}`]: paramMap.value,
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
}

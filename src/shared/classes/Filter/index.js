import * as resources from 'shared/models/resources'
import * as ht from 'shared/models/housingTypes'
import ParamError from 'shared/classes/ParamError'
import { getApiMap } from 'shared/utilities/classUtils'

import { cloneInstance } from 'shared/utilities/classUtils'

export default class Filter {
  constructor({ modelConstant = null, resourceModel = null, schema = null, paramSets = {}, errors = [] } = {}) {
    this._paramSets = paramSets
    this.id = modelConstant || resourceModel.resourceConstant
    this.modelConstant = modelConstant
    this._resourceModel = resourceModel
    this._schema = schema
    this._errors = errors

    if (!this.resourceModel && !!this.modelConstant) {
      const resourceModel =
        this.findDataset(this.modelConstant) || this.findHousingType(this.modelConstant) || this.resourceModel
      if (!resourceModel && this.modelConstant !== 'NEW_FILTER' && this.modelConstant !== 'ALL_TYPES') {
        throw `Pass either '${Object.keys(resources)
          .map(key => resources[key].id)
          .join("' or '")}' as the first argument. ${this.modelConstant} does not have a match.`
      }

      this.setModel(resourceModel)
      this.setSchema(schema)
    } else if (resourceModel) {
      this.setModel(resourceModel)
      this.setSchema(schema)
    } else {
      return
    }

    if (modelConstant === 'NEW_FILTER' || modelConstant === 'ALL_TYPES') return

    // Post initialize actions
    if (!Object.keys(paramSets).length) {
      Object.keys(this.paramSets).forEach(key => {
        const paramSet = this.paramSets[key]
        if (!paramSet.allowActions) {
          paramSet.create()
        }
      })
    }
  }

  findDataset(modelConstant) {
    return resources[Object.keys(resources).find(key => resources[key]().resourceConstant === modelConstant)]
      ? resources[Object.keys(resources).find(key => resources[key]().resourceConstant === modelConstant)]()
      : null
  }

  findHousingType(modelConstant) {
    return ht[Object.keys(ht).find(key => ht[key]().id === modelConstant)]
      ? ht[Object.keys(ht).find(key => ht[key]().id === modelConstant)]()
      : null
  }

  setSchema(schema) {
    // Load the schema if no paramSets was directly supplied
    if (schema && !Object.keys(this.paramSets).length) {
      Object.keys(schema)
        .reverse()
        .map(key => {
          this._paramSets = {
            ...{
              [key]: cloneInstance(schema[key]),
            },
            ...this.paramSets,
          }
        })
    }
  }

  setModel(resourceModel) {
    // Sets api map for resourceModel
    if (!resourceModel.apiMap) {
      resourceModel.apiMap = getApiMap(this.id)
    }

    // Sets api map for filter
    if ((resourceModel || {}).apiMap) {
      Object.keys(resourceModel.apiMap).forEach(key => {
        this[key] = resourceModel.apiMap[key]
      })
    }

    this._resourceModel = resourceModel
  }

  get resourceModel() {
    return this._resourceModel
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

  get schema() {
    return this._schema
  }

  set schema(schema) {
    this.setSchema(schema)
  }

  get params() {
    // Maps the params array into an object that Axios can plug in for requests.
    return Object.assign(
      {},
      ...Object.keys(this.paramSets).map(key => {
        return {
          ...Object.assign(
            {},
            ...this.paramSets[key].paramMaps.map(paramMap => {
              return paramMap.toParamObject()
            })
          ),
        }
      })
    )
  }

  get paramSets() {
    return this._paramSets
  }

  set resourceModel(resourceModel) {
    this.setModel(resourceModel)
  }

  set paramSets(newparamSets) {
    this._paramSets = newparamSets
  }

  get paramMaps() {
    return [].concat.apply([], Object.keys(this._paramSets).map(key => this._paramSets[key].paramMaps))
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

  validate() {
    this.clearErrors()
    if (this.id === 'NEW_FILTER') {
      this.addError(new ParamError({ message: 'Please make a selection' }))
    }
  }
}

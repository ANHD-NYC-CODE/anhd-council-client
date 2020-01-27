import * as resources from 'shared/models/resources'
import ParamError from 'shared/classes/ParamError'
import { getApiMap } from 'shared/utilities/classUtils'

import { cloneInstance, deepCloneObject } from 'shared/utilities/classUtils'

export default class Filter {
  constructor({
    modelConstant = null,
    resourceModel = null,
    primaryResourceModel = null,
    schema = null,
    paramSets = {},
    errors = [],
  } = {}) {
    this._paramSets = paramSets
    this.id = modelConstant || resourceModel.resourceConstant
    this.modelConstant = modelConstant
    this._resourceModel = resourceModel
    this.primaryResourceModel = primaryResourceModel
    this._schema = schema
    this._errors = errors
    if (!this.resourceModel && !!this.modelConstant) {
      const resourceModel = this.findDataset(this.modelConstant) || this.resourceModel
      if (!resourceModel && this.modelConstant !== 'NEW_FILTER' && this.modelConstant !== 'ALL_TYPES') {
        throw `Pass either '${Object.keys(resources)
          .map(key => resources[key].id)
          .join("' or '")}' as the first argument. ${this.modelConstant} does not have a match.`
      }

      this.setModel(resourceModel)
      this.setParamSets(schema)
    } else if (resourceModel) {
      this.setModel(resourceModel)
      this.setParamSets(schema)
    } else {
      return
    }

    if (modelConstant === 'NEW_FILTER' || modelConstant === 'ALL_TYPES') return

    // Post initialize actions
    // Create only paramSets with the "initial" tag.
    if (this.paramSets['initial'] && !this.paramSets['initial'].paramMaps.length) {
      this.paramSets['initial'].create()
    }
  }

  keys() {
    return {
      modelConstant: this.modelConstant,
      resourceModel: deepCloneObject(this._resourceModel),
      primaryResourceModel: this.primaryResourceModel,
      schema: deepCloneObject(this._schema),
      paramSets: {},
      errors: this._errors,
    }
  }

  clone() {
    const newSelf = new Filter({ ...this.keys() })

    const paramSets = newSelf.paramSets
    Object.keys(newSelf.paramSets).forEach(key => {
      paramSets[key] = newSelf.paramSets[key].clone()
    })

    newSelf.paramSets = paramSets
    return newSelf
  }

  findDataset(modelConstant) {
    return resources[Object.keys(resources).find(key => resources[key]().resourceConstant === modelConstant)]
      ? resources[Object.keys(resources).find(key => resources[key]().resourceConstant === modelConstant)]()
      : null
  }

  setParamSets(schema) {
    // Load the schema if no paramSets was directly supplied
    if (schema) {
      Object.keys(schema)
        .reverse()
        .map(key => {
          if (!this._paramSets[key]) {
            this._paramSets[key] = cloneInstance(schema[key])
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
    this.setParamSets(schema)
  }

  get primaryResourceModel() {
    return this._primaryResourceModel
  }

  set primaryResourceModel(primaryResourceModel) {
    this._primaryResourceModel = primaryResourceModel
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
    if (this.resourceModel.filterParamSets) return this.resourceModel.filterParamSets(this._paramSets)
    else return this._paramSets
  }

  get resourceModel() {
    return this._resourceModel
  }

  set resourceModel(resourceModel) {
    this.setModel(resourceModel)
  }

  set paramSets(newparamSets) {
    this._paramSets = newparamSets
  }

  get paramMaps() {
    const paramSets = this.resourceModel.filterParamSets
      ? this.resourceModel.filterParamSets(this._paramSets)
      : this._paramSets

    return [].concat.apply([], Object.keys(paramSets).map(key => paramSets[key].paramMaps)).filter(pm => pm)
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

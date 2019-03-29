import * as resources from 'shared/models/resources'
import * as ht from 'shared/models/housingTypes'
import { ParamError } from 'shared/classes/ParamError'
import { getApiMap } from 'shared/utilities/classUtils'

import { cloneInstance } from 'shared/utilities/classUtils'

export class Filter {
  constructor({ modelConstant = null, model = null, paramSets = {}, errors = [] } = {}) {
    this._paramSets = paramSets
    this.id = modelConstant || model.id
    this.modelConstant = modelConstant
    this._model = model
    this._errors = errors

    if (!this.model && !!this.modelConstant) {
      const model = this.findDataset(this.modelConstant) || this.findHousingType(this.modelConstant) || this._model
      if (!model && this.modelConstant !== 'NEW_FILTER' && this.modelConstant !== 'ALL_TYPES') {
        throw `Pass either '${Object.keys(resources)
          .map(key => resources[key].id)
          .join("' or '")}' as the first argument. ${this.modelConstant} does not have a match.`
      }

      this.setModel(model)
    } else if (model) {
      this.setModel(model)
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
    return resources[Object.keys(resources).find(key => resources[key]().id === modelConstant)]
      ? resources[Object.keys(resources).find(key => resources[key]().id === modelConstant)]()
      : null
  }

  findHousingType(modelConstant) {
    return ht[Object.keys(ht).find(key => ht[key]().id === modelConstant)]
      ? ht[Object.keys(ht).find(key => ht[key]().id === modelConstant)]()
      : null
  }

  setModel(model) {
    // Sets api map for model
    if (!model.apiMap) {
      model.apiMap = getApiMap(this.id)
    }

    // Sets api map for filter
    if ((model || {}).apiMap) {
      Object.keys(model.apiMap).forEach(key => {
        this[key] = model.apiMap[key]
      })
    }

    this._model = model
    this._schema = this.model.schema
    // Load the schema if no paramSets was directly supplied
    if (!Object.keys(this.paramSets).length) {
      Object.keys(this._schema)
        .reverse()
        .map(key => {
          this._paramSets = {
            ...{
              [key]: cloneInstance(this.schema[key]),
            },
            ...this.paramSets,
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

  set model(model) {
    this.setModel(model)
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

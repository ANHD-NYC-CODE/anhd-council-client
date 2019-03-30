import * as resources from 'shared/models/resources'
import * as ht from 'shared/models/housingTypes'
import { DataRequest } from 'shared/classes/DataRequest'
import { getApiMap } from 'shared/utilities/classUtils'
import { TableConfig } from 'shared/classes/TableConfig'
import { ApiMap } from 'shared/classes/ApiMap'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
import { Resource } from 'shared/classes/Resource'
import { housingTypeCodeToName } from 'shared/utilities/languageUtils'
import { constantToModelName, constantToQueryName } from 'shared/utilities/filterUtils'
import { alertMapFilterdates } from 'shared/utilities/componentUtils'

import { getUrlFormattedParamMaps } from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'

import LookupProfileSummary from 'Lookup/LookupProfileSummary'

export const setupHousingTypeModels = datasets => {
  return Object.keys(ht)
    .map(constant => {
      let databaseObject
      switch (constant) {
        case 'RENTSTABILIZED':
          databaseObject = datasets.find(object => (object.model_name || {}).toUpperCase() === 'CORESUBSIDYRECORD')
          break
        default:
          databaseObject = undefined
          break
      }
      return new Resource({ model: ht[constant](databaseObject) })
    })
    .filter(ht => ht)
}

export const setupResourceModels = datasets => {
  let loadedResources = {}
  Object.keys(resources).forEach(constant => {
    let databaseObject
    switch (constant) {
      case 'DOB_FILED_PERMIT':
        databaseObject = datasets.find(object => (object.model_name || {}).toUpperCase() === 'DOBLEGACYFILEDPERMIT')
        break
      case 'PROPERTY_SALE_BY_COUNT':
        databaseObject = datasets.find(object => (object.model_name || {}).toUpperCase() === 'ACRISREALLEGAL')
        break
      case 'PROPERTY_SALE_BY_AMOUNT':
        databaseObject = datasets.find(object => (object.model_name || {}).toUpperCase() === 'ACRISREALLEGAL')
        break
      default:
        databaseObject = datasets.find(
          object => (object.model_name || {}).toUpperCase() === constantToModelName(constant).toUpperCase()
        )
    }
    if (databaseObject) {
      loadedResources[constant] = new Resource({ model: resources[constant](databaseObject) })
    }
  })
  return loadedResources
}

export const newBuildingRequest = ({
  type = undefined,
  bin = undefined,
  resourceConstant = undefined,
  datasetModelName = undefined,
}) => {
  return new DataRequest({
    type: type,
    apiMaps: [
      new ApiMap({ constant: 'BUILDING', resourceId: bin }),
      resourceConstant ? getApiMap(resourceConstant) : undefined,
    ].filter(a => !!a),
    tableConfig: new TableConfig({ resourceConstant: resourceConstant, datasetModelName }),
  })
}

export const newPropertyRequest = ({
  type = undefined,
  bbl = undefined,
  resourceConstant = undefined,
  datasetModelName = undefined,
  tableComponent = undefined,
} = {}) => {
  return new DataRequest({
    type: type,
    apiMaps: [
      new ApiMap({ constant: 'PROPERTY', resourceId: bbl, name: 'Properties' }),
      resourceConstant ? getApiMap(resourceConstant) : undefined,
      type === 'LOOKUP_PROFILE' ? new ApiMap({ queryName: 'summary' }) : undefined,
    ].filter(a => !!a),
    tableConfig: new TableConfig({ resourceConstant: resourceConstant, component: tableComponent, datasetModelName }),
  })
}

export const newLookupRequests = ({ bbl, bin } = {}) => {
  return [
    newPropertyRequest({ type: 'LOOKUP_PROFILE', bbl: bbl, tableComponent: LookupProfileSummary }),
    !bin ? newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'ACRIS_REAL_MASTER' }) : null,
    !bin ? newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'EVICTION' }) : null,
    !bin
      ? newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          resourceConstant: 'LISPENDEN',
          datasetModelName: constantToModelName('LISPENDEN'),
        })
      : null,
    bin
      ? newBuildingRequest({ type: 'LOOKUP_FILTER', bin: bin, resourceConstant: 'HPD_VIOLATION' })
      : newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'HPD_VIOLATION' }),
    bin
      ? newBuildingRequest({ type: 'LOOKUP_FILTER', bin: bin, resourceConstant: 'HPD_COMPLAINT' })
      : newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'HPD_COMPLAINT' }),
    bin
      ? newBuildingRequest({ type: 'LOOKUP_FILTER', bin: bin, resourceConstant: 'DOB_VIOLATION' })
      : newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'DOB_VIOLATION' }),
    bin
      ? newBuildingRequest({ type: 'LOOKUP_FILTER', bin: bin, resourceConstant: 'DOB_COMPLAINT' })
      : newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'DOB_COMPLAINT' }),
    bin
      ? newBuildingRequest({ type: 'LOOKUP_FILTER', bin: bin, resourceConstant: 'ECB_VIOLATION' })
      : newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'ECB_VIOLATION' }),
    bin
      ? newBuildingRequest({ type: 'LOOKUP_FILTER', bin: bin, resourceConstant: 'DOB_ISSUED_PERMIT' })
      : newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'DOB_ISSUED_PERMIT' }),
    bin
      ? newBuildingRequest({
          type: 'LOOKUP_FILTER',
          bin: bin,
          resourceConstant: 'DOB_FILED_PERMIT',
          datasetModelName: constantToModelName('DOB_LEGACY_FILED_PERMIT'),
        })
      : newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          resourceConstant: 'DOB_FILED_PERMIT',
          datasetModelName: constantToModelName('DOB_LEGACY_FILED_PERMIT'),
        }),
    bin
      ? newBuildingRequest({ type: 'LOOKUP_FILTER', bin: bin, resourceConstant: 'HOUSING_LITIGATION' })
      : newPropertyRequest({ type: 'LOOKUP_FILTER', bbl: bbl, resourceConstant: 'HOUSING_LITIGATION' }),
  ].filter(r => !!r)
}

export const newGeographyRequest = ({
  type = undefined,
  geographyType = undefined,
  geographyId,
  resourceModel,
  resourceConstant = undefined,
  defaultValue = 10,
} = {}) => {
  return new DataRequest({
    type: type,
    resourceModel,
    apiMaps: [
      new ApiMap({ constant: geographyType, resourceId: geographyId }),
      new ApiMap({ constant: 'PROPERTY', name: 'Properties' }),
    ],
    paramMaps: [
      new ParameterMapping({
        resourceConstant,
        resourceModel,
        type: 'AMOUNT',
        field: resourceModel.urlPath,
        comparison: 'gte',
        value: defaultValue,
      }),
      new ParameterMapping({
        resourceConstant,
        resourceModel,
        type: 'DATE',
        field: `${resourceModel.urlPath}__start`,
        comparison: '',
        value: alertMapFilterdates()[0],
      }),
    ],
    tableConfig: new TableConfig({ resourceConstant: 'PROPERTY' }),
  })
}

export const newGeographyHousingTypeRequest = ({
  type = undefined,
  geographyType = undefined,
  geographyId,
  resourceModel,
  paramValue = undefined,
} = {}) => {
  return new DataRequest({
    type: type,
    resourceModel,
    requestConstant: `${type}_${paramValue.toUpperCase()}`,
    apiMaps: [
      new ApiMap({ constant: geographyType, resourceId: geographyId }),
      new ApiMap({ constant: 'PROPERTY', name: `${housingTypeCodeToName(paramValue)}` }),
    ],
    paramMaps: [
      new ParameterMapping({
        resourceModel,
        type: 'TEXT',
        field: 'summary',
        comparison: '',
        value: true,
      }),
    ],
    tableConfig: new TableConfig({ resourceConstant: 'PROPERTY' }),
  })
}

export const newMapRequests = ({ geographyType, geographyId, resourceModels } = {}) => {
  return [
    newGeographyHousingTypeRequest({
      type: 'GEOGRAPHY_HOUSING_TYPE',
      geographyType,
      geographyId,
      resourceModel: resourceModels['PROPERTY'],
      paramValue: 'all',
    }),
    newGeographyRequest({
      type: 'MAP_FILTER',
      geographyType,
      geographyId,
      resourceModel: resourceModels['HPD_VIOLATION'],
      defaultValue: 10,
    }),
    newGeographyRequest({
      type: 'MAP_FILTER',
      geographyType,
      geographyId,
      resourceModel: resourceModels['DOB_COMPLAINT'],
      defaultValue: 2,
    }),
    newGeographyRequest({
      type: 'MAP_FILTER',
      geographyType,
      geographyId,
      resourceModel: resourceModels['HPD_COMPLAINT'],
      defaultValue: 5,
    }),
    newGeographyRequest({
      type: 'MAP_FILTER',
      geographyType,
      geographyId,
      resourceModel: resourceModels['EVICTION'],
      defaultValue: 1,
    }),
    newGeographyRequest({
      type: 'MAP_FILTER',
      geographyType,
      geographyId,
      resourceModel: resourceModels['DOB_ISSUED_PERMIT'],
      defaultValue: 1,
    }),
  ]
}

export const newAdvancedSearchRequest = ({ geographyType, geographyId, advancedSearch } = {}) => {
  const paramMaps = getUrlFormattedParamMaps(advancedSearch)
  return new DataRequest({
    type: 'ADVANCED_SEARCH',
    resourceConstant: 'PROPERTY_ADVANCED_SEARCH',
    apiMaps: [
      new ApiMap({ constant: geographyType, resourceId: geographyId }),
      new ApiMap({ constant: 'PROPERTY', name: 'Custom Search' }),
    ],
    paramMaps: paramMaps,
    tableConfig: new TableConfig({ resourceConstant: 'PROPERTY' }),
  })
}

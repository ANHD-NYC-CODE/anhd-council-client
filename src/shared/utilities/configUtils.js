import * as resources from 'shared/models/resources'
import * as c from 'shared/constants'
import DataRequest from 'shared/classes/DataRequest'
import AnnotatedResultFilter from 'shared/classes/AnnotatedResultFilter'
import { getApiMap } from 'shared/utilities/classUtils'
import TableConfig from 'shared/classes/TableConfig'
import ApiMap from 'shared/classes/ApiMap'
import ParamMap from 'shared/classes/ParamMap'
import Resource from 'shared/classes/Resource'
import { housingTypeCodeToName } from 'shared/utilities/languageUtils'
import { constantToModelName } from 'shared/utilities/filterUtils'
import { getUrlFormattedParamMaps } from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'

import LookupProfileSummary from 'Lookup/LookupProfileSummary'

export const setupResourceModels = datasets => {
  let loadedResources = {}
  Object.keys(resources).forEach(constant => {
    let databaseObject
    switch (constant) {
      default:
        databaseObject = datasets.find(
          object => (object.model_name || {}).toUpperCase() === constantToModelName(constant).toUpperCase()
        )
    }
    if (databaseObject) {
      loadedResources[constant] = new Resource({ resourceModel: resources[constant](databaseObject) })
    }
  })
  return loadedResources
}

export const newBuildingRequest = ({
  type = undefined,
  bin = undefined,
  level = 'BUILDING',
  resourceConstant = undefined,
  resourceModel,
  datasetModelName = undefined,
}) => {
  return new DataRequest({
    type: type,
    level,
    resourceModel,
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
  level = 'PROPERTY',
  resourceConstant = undefined,
  datasetModelName = undefined,
  resourceModel,
  tableComponent = undefined,
  isAuthenticated = false,
} = {}) => {
  // WARNING: Do not change the summary request path or params without
  // simultaneously updating the backend app's core/utils/cache.py
  // caching script. The script caches based on URL, and if it's not updated,
  // These summary payloads can take up to a minute to deliver
  // in geographies with +10000 properties.
  return new DataRequest({
    type: type,
    resourceModel,
    isAuthenticated,
    level,
    apiMaps: [
      new ApiMap({ constant: 'PROPERTY', resourceId: bbl, name: 'Properties' }),
      resourceConstant ? getApiMap(resourceConstant) : undefined,
    ].filter(a => !!a),
    paramMaps: [
      type === 'LOOKUP_PROFILE'
        ? new ParamMap({
            resourceModel,
            type: 'TEXT',
            field: 'summary',
            comparison: '',
            value: true,
          })
        : undefined,
    ].filter(p => p),
    tableConfig: new TableConfig({ resourceConstant: resourceConstant, component: tableComponent, datasetModelName }),
  })
}

export const newLookupRequests = ({ bbl, bin, resourceModels } = {}) => {
  return [
    newPropertyRequest({
      type: 'LOOKUP_PROFILE',
      bbl: bbl,
      level: 'PROPERTY',
      tableComponent: LookupProfileSummary,
      resourceModel: resourceModels['PROPERTY'],
    }),
    newPropertyRequest({
      type: 'LOOKUP_FILTER',
      bbl: bbl,
      level: 'PROPERTY',
      resourceConstant: 'ACRIS_REAL_MASTER',
      resourceModel: resourceModels['ACRIS_REAL_MASTER'],
    }),
    newPropertyRequest({
      type: 'LOOKUP_FILTER',
      bbl: bbl,
      level: 'PROPERTY',
      resourceConstant: 'EVICTION',
      resourceModel: resourceModels['EVICTION'],
    }),
    bin
      ? newBuildingRequest({
          type: 'LOOKUP_FILTER',
          bin: bin,
          level: 'BUILDING',
          resourceConstant: 'HPD_COMPLAINT',
          resourceModel: resourceModels['HPD_COMPLAINT'],
        })
      : newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          level: 'BUILDING',
          resourceConstant: 'HPD_COMPLAINT',
          resourceModel: resourceModels['HPD_COMPLAINT'],
        }),
    bin
      ? newBuildingRequest({
          type: 'LOOKUP_FILTER',
          bin: bin,
          level: 'BUILDING',
          resourceConstant: 'HPD_VIOLATION',
          resourceModel: resourceModels['HPD_VIOLATION'],
        })
      : newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          level: 'BUILDING',
          resourceConstant: 'HPD_VIOLATION',
          resourceModel: resourceModels['HPD_VIOLATION'],
        }),
    bin
      ? newBuildingRequest({
          type: 'LOOKUP_FILTER',
          bin: bin,
          level: 'BUILDING',
          resourceConstant: 'DOB_COMPLAINT',
          resourceModel: resourceModels['DOB_COMPLAINT'],
        })
      : newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          level: 'BUILDING',
          resourceConstant: 'DOB_COMPLAINT',
          resourceModel: resourceModels['DOB_COMPLAINT'],
        }),
    bin
      ? newBuildingRequest({
          type: 'LOOKUP_FILTER',
          bin: bin,
          level: 'BUILDING',
          resourceConstant: 'DOB_VIOLATION',
          resourceModel: resourceModels['DOB_VIOLATION'],
        })
      : newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          level: 'BUILDING',
          resourceConstant: 'DOB_VIOLATION',
          resourceModel: resourceModels['DOB_VIOLATION'],
        }),

    bin
      ? newBuildingRequest({
          type: 'LOOKUP_FILTER',
          bin: bin,
          level: 'BUILDING',
          resourceConstant: 'ECB_VIOLATION',
          resourceModel: resourceModels['ECB_VIOLATION'],
        })
      : newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          level: 'BUILDING',
          resourceConstant: 'ECB_VIOLATION',
          resourceModel: resourceModels['ECB_VIOLATION'],
        }),
    bin
      ? newBuildingRequest({
          type: 'LOOKUP_FILTER',
          bin: bin,
          level: 'BUILDING',
          resourceConstant: 'DOB_FILED_PERMIT',
          resourceModel: resourceModels['DOB_FILED_PERMIT'],
        })
      : newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          level: 'BUILDING',
          resourceConstant: 'DOB_FILED_PERMIT',
          resourceModel: resourceModels['DOB_FILED_PERMIT'],
        }),
    bin
      ? newBuildingRequest({
          type: 'LOOKUP_FILTER',
          bin: bin,
          level: 'BUILDING',
          resourceConstant: 'DOB_ISSUED_PERMIT',
          resourceModel: resourceModels['DOB_ISSUED_PERMIT'],
        })
      : newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          level: 'BUILDING',
          resourceConstant: 'DOB_ISSUED_PERMIT',
          resourceModel: resourceModels['DOB_ISSUED_PERMIT'],
        }),

    bin
      ? newBuildingRequest({
          type: 'LOOKUP_FILTER',
          bin: bin,
          level: 'BUILDING',
          resourceConstant: 'HOUSING_LITIGATION',
          resourceModel: resourceModels['HOUSING_LITIGATION'],
        })
      : newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          level: 'BUILDING',
          resourceConstant: 'HOUSING_LITIGATION',
          resourceModel: resourceModels['HOUSING_LITIGATION'],
        }),
    newPropertyRequest({
      type: 'LOOKUP_FILTER',
      bbl: bbl,
      level: 'PROPERTY',
      resourceConstant: 'FORECLOSURE',
      resourceModel: resourceModels['FORECLOSURE'],
      datasetModelName: constantToModelName('FORECLOSURE'),
      isAuthenticated: true,
    }),
  ].filter(r => !!r)
}

export const newGeographyHousingTypeRequest = ({
  type = undefined,
  geographyType = undefined,
  geographyId,
  resourceModel,
  paramValue = undefined,
  isAuthenticated = false,
} = {}) => {
  return new DataRequest({
    type: type,
    resourceModel,
    isAuthenticated,
    requestConstant: `${type}_${paramValue.toUpperCase()}`,
    apiMaps: [
      new ApiMap({ constant: geographyType, resourceId: geographyId }),
      new ApiMap({ constant: 'PROPERTY', name: `${housingTypeCodeToName(paramValue)}` }),
    ],
    paramMaps: [
      new ParamMap({
        resourceModel,
        type: 'TEXT',
        field: 'summary',
        comparison: '',
        value: true,
      }),
      new ParamMap({
        resourceModel,
        type: 'TEXT',
        field: 'summary-type',
        comparison: '',
        value: 'short-annotated',
      }),
      new ParamMap({
        resourceModel,
        type: 'DATE',
        field: 'annotation__start',
        comparison: '',
        value: c.DISTRICT_REQUEST_DATE_FULL,
      }),
      new ParamMap({
        type: 'TEXT',
        field: 'unitsres',
        comparison: 'gte',
        value: 1,
      }),
    ],
    tableConfig: new TableConfig({ resourceConstant: 'PROPERTY' }),
  })
}

export const newMapRequests = ({ geographyType, geographyId, resourceModels } = {}) => {
  return [
    newGeographyHousingTypeRequest({
      isAuthenticated: true,
      type: 'GEOGRAPHY_HOUSING_TYPE',
      geographyType,
      geographyId,
      resourceModel: resourceModels['PROPERTY'],
      paramValue: 'all',
    }),
  ]
}

export const generateResultFilter = ({ resourceModel, value = 5 } = {}) => {
  return new AnnotatedResultFilter({
    resourceModel,
    fieldName: resourceModel.urlPath,
    comparison: 'gte',
    value: value,
    annotationStart: c.DISTRICT_REQUEST_DATE_ONE,
  })
}

export const newMapResultFilters = ({ resourceModels } = {}) => {
  return [
    generateResultFilter({
      resourceModel: resourceModels['ACRIS_REAL_MASTER'],
      value: 1,
    }),
    generateResultFilter({ resourceModel: resourceModels['HPD_COMPLAINT'], value: 5 }),
    generateResultFilter({ resourceModel: resourceModels['DOB_COMPLAINT'], value: 2 }),
    generateResultFilter({
      resourceModel: resourceModels['FORECLOSURE'],
      value: 1,
    }),
    generateResultFilter({ resourceModel: resourceModels['HPD_VIOLATION'], value: 10 }),
    generateResultFilter({
      resourceModel: resourceModels['DOB_FILED_PERMIT'],
      value: 1,
    }),
  ]
}

export const newAdvancedSearchRequest = ({ geographyType, geographyId, advancedSearch, resourceModels } = {}) => {
  const paramMaps = getUrlFormattedParamMaps(advancedSearch)
  return new DataRequest({
    isAuthenticated: true,
    type: c.ADVANCED_SEARCH,
    resourceModel: resourceModels['PROPERTY'],
    resourceConstant: 'PROPERTY_ADVANCED_SEARCH',
    apiMaps: [
      new ApiMap({ constant: geographyType, resourceId: geographyId }),
      new ApiMap({ constant: 'PROPERTY', name: 'Custom Search' }),
    ],
    paramMaps: paramMaps,
    tableConfig: new TableConfig({ resourceConstant: 'PROPERTY' }),
  })
}

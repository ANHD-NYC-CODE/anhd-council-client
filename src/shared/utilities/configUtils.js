import * as resources from 'shared/models/resources'
import DataRequest from 'shared/classes/DataRequest'
import { getApiMap } from 'shared/utilities/classUtils'
import TableConfig from 'shared/classes/TableConfig'
import ApiMap from 'shared/classes/ApiMap'
import ParamMap from 'shared/classes/ParamMap'
import Resource from 'shared/classes/Resource'
import { housingTypeCodeToName } from 'shared/utilities/languageUtils'
import { constantToModelName } from 'shared/utilities/filterUtils'
import { districtDashboardFilterdates } from 'shared/utilities/componentUtils'

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
  resourceConstant = undefined,
  resourceModel,
  datasetModelName = undefined,
}) => {
  return new DataRequest({
    type: type,
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
  resourceConstant = undefined,
  datasetModelName = undefined,
  resourceModel,
  tableComponent = undefined,
} = {}) => {
  // WARNING: Do not change the summary request path or params without
  // simultaneously updating the backend app's core/utils/cache.py
  // caching script. The script caches based on URL, and if it's not updated,
  // These summary payloads can take up to a minute to deliver
  // in geographies with +10000 properties.
  return new DataRequest({
    type: type,
    resourceModel,
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
      tableComponent: LookupProfileSummary,
      resourceModel: resourceModels['PROPERTY'],
    }),
    !bin
      ? newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          resourceConstant: 'ACRIS_REAL_MASTER',
          resourceModel: resourceModels['ACRIS_REAL_MASTER'],
        })
      : null,
    !bin
      ? newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          resourceConstant: 'EVICTION',
          resourceModel: resourceModels['EVICTION'],
        })
      : null,
    !bin
      ? newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          resourceConstant: 'LISPENDEN',
          resourceModel: resourceModels['LISPENDEN'],
          datasetModelName: constantToModelName('LISPENDEN'),
        })
      : null,
    bin
      ? newBuildingRequest({
          type: 'LOOKUP_FILTER',
          bin: bin,
          resourceConstant: 'HPD_COMPLAINT',
          resourceModel: resourceModels['HPD_COMPLAINT'],
        })
      : newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          resourceConstant: 'HPD_COMPLAINT',
          resourceModel: resourceModels['HPD_COMPLAINT'],
        }),
    bin
      ? newBuildingRequest({
          type: 'LOOKUP_FILTER',
          bin: bin,
          resourceConstant: 'HPD_VIOLATION',
          resourceModel: resourceModels['HPD_VIOLATION'],
        })
      : newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          resourceConstant: 'HPD_VIOLATION',
          resourceModel: resourceModels['HPD_VIOLATION'],
        }),
    bin
      ? newBuildingRequest({
          type: 'LOOKUP_FILTER',
          bin: bin,
          resourceConstant: 'DOB_COMPLAINT',
          resourceModel: resourceModels['DOB_COMPLAINT'],
        })
      : newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          resourceConstant: 'DOB_COMPLAINT',
          resourceModel: resourceModels['DOB_COMPLAINT'],
        }),
    bin
      ? newBuildingRequest({
          type: 'LOOKUP_FILTER',
          bin: bin,
          resourceConstant: 'DOB_VIOLATION',
          resourceModel: resourceModels['DOB_VIOLATION'],
        })
      : newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          resourceConstant: 'DOB_VIOLATION',
          resourceModel: resourceModels['DOB_VIOLATION'],
        }),

    bin
      ? newBuildingRequest({
          type: 'LOOKUP_FILTER',
          bin: bin,
          resourceConstant: 'ECB_VIOLATION',
          resourceModel: resourceModels['ECB_VIOLATION'],
        })
      : newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          resourceConstant: 'ECB_VIOLATION',
          resourceModel: resourceModels['ECB_VIOLATION'],
        }),
    bin
      ? newBuildingRequest({
          type: 'LOOKUP_FILTER',
          bin: bin,
          resourceConstant: 'DOB_FILED_PERMIT',
          resourceModel: resourceModels['DOB_FILED_PERMIT'],
        })
      : newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          resourceConstant: 'DOB_FILED_PERMIT',
          resourceModel: resourceModels['DOB_FILED_PERMIT'],
        }),
    bin
      ? newBuildingRequest({
          type: 'LOOKUP_FILTER',
          bin: bin,
          resourceConstant: 'DOB_ISSUED_PERMIT',
          resourceModel: resourceModels['DOB_ISSUED_PERMIT'],
        })
      : newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          resourceConstant: 'DOB_ISSUED_PERMIT',
          resourceModel: resourceModels['DOB_ISSUED_PERMIT'],
        }),

    bin
      ? newBuildingRequest({
          type: 'LOOKUP_FILTER',
          bin: bin,
          resourceConstant: 'HOUSING_LITIGATION',
          resourceModel: resourceModels['HOUSING_LITIGATION'],
        })
      : newPropertyRequest({
          type: 'LOOKUP_FILTER',
          bbl: bbl,
          resourceConstant: 'HOUSING_LITIGATION',
          resourceModel: resourceModels['HOUSING_LITIGATION'],
        }),
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
      new ParamMap({
        resourceConstant,
        resourceModel,
        type: 'AMOUNT',
        field: resourceModel.urlPath,
        comparison: 'gte',
        value: defaultValue,
      }),
      new ParamMap({
        resourceConstant,
        resourceModel,
        type: 'DATE',
        field: `${resourceModel.urlPath}__start`,
        comparison: '',
        value: districtDashboardFilterdates()[0],
      }),
      new ParamMap({
        resourceModel,
        type: 'TEXT',
        field: 'summary',
        comparison: '',
        value: true,
      }),
      new ParamMap({
        type: 'TEXT',
        field: 'unitsres',
        comparison: 'gte',
        value: 1,
      }),
      new ParamMap({
        resourceModel,
        type: 'TEXT',
        field: 'summary-type',
        comparison: '',
        value: 'short',
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
        value: 'short',
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
      resourceModel: resourceModels['DOB_FILED_PERMIT'],
      defaultValue: 1,
    }),
    newGeographyRequest({
      type: 'MAP_FILTER',
      geographyType,
      geographyId,
      resourceModel: resourceModels['ACRIS_REAL_MASTER'],
      defaultValue: 1,
    }),
  ]
}

export const newAdvancedSearchRequest = ({ geographyType, geographyId, advancedSearch, resourceModels } = {}) => {
  const paramMaps = getUrlFormattedParamMaps(advancedSearch)
  return new DataRequest({
    type: 'ADVANCED_SEARCH',
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

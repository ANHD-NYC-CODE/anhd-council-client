import * as resources from 'shared/models/resources'
import * as c from 'shared/constants'
import DataRequest from 'shared/classes/DataRequest'
import ResultAmountFilter from 'shared/classes/ResultAmountFilter'
import { getApiMap } from 'shared/utilities/classUtils'
import TableConfig from 'shared/classes/TableConfig'
import ApiMap from 'shared/classes/ApiMap'
import ParamMap from 'shared/classes/ParamMap'
import Resource from 'shared/classes/Resource'
import { housingTypeCodeToName } from 'shared/utilities/languageUtils'
import { constantToModelName } from 'shared/utilities/filterUtils'
import moment from 'moment'
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
        value: c.DISTRICT_RESULTS_DATE_ONE,
      }),
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
        value: c.DISTRICT_RESULTS_DATE_ONE,
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
        value: 'short-annotated',
      }),
      new ParamMap({
        resourceModel,
        type: 'DATE',
        field: 'annotation__start',
        comparison: '',
        value: c.DISTRICT_RESULTS_DATE_ONE,
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
      type: 'GEOGRAPHY_HOUSING_TYPE',
      geographyType,
      geographyId,
      resourceModel: resourceModels['PROPERTY'],
      paramValue: 'all',
    }),
    // newGeographyRequest({
    //   type: 'MAP_FILTER',
    //   geographyType,
    //   geographyId,
    //   resourceModel: resourceModels['HPD_VIOLATION'],
    //   defaultValue: 10,
    // }),
    // newGeographyRequest({
    //   type: 'MAP_FILTER',
    //   geographyType,
    //   geographyId,
    //   resourceModel: resourceModels['DOB_COMPLAINT'],
    //   defaultValue: 2,
    // }),
    // newGeographyRequest({
    //   type: 'MAP_FILTER',
    //   geographyType,
    //   geographyId,
    //   resourceModel: resourceModels['HPD_COMPLAINT'],
    //   defaultValue: 5,
    // }),
    //
    // newGeographyRequest({
    //   type: 'MAP_FILTER',
    //   geographyType,
    //   geographyId,
    //   resourceModel: resourceModels['DOB_FILED_PERMIT'],
    //   defaultValue: 1,
    // }),
    // newGeographyRequest({
    //   type: 'MAP_FILTER',
    //   geographyType,
    //   geographyId,
    //   resourceModel: resourceModels['ACRIS_REAL_MASTER'],
    //   defaultValue: 1,
    // }),
  ]
}

export const generateResultFilter = ({
  resourceModel,
  annotationStart,
  annotationEnd = moment(moment.now()).format('MM/DD/YYYY'),
  value = 5,
} = {}) => {
  const field = `${resourceModel.urlPath}__${annotationStart}-${annotationEnd}`

  return new ResultAmountFilter({ resourceModel, field, comparison: 'gte', value: value })
}

export const newMapResultFilters = ({ resourceModels, annotationStart, annotationEnd } = {}) => {
  return [
    generateResultFilter({ resourceModel: resourceModels['HPD_VIOLATION'], value: 10, annotationStart, annotationEnd }),
    generateResultFilter({ resourceModel: resourceModels['DOB_COMPLAINT'], value: 2, annotationStart, annotationEnd }),
    generateResultFilter({ resourceModel: resourceModels['HPD_COMPLAINT'], value: 5, annotationStart, annotationEnd }),
    generateResultFilter({
      resourceModel: resourceModels['DOB_FILED_PERMIT'],
      value: 1,
      annotationStart,
      annotationEnd,
    }),
    generateResultFilter({
      resourceModel: resourceModels['ACRIS_REAL_MASTER'],
      value: 1,
      annotationStart,
      annotationEnd,
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

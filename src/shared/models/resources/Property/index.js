import * as resources from 'shared/models/resources'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
const Property = databaseObject => {
  return {
    resourceConstant: 'PROPERTY',
    urlPath: 'properties',
    label: 'Properties',
    sentenceNoun: 'properties',
    ownResultFilters: [
      {
        id: 'HOUSING_TYPE_RESIDENTIAL',
        category: 'HOUSING_TYPE',
        label: 'Residential Properties',
        paramMaps: [new ParameterMapping({ field: 'unitsres', comparison: 'gte', value: 1 })],
        internalFilter: (results, paramMaps) => {
          if (!results) return []
          return results.filter(result => paramMaps.some(paramMap => paramMap.evaluate(result)))
        },
      },
      {
        id: 'HOUSING_TYPE_RENT_STABILIZED',
        category: 'HOUSING_TYPE',
        label: 'Rent Stabilized',
        paramMaps: [
          new ParameterMapping({ field: 'rentstabilizationrecord', comparison: 'bool', value: true }),
          new ParameterMapping({ field: 'unitsrentstabilized', comparison: 'bool', value: true }),
          new ParameterMapping({ field: 'unitsres', comparison: 'gte', value: 6 }),
          new ParameterMapping({ field: 'yearbuilt', comparison: 'lte', value: 1974 }),
          new ParameterMapping({ field: 'yearbuilt', comparison: 'gte', value: 1 }),
        ],
        internalFilter: (results, paramMaps) => {
          if (!results) return []
          return results.filter(result => paramMaps.every(paramMap => paramMap.evaluate(result)))
        },
      },
      {
        id: 'HOUSING_TYPE_SUBSIDIZED_HOUSING',
        category: 'HOUSING_TYPE',
        label: 'Subsidized Housing',
        paramMaps: [
          new ParameterMapping({ field: 'subsidyrecords', comparison: 'bool', value: true }),
          new ParameterMapping({ field: 'subsidyj51records', comparison: 'bool', value: true }),
          new ParameterMapping({ field: 'subsidy421arecords', comparison: 'bool', value: true }),
        ],
        internalFilter: (results, paramMaps) => {
          if (!results) return []
          return results.filter(result => paramMaps.some(paramMap => paramMap.evaluate(result)))
        },
      },
      {
        id: 'HOUSING_TYPE_SMALL_HOMES',
        category: 'HOUSING_TYPE',
        label: 'Small Homes',
        paramMaps: [
          new ParameterMapping({ field: 'unitsres', comparison: 'gte', value: 1 }),
          new ParameterMapping({ field: 'unitsres', comparison: 'lte', value: 4 }),
          new ParameterMapping({ field: 'unitsrentstabilized', comparison: 'bool', value: false }),
        ],
        internalFilter: (results, paramMaps) =>
          results.filter(result => paramMaps.every(paramMap => paramMap.evaluate(result))),
      },
      {
        id: 'HOUSING_TYPE_MARKET_RATE',
        category: 'HOUSING_TYPE',
        label: 'Market Rate',
        paramMaps: [
          new ParameterMapping({ field: 'unitsres', comparison: 'gte', value: 1 }),
          new ParameterMapping({ field: 'nycha', comparison: 'bool', value: false }),
          new ParameterMapping({ field: 'unitsrentstabilized', comparison: 'bool', value: false }),
          new ParameterMapping({ field: 'subsidyrecords', comparison: 'bool', value: false }),
          new ParameterMapping({ field: 'subsidyj51records', comparison: 'bool', value: false }),
          new ParameterMapping({ field: 'subsidy421arecords', comparison: 'bool', value: false }),
        ],
        internalFilter: (results, paramMaps) => {
          if (!results) return []
          return results.filter(result => paramMaps.every(paramMap => paramMap.evaluate(result)))
        },
      },

      {
        id: 'HOUSING_TYPE_PUBLIC_HOUSING',
        category: 'HOUSING_TYPE',
        label: 'Public Housing',
        paramMaps: [new ParameterMapping({ field: 'nycha', comparison: 'bool', value: true })],
        internalFilter: (results, paramMaps) =>
          results.filter(result => paramMaps.every(paramMap => paramMap.evaluate(result))),
      },
    ],

    ownResourceFilters: [],
    relatedResources: Object.keys(resources).filter(key => key !== 'PROPERTY' && key !== 'ACRIS_REAL_MASTER'),
  }
}

export default Property

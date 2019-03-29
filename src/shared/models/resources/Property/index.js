import * as resources from 'shared/models/resources'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
const Property = databaseObject => {
  return {
    resourceConstant: 'PROPERTY',
    ownResultFilters: [
      {
        category: 'HOUSING_TYPE',
        label: 'Rent Stabilized',
        infoKey: 'HOUSING_TYPE_RENT_STABILIZED',
        paramMaps: [
          new ParameterMapping({ field: 'rentstabilizationrecord', comparison: 'bool', value: true }),
          new ParameterMapping({ field: 'unitsres', comparison: 'gte', value: 1 }),
          new ParameterMapping({ field: 'unitsres', comparison: 'lte', value: 6 }),
          new ParameterMapping({ field: 'yearbuilt', comparison: 'lte', value: 1974 }),
          new ParameterMapping({ field: 'yearbuilt', comparison: 'gte', value: 1 }),
        ],
        internalFilter: (results, paramMaps) =>
          results.filter(result => paramMaps.every(paramMap => paramMap.evaluate(result))),
      },
      {
        category: 'HOUSING_TYPE',
        label: 'Subsidized Housing',
        infoKey: 'HOUSING_TYPE_SUBSIDIZED_HOUSING',
        paramMaps: [
          new ParameterMapping({ field: 'subsidyrecords', comparison: 'bool', value: true }),
          new ParameterMapping({ field: 'subsidyj51records', comparison: 'bool', value: true }),
          new ParameterMapping({ field: 'subsidy421arecords', comparison: 'bool', value: true }),
        ],
        internalFilter: (results, paramMaps) => {
          return results.filter(result => paramMaps.some(paramMap => paramMap.evaluate(result)))
        },
      },
      {
        category: 'HOUSING_TYPE',
        label: 'Small Homes',
        infoKey: 'HOUSING_TYPE_SMALL_HOMES',
        paramMaps: [
          new ParameterMapping({ field: 'unitsres', comparison: 'gte', value: 1 }),
          new ParameterMapping({ field: 'unitsres', comparison: 'lte', value: 6 }),
        ],
        internalFilter: (results, paramMaps) =>
          results.filter(result => paramMaps.every(paramMap => paramMap.evaluate(result))),
      },
      {
        category: 'HOUSING_TYPE',
        label: 'Market Rate',
        infoKey: 'HOUSING_TYPE_MARKET_RATE',
        paramMaps: [
          new ParameterMapping({ field: 'unitsres', comparison: 'gte', value: 1 }),
          new ParameterMapping({ field: 'nycha', comparison: 'bool', value: false }),
          new ParameterMapping({ field: 'rentstabilizationrecord', comparison: 'bool', value: false }),
          new ParameterMapping({ field: 'subsidyrecords', comparison: 'bool', value: false }),
          new ParameterMapping({ field: 'subsidyj51records', comparison: 'bool', value: false }),
          new ParameterMapping({ field: 'subsidy421arecords', comparison: 'bool', value: false }),
        ],
        internalFilter: (results, paramMaps) =>
          results.filter(result => paramMaps.every(paramMap => paramMap.evaluate(result))),
      },

      {
        category: 'HOUSING_TYPE',
        label: 'Public Housing',
        infoKey: 'HOUSING_TYPE_PUBLIC_HOUSING',
        paramMaps: [new ParameterMapping({ field: 'nycha', comparison: 'bool', value: true })],
        internalFilter: (results, paramMaps) =>
          results.filter(result => paramMaps.every(paramMap => paramMap.evaluate(result))),
      },
    ],

    ownResourceFilters: [],
    relatedResources: Object.keys(resources).filter(key => key !== 'PROPERTY'),
  }
}

export default Property

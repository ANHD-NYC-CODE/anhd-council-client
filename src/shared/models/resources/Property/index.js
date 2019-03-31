import ParamMap from 'shared/classes/ParamMap'
import { comparisonOptions, constructSingleMapParamSet } from 'shared/utilities/filterUtils'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'

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
        paramMaps: [new ParamMap({ field: 'unitsres', comparison: 'gte', value: 1 })],
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
          new ParamMap({ field: 'rentstabilizationrecord', comparison: 'bool', value: true }),
          new ParamMap({ field: 'unitsrentstabilized', comparison: 'bool', value: true }),
          new ParamMap({ field: 'unitsres', comparison: 'gte', value: 6 }),
          new ParamMap({ field: 'yearbuilt', comparison: 'lte', value: 1974 }),
          new ParamMap({ field: 'yearbuilt', comparison: 'gte', value: 1 }),
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
          new ParamMap({ field: 'subsidyrecords', comparison: 'bool', value: true }),
          new ParamMap({ field: 'subsidyj51records', comparison: 'bool', value: true }),
          new ParamMap({ field: 'subsidy421arecords', comparison: 'bool', value: true }),
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
          new ParamMap({ field: 'unitsres', comparison: 'gte', value: 1 }),
          new ParamMap({ field: 'unitsres', comparison: 'lte', value: 4 }),
          new ParamMap({ field: 'unitsrentstabilized', comparison: 'bool', value: false }),
        ],
        internalFilter: (results, paramMaps) =>
          results.filter(result => paramMaps.every(paramMap => paramMap.evaluate(result))),
      },
      {
        id: 'HOUSING_TYPE_MARKET_RATE',
        category: 'HOUSING_TYPE',
        label: 'Market Rate',
        paramMaps: [
          new ParamMap({ field: 'unitsres', comparison: 'gte', value: 1 }),
          new ParamMap({ field: 'nycha', comparison: 'bool', value: false }),
          new ParamMap({ field: 'unitsrentstabilized', comparison: 'bool', value: false }),
          new ParamMap({ field: 'subsidyrecords', comparison: 'bool', value: false }),
          new ParamMap({ field: 'subsidyj51records', comparison: 'bool', value: false }),
          new ParamMap({ field: 'subsidy421arecords', comparison: 'bool', value: false }),
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
        paramMaps: [new ParamMap({ field: 'nycha', comparison: 'bool', value: true })],
        internalFilter: (results, paramMaps) =>
          results.filter(result => paramMaps.every(paramMap => paramMap.evaluate(result))),
      },
    ],

    ownResourceFilters: {
      initial: {
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            component: GenericFieldSet,
            baseComponent: TextSelectField,
            paramSetLabel: 'Housing Type',
            paramMapField: 'housingtype',
            paramMapValue: 'all',

            defaultOptions: comparisonOptions({
              name: 'value',
              comparisonValues: ['all', 'rs', 'rr', 'sh', 'mr', 'ph'],
              labels: ['All', 'Rent Stabilized', 'Subsidized Housing', 'Small Homes', 'Market Rate', 'Public Housing'],
            }),
          })
        },
      },
    },
    relatedResourceMappings: {
      ACRIS_REAL_MASTER: 'acrisreallegals__documentid',
      PROPERTY_SALE_BY_AMOUNT: 'acrisreallegals__documentid',
      PROPERTY_SALE_BY_COUNT: 'acrisreallegals__documentid',
      DOB_COMPLAINT: 'dobcomplaints',
      DOB_FILED_PERMIT: 'doblegacyfiledpermits',
      DOB_ISSUED_PERMIT: 'dobissuedpermits',
      DOB_VIOLATION: 'dobviolations',
      ECB_VIOLATION: 'ecbviolations',
      EVICTION: 'evictions',
      HOUSING_LITIGATION: 'housinglitigations',
      HPD_COMPLAINT: 'hpdcomplaints',
      HPD_VIOLATION: 'hpdviolations',
      LISPENDEN: 'lispendens',
    },
  }
}

export default Property

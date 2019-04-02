import ParamMap from 'shared/classes/ParamMap'
import {
  comparisonOptions,
  dateComparisonOptions,
  constructCountDateParamSet,
  constructSingleMapParamSet,
  constructDateRangeParamSet,
  amountComparisonOptions,
  rentRegulatedProgramOptions,
} from 'shared/utilities/filterUtils'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'
import MultiSelectField from 'AdvancedSearch/FilterComponent/Field/MultiSelectField'

import ComparisonFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/ComparisonFieldSet'

const Property = databaseObject => {
  return {
    resourceConstant: 'PROPERTY',
    urlPath: 'properties',
    label: 'Properties',
    sentenceNoun: 'properties',
    filterParamSets: paramSets => {
      if (!paramSets['initial'] || !paramSets['initial'].paramMaps.length) return paramSets
      switch (paramSets['initial'].paramMaps[0].value) {
        case 'rs':
          return Object.keys(paramSets)
            .filter(key => !key.match(/(housingType)/))
            .concat('housingType_rs')
            .filter(p => p)
            .reduce((ps, key) => ((ps[key] = paramSets[key]), ps), {})
        case 'rr':
          return Object.keys(paramSets)
            .filter(key => !key.match(/(housingType)/))
            .concat('housingType_rr_1', 'housingType_rr_2')
            .filter(p => p)
            .reduce((ps, key) => ((ps[key] = paramSets[key]), ps), {})
        case 'sh':
          return Object.keys(paramSets)
            .filter(key => !key.match(/(housingType)/))
            .concat('housingType_sh')
            .filter(p => p)
            .reduce((ps, key) => ((ps[key] = paramSets[key]), ps), {})
        default:
          return Object.keys(paramSets)
            .filter(key => !key.match(/(housingType)/))
            .reduce((ps, key) => ((ps[key] = paramSets[key]), ps), {})
      }
    },
    ownResultFilters: [
      {
        id: 'HOUSING_TYPE_RESIDENTIAL',
        category: 'HOUSING_TYPE',
        label: 'All Residential',
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
            paramMapType: 'SINGLE-TEXT',
            paramMapRole: 'PRIMARY',
            paramSetLabel: 'Housing Type',
            paramMapField: 'housingtype',
            paramMapValue: 'all',
            paramNoun: 'properties',
            defaultOptions: comparisonOptions({
              name: 'value',
              comparisonValues: ['all', 'rs', 'rr', 'sh', 'mr', 'ph'],
              labels: ['All', 'Rent Stabilized', 'Subsidized Housing', 'Small Homes', 'Market Rate', 'Public Housing'],
            }),
          })
        },
      },
      housingType_rs: {
        generatorFunction: (resourceModel, relatedResourceModel = undefined) => {
          return constructCountDateParamSet({
            resourceModel,
            paramSetLabel: 'Units lost',
            amountComponent: ComparisonFieldSet,
            amountType: 'PERCENT',
            amountRole: 'MODIFIER',
            amountParamNoun: 'units lost',
            amountValueSuffix: '%',
            amountField: 'rsunitslost',
            amountValue: '25',
            amountValidations: {
              min: 0,
              max: 100,
            },
            dateType: 'YEAR',
            dateRole: 'MODIFIER',
            dateField: 'rsunitslost',
            dateLowComparison: 'start',
            dateHighComparison: 'end',
            dateLowValue: 2010,
            dateHighValue: 2017,
            dateComparisonOptions: dateComparisonOptions({
              comparisonValues: ['start', 'between'],
              labels: ['After', 'Range'],
              type: 'DATE',
              rangeKey: 'rsUnitsRange',
            }),
            dateValidations: {
              min: 2007,
              max: (relatedResourceModel || {}).version,
            },
          })
        },
      },
      housingType_rr_1: {
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            paramSetLabel: 'Program',
            component: GenericFieldSet,
            baseComponent: MultiSelectField,
            defaultOptions: rentRegulatedProgramOptions(),
            paramMapType: 'MULTI-TEXT',
            paramNoun: 'programs(s)',
            paramMapField: 'coresubsidyrecord__programname',
            paramMapComparison: 'any',
            paramMapValue: '',
          })
        },
      },
      housingType_rr_2: {
        generatorFunction: resourceModel => {
          return constructDateRangeParamSet({
            resourceModel,
            paramSetLabel: 'Expiration',
            dateType: 'DATE',
            dateRole: 'MODIFIER',
            comparisonPrefix: 'expiring',
            dateField: 'coresubsidyrecord__enddate',
          })
        },
      },
      housingType_sh: {
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            paramSetLabel: 'Residential Units',
            paramMapField: 'unitsres',
            paramMapValue: '4',
            paramMapComparison: 'lte',
            paramNoun: 'units',
            defaultOptions: amountComparisonOptions({
              comparisonValues: ['lte', 'exact'],
              labels: ['At most', 'Exactly'],
            }),
            validations: {
              min: 1,
              max: 6,
            },
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

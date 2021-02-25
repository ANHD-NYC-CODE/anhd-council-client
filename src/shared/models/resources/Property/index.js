import ParamMap from 'shared/classes/ParamMap'
import * as c from 'shared/constants'

import {
  comparisonOptions,
  rangeComparisonOptions,
  constructCountDateParamSet,
  constructSingleMapParamSet,
  constructDateRangeParamSet,
  rentRegulatedProgramOptions,
} from 'shared/utilities/filterUtils'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'
import MultiSelectField from 'AdvancedSearch/FilterComponent/Field/MultiSelectField'

import ComparisonFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/ComparisonFieldSet'

const Property = () => {
  return {
    resourceConstant: 'PROPERTY',
    urlPath: 'properties',
    label: 'Properties',
    sentenceNoun: 'properties',
    filterParamSets: paramSets => {
      if (!paramSets['initial'] || !paramSets['initial'].paramMaps.length) return paramSets
      switch (paramSets['initial'].paramMaps[0].value) {
        case 'all':
          return Object.keys(paramSets)
            .filter(key => !key.match(/(housingType)/))
            .concat('housingType_all_1', 'housingType_all_sro', 'housingType_all_7a')
            .filter(p => p)
            .reduce((ps, key) => ((ps[key] = paramSets[key]), ps), {})
        case 'rs':
          return Object.keys(paramSets)
            .filter(key => !key.match(/(housingType)/))
            .concat('housingType_rs_1', 'housingType_rs_2', 'housingType_rs_sro', 'housingType_rs_7a')
            .filter(p => p)
            .reduce((ps, key) => ((ps[key] = paramSets[key]), ps), {})
        case 'rr':
          return Object.keys(paramSets)
            .filter(key => !key.match(/(housingType)/))
            .concat('housingType_rr_1', 'housingType_rr_2', 'housingType_rr_3', 'housingType_rr_sro')
            .filter(p => p)
            .reduce((ps, key) => ((ps[key] = paramSets[key]), ps), {})
        case 'sh':
          return Object.keys(paramSets)
            .filter(key => !key.match(/(housingType)/))
            .concat('housingType_sh', 'housingType_sh_sro')
            .filter(p => p)
            .reduce((ps, key) => ((ps[key] = paramSets[key]), ps), {})
        case 'mr':
          return Object.keys(paramSets)
            .filter(key => !key.match(/(housingType)/))
            .concat('housingType_mr', 'housingType_mr_sro')
            .filter(p => p)
            .reduce((ps, key) => ((ps[key] = paramSets[key]), ps), {})
        case 'ph':
          return Object.keys(paramSets)
            .filter(key => !key.match(/(housingType)/))
            .concat('housingType_ph', 'housingType_ph_sro')
            .filter(p => p)
            .reduce((ps, key) => ((ps[key] = paramSets[key]), ps), {})
        default:
          return Object.keys(paramSets)
            .filter(key => !key.match(/(housingType)/))
            .reduce((ps, key) => ((ps[key] = paramSets[key]), ps), {})
      }
    },
    // Used on district dashboard filters
    ownResultFilters: [
      {
        id: c.HOUSING_TYPE_RESIDENTIAL,
        category: 'HOUSING_TYPE',
        label: 'All Residential Housing',
        paramMaps: [new ParamMap({ field: 'unitsres', comparison: 'gte', value: 1 })],
        internalFilter: (results, paramMaps) => {
          if (!results) return []
          return results.filter(result => paramMaps.some(paramMap => paramMap.evaluate(result)))
        },
      },
      {
        id: c.HOUSING_TYPE_RENT_STABILIZED,
        category: 'HOUSING_TYPE',
        label: 'Rent Stabilized',
        paramMaps: [new ParamMap({ field: 'unitsrentstabilized', comparison: 'bool', value: true })],
        internalFilter: (results, paramMaps) => {
          if (!results) return []
          return results.filter(result => paramMaps.every(paramMap => paramMap.evaluate(result)))
        },
      },
      {
        id: c.HOUSING_TYPE_SUBSIDIZED_HOUSING,
        category: 'HOUSING_TYPE',
        label: 'Subsidized Housing',
        paramMaps: [
          new ParamMap({ field: 'subsidyprograms', comparison: 'bool', value: true }),
          new ParamMap({ field: 'subsidyj51', comparison: 'bool', value: true }),
          new ParamMap({ field: 'subsidy421a', comparison: 'bool', value: true }),
        ],
        internalFilter: (results, paramMaps) => {
          if (!results) return []
          return results.filter(result => paramMaps.some(paramMap => paramMap.evaluate(result)))
        },
      },
      {
        id: c.HOUSING_TYPE_SMALL_HOME,
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
        id: c.HOUSING_TYPE_MARKET_RATE,
        category: 'HOUSING_TYPE',
        label: 'Market Rate',
        paramMaps: [
          new ParamMap({ field: 'unitsres', comparison: 'gte', value: 1 }),
          new ParamMap({ field: 'nycha', comparison: 'bool', value: false }),
          new ParamMap({ field: 'unitsrentstabilized', comparison: 'bool', value: false }),
          new ParamMap({ field: 'subsidyprograms', comparison: 'bool', value: false }),
          new ParamMap({ field: 'subsidyj51', comparison: 'bool', value: false }),
          new ParamMap({ field: 'subsidy421a', comparison: 'bool', value: false }),
        ],
        internalFilter: (results, paramMaps) => {
          if (!results) return []
          return results.filter(result => paramMaps.every(paramMap => paramMap.evaluate(result)))
        },
      },
      {
        id: c.HOUSING_TYPE_PUBLIC_HOUSING,
        category: 'HOUSING_TYPE',
        label: 'Public Housing',
        paramMaps: [new ParamMap({ field: 'nycha', comparison: 'bool', value: true })],
        internalFilter: (results, paramMaps) =>
          results.filter(result => paramMaps.every(paramMap => paramMap.evaluate(result))),
      },
    ],
    // Used on Custom Search
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
              labels: ['All', 'Rent Stabilized', 'Subsidized Housing', 'Small Home', 'Market Rate', 'Public Housing'],
            }),
          })
        },
      },

      housingType_all_1: {
        // residential units
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            paramSetLabel: 'Residential Units',
            paramMapField: 'unitsres',
            paramMapRole: 'MODIFIER',
            lowValue: '1',
            highValue: '5',
            paramMapComparison: 'lte',
            paramNoun: 'units',
            validations: {
              min: 1,
            },
          })
        },
      },
      housingType_all_sro: {
        // SRO units
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            component: GenericFieldSet,
            baseComponent: TextSelectField,
            paramSetLabel: 'SRO Units',
            paramMapType: 'BOOL',
            paramMapRole: 'MODIFIER',
            valuePrefix: 'Has SRO units?',
            paramMapField: 'propertyannotation__legalclassb',
            paramMapComparison: 'gte',
            paramMapValue: '1',
            paramNoun: 'with SRO units',
            defaultOptions: comparisonOptions({
              name: 'value',
              comparisonValues: ['0', '1'],
              labels: ['No', 'Yes'],
            }),
          })
        },
      },
      housingType_all_7a: {
        // SRO units
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            component: GenericFieldSet,
            baseComponent: TextSelectField,
            paramSetLabel: '7A Program',
            paramMapType: 'BOOL',
            paramMapRole: 'MODIFIER',
            valuePrefix: 'Is 7A program?',
            paramMapField: 'propertyannotation__managementprogram',
            paramMapComparison: '',
            paramMapValue: '7A',
            paramNoun: 'with 7A program',
            defaultOptions: comparisonOptions({
              name: 'value',
              comparisonValues: ['7A'],
              labels: ['Yes'],
            }),
          })
        },
      },
      // rent stabilized
      housingType_rs_1: {
        generatorFunction: (resourceModel, relatedResourceModel = undefined) => {
          return constructCountDateParamSet({
            resourceModel,
            paramSetLabel: 'Change in # of Stabilized Units',
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
            dateLowValue: 2007,
            dateHighValue: 2017,
            rangeComparisonOptions: rangeComparisonOptions({
              comparisonValues: ['start', 'between'],
              labels: ['Since', 'Range'],
              rangeKey: 'rsUnitsRange',
            }),
            dateValidations: {
              min: 2007,
              max: (relatedResourceModel || {}).version,
            },
          })
        },
      },
      housingType_rs_2: {
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            paramSetLabel: 'Residential Units',
            paramMapField: 'unitsres',
            paramMapRole: 'MODIFIER',
            lowValue: '1',
            highValue: '5',
            paramMapComparison: 'lte',
            paramNoun: 'units',
            validations: {
              min: 1,
            },
          })
        },
      },
      housingType_rs_sro: {
        // SRO units
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            component: GenericFieldSet,
            baseComponent: TextSelectField,
            paramSetLabel: 'SRO Units',
            paramMapType: 'BOOL',
            paramMapRole: 'MODIFIER',
            valuePrefix: 'Has SRO units?',
            paramMapField: 'propertyannotation__legalclassb',
            paramMapComparison: 'gte',
            paramMapValue: '1',
            paramNoun: 'with SRO units',
            defaultOptions: comparisonOptions({
              name: 'value',
              comparisonValues: ['0', '1'],
              labels: ['No', 'Yes'],
            }),
          })
        },
      },
      housingType_rs_7a: {
        // SRO units
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            component: GenericFieldSet,
            baseComponent: TextSelectField,
            paramSetLabel: '7A Program',
            paramMapType: 'BOOL',
            paramMapRole: 'MODIFIER',
            valuePrefix: 'Is 7A program?',
            paramMapField: 'propertyannotation__managementprogram',
            paramMapComparison: '',
            paramMapValue: '7A',
            paramNoun: 'with 7A program',
            defaultOptions: comparisonOptions({
              name: 'value',
              comparisonValues: ['7A'],
              labels: ['Yes'],
            }),
          })
        },
      },

      // rent regulated
      housingType_rr_1: {
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            paramSetLabel: 'Program',
            component: GenericFieldSet,
            baseComponent: MultiSelectField,
            defaultOptions: rentRegulatedProgramOptions(),
            paramMapType: 'MULTI-TEXT',
            paramNoun: 'with program(s)',
            paramMapField: 'subsidyprograms__programname',
            paramMapComparison: 'any',
            paramMapValue: '',
          })
        },
      },

      // rent regulated
      housingType_rr_2: {
        generatorFunction: resourceModel => {
          return constructDateRangeParamSet({
            resourceModel,
            paramSetLabel: 'Expiration',
            dateType: 'DATE',
            dateRole: 'MODIFIER',
            comparisonPrefix: 'expiring',
            dateField: 'coresubsidyrecord__enddate',
            dateOptions: rangeComparisonOptions({
              comparisonValues: ['gte', 'between', 'lte'],
              labels: ['After', 'Between', 'Before'],
              rangeKey: 'DATE',
            }),
          })
        },
      },
      housingType_rr_3: {
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            paramSetLabel: 'Residential Units',
            paramMapField: 'unitsres',
            paramMapRole: 'MODIFIER',
            lowValue: '1',
            highValue: '5',
            paramMapComparison: 'lte',
            paramNoun: 'units',
            validations: {
              min: 1,
            },
          })
        },
      },
      housingType_rr_sro: {
        // SRO units
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            component: GenericFieldSet,
            baseComponent: TextSelectField,
            paramSetLabel: 'SRO Units',
            paramMapType: 'BOOL',
            paramMapRole: 'MODIFIER',
            valuePrefix: 'Has SRO units?',
            paramMapField: 'propertyannotation__legalclassb',
            paramMapComparison: 'gte',
            paramMapValue: '1',
            paramNoun: 'with SRO units',
            defaultOptions: comparisonOptions({
              name: 'value',
              comparisonValues: ['0', '1'],
              labels: ['No', 'Yes'],
            }),
          })
        },
      },

      // small homes
      housingType_sh: {
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            paramSetLabel: 'Residential Units',
            paramMapField: 'unitsres',
            paramMapRole: 'MODIFIER',
            lowValue: '1',
            highValue: '4',
            paramMapComparison: 'lte',
            paramNoun: 'units',
            validations: {
              min: 1,
              max: 4,
            },
          })
        },
      },
      housingType_sh_sro: {
        // SRO units
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            component: GenericFieldSet,
            baseComponent: TextSelectField,
            paramSetLabel: 'SRO Units',
            paramMapType: 'BOOL',
            paramMapRole: 'MODIFIER',
            valuePrefix: 'Has SRO units?',
            paramMapField: 'propertyannotation__legalclassb',
            paramMapComparison: 'gte',
            paramMapValue: '1',
            paramNoun: 'with SRO units',
            defaultOptions: comparisonOptions({
              name: 'value',
              comparisonValues: ['0', '1'],
              labels: ['No', 'Yes'],
            }),
          })
        },
      },
      // market rate
      housingType_mr: {
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            paramSetLabel: 'Residential Units',
            paramMapField: 'unitsres',
            paramMapRole: 'MODIFIER',
            lowValue: '1',
            highValue: '5',
            paramMapComparison: 'lte',
            paramNoun: 'units',
            validations: {
              min: 1,
            },
          })
        },
      },
      housingType_mr_sro: {
        // SRO units
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            component: GenericFieldSet,
            baseComponent: TextSelectField,
            paramSetLabel: 'SRO Units',
            paramMapType: 'BOOL',
            paramMapRole: 'MODIFIER',
            valuePrefix: 'Has SRO units?',
            paramMapField: 'propertyannotation__legalclassb',
            paramMapComparison: 'gte',
            paramMapValue: '1',
            paramNoun: 'with SRO units',
            defaultOptions: comparisonOptions({
              name: 'value',
              comparisonValues: ['0', '1'],
              labels: ['No', 'Yes'],
            }),
          })
        },
      },
      housingType_ph: {
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            paramSetLabel: 'Residential Units',
            paramMapField: 'unitsres',
            paramMapRole: 'MODIFIER',
            lowValue: '1',
            highValue: '5',
            paramMapComparison: 'lte',
            paramNoun: 'units',
            validations: {
              min: 1,
            },
          })
        },
      },
      housingType_ph_sro: {
        // SRO units
        generatorFunction: resourceModel => {
          return constructSingleMapParamSet({
            resourceModel,
            component: GenericFieldSet,
            baseComponent: TextSelectField,
            paramSetLabel: 'SRO Units',
            paramMapType: 'BOOL',
            paramMapRole: 'MODIFIER',
            valuePrefix: 'Has SRO units?',
            paramMapField: 'propertyannotation__legalclassb',
            paramMapComparison: 'gte',
            paramMapValue: '1',
            paramNoun: 'with SRO units',
            defaultOptions: comparisonOptions({
              name: 'value',
              comparisonValues: ['0', '1'],
              labels: ['No', 'Yes'],
            }),
          })
        },
      },
    },

    // Map constant to api property_set query path
    relatedResourceMappings: {
      ACRIS_REAL_MASTER: 'acrisreallegals__documentid',
      PROPERTY_SALE_BY_AMOUNT: 'acrisreallegals__documentid',
      PROPERTY_SALE_BY_COUNT: 'acrisreallegals__documentid',
      DOB_COMPLAINT: 'dobcomplaints',
      DOB_FILED_PERMIT: 'dobfiledpermits',
      DOB_ISSUED_PERMIT: 'dobissuedpermits',
      DOB_VIOLATION: 'dobviolations',
      ECB_VIOLATION: 'ecbviolations',
      EVICTION: 'evictions',
      HOUSING_LITIGATION: 'housinglitigations',
      HPD_COMPLAINT: 'hpdcomplaints',
      HPD_VIOLATION: 'hpdviolations',
      LISPENDEN: 'lispendens',
      FORECLOSURE: 'foreclosures',
      PSFORECLOSURE: 'psforeclosures',
      TAX_LIEN: 'taxliens',
      CONH_RECORD: 'conhrecords',
      AEP_BUILDING: 'aepbuildings',
    },
  }
}

export default Property

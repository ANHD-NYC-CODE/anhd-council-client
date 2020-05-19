// propertyannotation__legalclassb__gte = 1

import { comparisonOptions, constructSingleMapParamSet } from 'shared/utilities/filterUtils'
import ParamMap from 'shared/classes/ParamMap'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'

const AEPBuilding = databaseObject => ({
  resourceConstant: 'AEP_BUILDING',
  urlPath: 'aepbuildings',
  label: 'AEP Enforcement Program',
  sentenceNoun: 'an AEP building record',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructSingleMapParamSet({
          resourceModel,
          component: GenericFieldSet,
          baseComponent: TextSelectField,
          paramMapType: 'BOOL',
          paramMapRole: 'PRIMARY',
          valuePrefix: 'In Alternative Enforcement Program?',
          paramMapField: 'count',
          paramMapComparison: 'gte',
          paramMapValue: '1',
          paramNoun: 'In Alternative Enforcement Program?',
          defaultOptions: comparisonOptions({
            name: 'value',
            comparisonValues: ['0', '1'],
            labels: ['No', 'Yes'],
          }),
        })
      },
    },
    currentstatus: {
      generatorFunction: resourceModel => {
        return constructSingleMapParamSet({
          resourceModel,
          component: GenericFieldSet,
          baseComponent: TextSelectField,
          paramMapValue: 'Active',
          paramMapType: 'SINGLE-TEXT',
          paramMapComparison: '',
          paramSetLabel: 'Current Status',
          paramMapField: 'currentstatus__icontains',
          valuePrefix: 'Current Status',
          inputClass: '',
          defaultOptions: comparisonOptions({
            name: 'value',
            comparisonValues: ['Active', 'Discharged'],
            labels: ['Active', 'Discharged'],
          }),
        })
      },
    },
  },
})

export default AEPBuilding

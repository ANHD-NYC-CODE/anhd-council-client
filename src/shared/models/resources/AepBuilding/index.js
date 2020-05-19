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
          valuePrefix: 'has AEP record',
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
  },
})

export default AEPBuilding

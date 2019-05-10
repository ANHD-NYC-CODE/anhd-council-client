import { comparisonOptions, constructSingleMapParamSet } from 'shared/utilities/filterUtils'
import ParamMap from 'shared/classes/ParamMap'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'

const ConhRecord = databaseObject => ({
  resourceConstant: 'CONH_RECORD',
  urlPath: 'taxliens',
  label: 'Certificate of No Harassment',
  sentenceNoun: 'certificate of no harassment',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructSingleMapParamSet({
          resourceModel,
          component: GenericFieldSet,
          baseComponent: TextSelectField,
          paramMapType: 'BOOL',
          paramMapRole: 'PRIMARY',
          valuePrefix: 'Eligible for certificate of no harassment?',
          paramMapField: 'count',
          paramMapComparison: 'gte',
          paramMapValue: '1',
          paramNoun: 'Has CONH?',
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

export default ConhRecord

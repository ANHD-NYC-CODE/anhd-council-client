import { comparisonOptions, constructSingleMapParamSet } from 'shared/utilities/filterUtils'
import ParamMap from 'shared/classes/ParamMap'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'

const TaxLien = databaseObject => ({
  summaryBackgroundColorClass: 'summary-blue',
  resourceConstant: 'TAX_LIEN',
  urlPath: 'taxliens',
  label: 'Tax Lien',
  sentenceNoun: 'tax liens',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructSingleMapParamSet({
          resourceModel,
          component: GenericFieldSet,
          baseComponent: TextSelectField,
          paramMapType: 'BOOL',
          paramMapRole: 'PRIMARY',
          valuePrefix: 'Has Tax Lien?',
          paramMapField: 'count',
          paramMapComparison: 'gte',
          paramMapValue: '1',
          paramNoun: 'tax liens',
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

export default TaxLien

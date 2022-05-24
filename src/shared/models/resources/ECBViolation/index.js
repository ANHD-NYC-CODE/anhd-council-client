import { constructSingleMapParamSet, comparisonOptions, constructCountDateParamSet } from 'shared/utilities/filterUtils'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'

const ECBViolation = () => ({
  summaryBackgroundColorClass: 'dob-red',
  resourceConstant: 'ECB_VIOLATION',
  urlPath: 'ecbviolations',
  label: 'ECB Violations',
  sentenceNoun: 'ECB violations',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountDateParamSet({
          resourceModel,
          amountValue: 1,
        })
      },
    },
    ecbviolationstatus: {
      generatorFunction: resourceModel => {
        return constructSingleMapParamSet({
          resourceModel,
          component: GenericFieldSet,
          baseComponent: TextSelectField,
          paramMapValue: 'active',
          paramMapType: 'SINGLE-TEXT',
          paramMapComparison: 'icontains',
          paramMapField: 'ecbviolationstatus',
          paramSetLabel: 'Status',
          valuePrefix: 'Status',
          inputClass: '',
          defaultOptions: comparisonOptions({
            name: 'value',
            comparisonValues: ['active', 'resolve'],
            labels: ['Active', 'Resolved'],
          }),
        })
      },
    },
  },
})

export default ECBViolation

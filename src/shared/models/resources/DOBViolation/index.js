import { constructSingleMapParamSet, comparisonOptions, constructCountDateParamSet } from 'shared/utilities/filterUtils'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'

const DOBViolation = () => ({
  summaryBackgroundColorClass: 'dob-red',
  resourceConstant: 'DOB_VIOLATION',
  urlPath: 'dobviolations',
  label: 'DOB Violations',
  sentenceNoun: 'DOB violations',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountDateParamSet({
          resourceModel,
        })
      },
    },
    violationcategory: {
      generatorFunction: resourceModel => {
        return constructSingleMapParamSet({
          resourceModel,
          component: GenericFieldSet,
          baseComponent: TextSelectField,
          paramMapValue: 'active',
          paramMapType: 'SINGLE-TEXT',
          paramMapComparison: 'icontains',
          paramMapField: 'violationcategory',
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

export default DOBViolation

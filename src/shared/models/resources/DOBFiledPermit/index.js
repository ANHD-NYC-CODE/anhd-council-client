import { constructSingleMapParamSet, comparisonOptions, constructCountDateParamSet } from 'shared/utilities/filterUtils'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'

const DOBFiledPermit = () => ({
  summaryBackgroundColorClass: 'dob-red',

  resourceConstant: 'DOB_FILED_PERMIT',
  urlPath: 'dobfiledpermits',
  label: 'DOB Permit Applications',
  sentenceNoun: 'DOB permit applications',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountDateParamSet({
          resourceModel,
        })
      },
    },
    jobtype: {
      generatorFunction: resourceModel => {
        return constructSingleMapParamSet({
          resourceModel,
          component: GenericFieldSet,
          baseComponent: TextSelectField,
          paramMapValue: 'a1',
          paramMapType: 'SINGLE-TEXT',
          paramMapComparison: 'icontains',
          paramMapField: 'jobtype',
          paramSetLabel: 'Type',
          valuePrefix: 'Type',
          inputClass: '',
          defaultOptions: comparisonOptions({
            name: 'value',
            comparisonValues: ['a1', 'a2', 'a3', 'nb', 'dm'],
            labels: ['A1', 'A2', 'A3', 'NB', 'DM'],
          }),
        })
      },
    },
  },
})

export default DOBFiledPermit

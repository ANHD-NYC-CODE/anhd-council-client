import { constructCountDateParamSet, constructSingleMapParamSet, comparisonOptions } from 'shared/utilities/filterUtils'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'

const HousingCourtCase = () => ({
  summaryBackgroundColorClass: 'summary-blue',
  resourceConstant: 'OCA_HOUSING_COURT',
  urlPath: 'oca-housing-court',
  label: 'Housing Court Cases',
  sentenceNoun: 'housing court cases',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountDateParamSet({
          resourceModel,
          amountValue: '5',
        })
      },
    },
    status: {
      generatorFunction: resourceModel => {
        return constructSingleMapParamSet({
          resourceModel,
          component: GenericFieldSet,
          baseComponent: TextSelectField,
          valuePrefix: 'Status',
          paramMapField: 'status',
          paramMapValue: 'status',
          paramMapType: 'SINGLE-TEXT',
          paramMapComparison: '',
          paramSetLabel: 'Status',
          inputClass: '',
          defaultOptions: comparisonOptions({
            name: 'status',
            comparisonValues: ['Disposed', 'Post Disposition'],
            labels: ['Disposed', 'Post Disposition'],
          }),
        })
      }
    },
    classification: {
      generatorFunction: resourceModel => {
        return constructSingleMapParamSet({
          resourceModel,
          component: GenericFieldSet,
          baseComponent: TextSelectField,
          valuePrefix: 'Case Type',
          paramMapField: 'classification',
          paramMapValue: 'classification',
          paramMapType: 'SINGLE-TEXT',
          paramMapComparison: '',
          paramSetLabel: 'Case Type',
          inputClass: '',
          defaultOptions: comparisonOptions({
            name: 'classification',
            comparisonValues: ['Non-Payment', 'HP', 'Holdover', 'Illegal Lockout'],
            labels: ['Non-Payment', 'HP', 'Holdover', 'Illegal Lockout'],
          }),
        })
      }
    }
  },
})

export default HousingCourtCase

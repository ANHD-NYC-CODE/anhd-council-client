import { constructCountDateParamSet, constructSingleMapParamSet, comparisonOptions } from 'shared/utilities/filterUtils'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'

const HousingCourtCase = () => ({
  summaryBackgroundColorClass: 'summary-blue',
  resourceConstant: 'OCA_HOUSING_COURT',
  urlPath: 'ocahousingcourts',
  label: 'Housing Court Cases',
  sentenceNoun: 'housing court cases',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountDateParamSet({
          resourceModel,
          amountValue: '1',
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
          paramMapValue: 'Disposed',
          paramMapType: 'SINGLE-TEXT',
          paramMapComparison: '',
          paramSetLabel: 'Status',
          inputClass: '',
          defaultOptions: comparisonOptions({
            name: 'status',
            comparisonValues: [
              'Disposed', 
              'Post-Disposition', 
              'Active', 
              'Active---Pending-Further-Review', 
              'Active---Restored', 
              'Active---Appeal-Pending',  
              'Post-Disposition---Appeal-Pending'
            ],
            labels: [
              'Disposed', 
              'Post Disposition', 
              'Active', 
              'Active - Pending Further Review', 
              'Active - Restored', 
              'Active- Appeal Pending', 
              'Post Disposition - Appeal Pending'
            ]
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
          paramMapValue: 'HP',
          paramMapType: 'SINGLE-TEXT',
          paramMapComparison: '',
          paramSetLabel: 'Case Type',
          inputClass: '',
          defaultOptions: comparisonOptions({
            name: 'classification',
            comparisonValues: [
              'HP',
              'Non-Payment',
              'Holdover',
              'Illegal-Lockout',
              'Harassment',
              'Illegal-Activity',
              'Article-7A',
              'HP-with-Harassment',
              'Breach-of-Warrant-of-Habitability'
            ],
            labels: [
              'HP',
              'Non-Payment',
              'Holdover',
              'Illegal Lockout',
              'Harassment',
              'Illegal Activity',
              'Article 7A',
              'HP with harassment',
              'Breach of Warrant of Habitability'
            ]
          }),
        })
      }
    }
  },
})

export default HousingCourtCase

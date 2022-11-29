import { constructCountDateParamSet, constructSingleMapParamSet, comparisonOptions } from 'shared/utilities/filterUtils'
// import { constructCountDateParamSet, constructSingleMapParamSet, comparisonOptions, ocaProgramOptions } from 'shared/utilities/filterUtils'

import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'
// import MultiSelectField from 'AdvancedSearch/FilterComponent/Field/MultiSelectField'

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

    // Tested commenting out above and using the below, following the Property subsidy program name filter that we're tring to mimic***
    // update imports above for this, ocaProgramOptions are outlined in filterUtils, importing multiselect field
    // this gets it to show up on the front end but doesn't work
    
    // status: {
    //   generatorFunction: resourceModel => {
    //     return constructSingleMapParamSet({
    //       resourceModel,
    //       paramSetLabel: 'Status',
    //       component: GenericFieldSet,
    //       baseComponent: MultiSelectField,
    //       defaultOptions: ocaProgramOptions(),
    //       paramMapType: 'MULTI-TEXT',
    //       paramNoun: 'case type(s)',
    //       paramMapField: 'ocahousingcourts__status',
    //       valuePrefix: 'Status',
    //       paramMapComparison: 'any',
    //       paramMapValue: '',
    //     })
    //   }
    // },


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

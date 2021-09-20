import { constructCountDateParamSet, constructSingleMapParamSet } from 'shared/utilities/filterUtils'
// import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
// import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'

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
          amountValue: '1',
        })
      },
    },
    status: {
      generatorFunction: resourceModel => {
        return constructSingleMapParamSet({
          resourceModel,
        })
      }
    }
  },
})

export default HousingCourtCase

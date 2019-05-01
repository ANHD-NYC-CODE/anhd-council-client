import { constructCountDateParamSet } from 'shared/utilities/filterUtils'

const HousingLitigation = databaseObject => ({
  summaryBackgroundColorClass: 'summary-blue',

  resourceConstant: 'HOUSING_LITIGATION',
  urlPath: 'housinglitigations',
  label: 'Litigations Against Landlords',
  sentenceNoun: 'litigations',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountDateParamSet({
          resourceModel,
          amountValue: 1,
        })
      },
    },
  },
})

export default HousingLitigation

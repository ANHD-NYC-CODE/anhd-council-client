import { constructCountDateParamSet } from 'shared/utilities/filterUtils'

const HousingLitigation = () => ({
  summaryBackgroundColorClass: 'summary-blue',
  resourceConstant: 'HOUSING_LITIGATION',
  urlPath: 'housinglitigations',
  label: 'Litigations Against Landlord',
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

import { constructCountDateParamSet } from 'shared/utilities/filterUtils'

const Foreclosure = databaseObject => ({
  summaryBackgroundColorClass: 'summary-blue',

  resourceConstant: 'FORECLOSURE',
  urlPath: 'foreclosures',
  label: 'Foreclosure Filings',
  sentenceNoun: 'foreclosure filings',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountDateParamSet({
          resourceModel,
          amountValue: '1',
        })
      },
    },
  },
})

export default Foreclosure

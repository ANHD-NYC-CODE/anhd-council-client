import { constructCountDateParamSet } from 'shared/utilities/filterUtils'

const ForeclosureAuction = () => ({
  summaryBackgroundColorClass: 'summary-blue',
  resourceConstant: 'PSFORECLOSURE',
  urlPath: 'foreclosure-auctions',
  // urlPath: 'psforeclosures',
  label: 'Foreclosure Auctions',
  sentenceNoun: 'foreclosure auctions',
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

export default ForeclosureAuction

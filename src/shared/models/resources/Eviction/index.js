import { constructCountDateParamSet } from 'shared/utilities/filterUtils'

const Eviction = databaseObject => ({
  summaryBackgroundColorClass: 'summary-blue',

  resourceConstant: 'EVICTION',
  urlPath: 'evictions',
  label: 'Marshal Evictions',
  sentenceNoun: 'Marshal Evictions',
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

export default Eviction

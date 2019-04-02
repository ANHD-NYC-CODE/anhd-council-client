import { constructCountDateParamSet } from 'shared/utilities/filterUtils'

const Eviction = databaseObject => ({
  summaryBackgroundColorClass: 'summary-blue',

  resourceConstant: 'EVICTION',
  urlPath: 'evictions',
  label: 'Evictions',
  sentenceNoun: 'evictions',
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

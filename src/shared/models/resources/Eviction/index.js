import { constructCountParamSet } from 'shared/utilities/filterUtils'

const Eviction = databaseObject => ({
  resourceConstant: 'EVICTION',
  urlPath: 'evictions',
  label: 'Evictions',
  sentenceNoun: 'evictions',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountParamSet({
          resourceModel,
          defaultAmount: 1,
        })
      },
    },
  },
})

export default Eviction

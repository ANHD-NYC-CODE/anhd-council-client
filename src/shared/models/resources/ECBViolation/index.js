import { constructCountParamSet } from 'shared/utilities/filterUtils'

const ECBViolation = databaseObject => ({
  resourceConstant: 'ECB_VIOLATION',
  urlPath: 'ecbviolations',
  label: 'ECB Violations',
  sentenceNoun: 'ECB violations',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountParamSet({
          resourceModel,
        })
      },
    },
  },
})

export default ECBViolation

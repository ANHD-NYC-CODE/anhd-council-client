import { constructCountParamSet } from 'shared/utilities/filterUtils'

const DOBViolation = databaseObject => ({
  resourceConstant: 'DOB_VIOLATION',
  urlPath: 'dobviolations',
  label: 'DOB Violations',
  sentenceNoun: 'DOB violations',
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

export default DOBViolation

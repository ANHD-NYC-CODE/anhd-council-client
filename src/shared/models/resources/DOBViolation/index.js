import { constructCountDateParamSet } from 'shared/utilities/filterUtils'

const DOBViolation = databaseObject => ({
  summaryBackgroundColorClass: 'dob-red',
  resourceConstant: 'DOB_VIOLATION',
  urlPath: 'dobviolations',
  label: 'DOB Violations',
  sentenceNoun: 'DOB violations',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountDateParamSet({
          resourceModel,
        })
      },
    },
  },
})

export default DOBViolation

import { constructCountDateParamSet } from 'shared/utilities/filterUtils'

const DOBFiledPermit = databaseObject => ({
  summaryBackgroundColorClass: 'dob-red',

  resourceConstant: 'DOB_FILED_PERMIT',
  urlPath: 'dobfiledpermits',
  label: 'DOB Permit Applications',
  sentenceNoun: 'DOB permit applications',
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

export default DOBFiledPermit

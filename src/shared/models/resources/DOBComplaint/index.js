import { constructCountDateParamSet } from 'shared/utilities/filterUtils'

const DOBComplaint = databaseObject => ({
  summaryBackgroundColorClass: 'dob-red',
  resourceConstant: 'DOB_COMPLAINT',
  urlPath: 'dobcomplaints',
  label: 'DOB Complaints',
  sentenceNoun: 'DOB complaints',
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

export default DOBComplaint

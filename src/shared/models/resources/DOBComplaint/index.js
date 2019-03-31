import { constructCountParamSet } from 'shared/utilities/filterUtils'

const DOBComplaint = databaseObject => ({
  resourceConstant: 'DOB_COMPLAINT',
  urlPath: 'dobcomplaints',
  label: 'DOB Complaints',
  sentenceNoun: 'DOB complaints',
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

export default DOBComplaint

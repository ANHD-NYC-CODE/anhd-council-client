import { constructCountDateParamSet } from 'shared/utilities/filterUtils'

const HPDComplaint = databaseObject => ({
  resourceConstant: 'HPD_COMPLAINT',
  urlPath: 'hpdcomplaints',
  label: 'HPD Complaints',
  sentenceNoun: 'HPD complaints',
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

export default HPDComplaint

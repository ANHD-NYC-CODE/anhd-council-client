import { constructCountDateParamSet } from 'shared/utilities/filterUtils'

const HPDComplaint = databaseObject => ({
  summaryBackgroundColorClass: 'hpd-orange',
  resourceConstant: 'HPD_COMPLAINT',
  urlPath: 'hpdcomplaints',
  label: 'HPD Complaints & Problems',
  dashboardLabel: 'HPD Complaints',
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

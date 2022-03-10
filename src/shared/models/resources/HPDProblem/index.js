import { constructCountDateParamSet } from 'shared/utilities/filterUtils'

const HPDComplaint = () => ({
  summaryBackgroundColorClass: 'hpd-orange',
  resourceConstant: 'HPD_PROBLEM',
  urlPath: 'hpdcomplaints',
  label: 'HPD Complaints & Problems',
  dashboardLabel: 'HPD Problems',
  sentenceNoun: 'HPD problems',
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

export default HPDComplaint

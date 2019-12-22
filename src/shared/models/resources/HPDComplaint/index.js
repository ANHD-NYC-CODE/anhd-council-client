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
  tableResultsConstructor: results => {
    // Counts all the HPD complaints + Problems together
    return [].concat(
      ...results.map(complaint =>
        complaint.hpdproblems.map(problem => {
          problem.receiveddate = complaint.receiveddate
          problem.apartment = complaint.apartment
          return problem
        })
      )
    )
  },

  tableRecordsCountFunction2: results => {
    const problems = [].concat(
      ...results.map(complaint => {
        return complaint.hpdproblems.map(problem => {
          return problem
        })
      })
    )

    return problems.length
  },
})

export default HPDComplaint

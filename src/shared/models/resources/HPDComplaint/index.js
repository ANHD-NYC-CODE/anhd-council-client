import { constructSingleMapParamSet, comparisonOptions, constructCountDateParamSet } from 'shared/utilities/filterUtils'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'

const HPDComplaint = () => ({
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
          amountValue: 1,
        })
      },
    },
    status: {
      generatorFunction: resourceModel => {
        return constructSingleMapParamSet({
          resourceModel,
          component: GenericFieldSet,
          baseComponent: TextSelectField,
          paramMapValue: 'OPEN',
          paramMapType: 'SINGLE-TEXT',
          paramMapComparison: '',
          paramSetLabel: 'Status',
          paramMapField: 'status',
          valuePrefix: 'Status',
          inputClass: '',
          defaultOptions: comparisonOptions({
            name: 'value',
            comparisonValues: ['OPEN', 'CLOSE'],
            labels: ['Open', 'Closed'],
          }),
        })
      },
    },
  },
  tableResultsConstructor: results => {
    // Counts all the HPD complaints + Problems together
    return [].concat(
      ...results.map(complaint => {
        if (!complaint.hpdproblems) return
        return complaint.hpdproblems.map(problem => {
          problem.receiveddate = complaint.receiveddate
          problem.apartment = complaint.apartment
          return problem
        })
      })
    )
  },

  tableRecordsCountFunction2: results => {
    const problems = [].concat(
      ...results.map(complaint => {
        {
          if (!complaint.hpdproblems) return
          return complaint.hpdproblems.map(problem => {
            return problem
          })
        }
      })
    )

    return problems.length
  },
})

export default HPDComplaint

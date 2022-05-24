import { constructSingleMapParamSet, comparisonOptions, constructCountDateParamSet } from 'shared/utilities/filterUtils'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'

import { dobComplaintCategoryDescriptionFormatter } from 'shared/utilities/tableUtils'

const DOBComplaint = () => ({
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
          paramMapValue: 'ACTIVE',
          paramMapType: 'SINGLE-TEXT',
          paramMapComparison: '',
          paramSetLabel: 'Status',
          paramMapField: 'status',
          valuePrefix: 'Status',
          inputClass: '',
          defaultOptions: comparisonOptions({
            name: 'value',
            comparisonValues: ['ACTIVE', 'CLOSED'],
            labels: ['Active', 'Closed'],
          }),
        })
      },
    },
  },
  tableResultsConstructor: results => {
    // adds a field called complaintdescription which is derived from complaintcategory
    // which is taken from the dob_complaint description documents
    return results.map(complaint => {
      complaint.complaintdescription = dobComplaintCategoryDescriptionFormatter(complaint.complaintcategory)
      return complaint
    })
  },
})

export default DOBComplaint

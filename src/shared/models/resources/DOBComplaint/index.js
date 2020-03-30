import { constructCountDateParamSet } from 'shared/utilities/filterUtils'

import { dobComplaintCategoryDescriptionFormatter } from 'shared/utilities/tableUtils'

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

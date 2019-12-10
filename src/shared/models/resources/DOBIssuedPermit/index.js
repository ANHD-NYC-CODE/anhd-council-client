import { constructCountDateParamSet } from 'shared/utilities/filterUtils'

const DOBIssuedPermit = databaseObject => ({
  summaryBackgroundColorClass: 'dob-red',

  resourceConstant: 'DOB_ISSUED_PERMIT',
  urlPath: 'dobissuedpermits',
  label: 'DOB Permits Issued',
  sentenceNoun: 'DOB permit issuances',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountDateParamSet({
          resourceModel,
        })
      },
    },
  },
  tableRecordsCountFunction: results => {
    return results.filter(result => result.filing_status === 'INITIAL').length
  },
})

export default DOBIssuedPermit

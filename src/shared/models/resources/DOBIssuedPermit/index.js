import { constructCountParamSet } from 'shared/utilities/filterUtils'

const DOBIssuedPermit = databaseObject => ({
  resourceConstant: 'DOB_ISSUED_PERMIT',
  urlPath: 'dobissuedpermits',
  label: 'DOB Permits Issued',
  sentenceNoun: 'DOB permit issuances',
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

export default DOBIssuedPermit

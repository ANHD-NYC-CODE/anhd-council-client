import { constructCountParamSet } from 'shared/utilities/filterUtils'

const DOBFiledPermit = databaseObject => ({
  resourceConstant: 'DOB_FILED_PERMIT',
  urlPath: 'doblegacyfiledpermits',
  label: 'DOB Permit Applications',
  sentenceNoun: 'DOB permit applications',
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

export default DOBFiledPermit

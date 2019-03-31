import ParamMap from 'shared/classes/ParamMap'
import { constructCountParamSet } from 'shared/utilities/filterUtils'

const AcrisRealMaster = databaseObject => ({
  resourceConstant: 'ACRIS_REAL_MASTER',
  urlPath: 'acrisrealmasters',
  label: 'Property Sales',
  sentenceNoun: 'sales',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountParamSet({
          resourceModel,
          defaultAmount: 2,
          amountNoun: 'times',
        })
      },
    },
  },
})

export default AcrisRealMaster

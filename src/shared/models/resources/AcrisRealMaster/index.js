import ParamMap from 'shared/classes/ParamMap'
import { constructCountParamSet, constructSingleMapParamSet } from 'shared/utilities/filterUtils'

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
          defaultAmount: 1,
          amountNoun: 'times',
        })
      },
    },
    docamount: {
      generatorFunction: resourceModel => {
        return constructSingleMapParamSet({
          resourceModel,
          defaultAmount: 1000000,
          paramSetLabel: 'Sale Price',
          paramMapField: 'docamount',
          valuePrefix: '$',
        })
      },
    },
  },
})

export default AcrisRealMaster

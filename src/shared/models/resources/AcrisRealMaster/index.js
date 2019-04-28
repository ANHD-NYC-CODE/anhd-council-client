import ParamMap from 'shared/classes/ParamMap'
import { constructCountDateParamSet, constructSingleMapParamSet } from 'shared/utilities/filterUtils'

const AcrisRealMaster = databaseObject => ({
  resourceConstant: 'ACRIS_REAL_MASTER',
  urlPath: 'acrisrealmasters',
  summaryBackgroundColorClass: 'acris-yellow',
  label: 'Sales',
  sentenceNoun: 'Sales',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountDateParamSet({
          resourceModel,
          amountValue: 1,
          amountNoun: 'times',
        })
      },
    },
    docamount: {
      generatorFunction: resourceModel => {
        return constructSingleMapParamSet({
          resourceModel,
          paramMapValue: 1000000,
          paramMapComparison: 'gte',
          paramSetLabel: 'Sale Price',
          paramMapField: 'docamount',
          valuePrefix: '$',
        })
      },
    },
  },
})

export default AcrisRealMaster

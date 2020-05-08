import ParamMap from 'shared/classes/ParamMap'
import { constructCountDateParamSet, constructSingleMapParamSet } from 'shared/utilities/filterUtils'

const AcrisRealMaster = databaseObject => ({
  resourceConstant: 'ACRIS_REAL_MASTER',
  urlPath: 'acrisrealmasters',
  summaryBackgroundColorClass: 'acris-yellow',
  label: 'Sales',
  sentenceNoun: 'Sales',
  tableResultsConstructor: results => {
    // maps party 1 and party 2 to their own fields
    return [].concat(
      ...results.map(sale => {
        sale.partiesFrom = sale.acrisrealparties.filter(party => party.partytype === 1)
        sale.partiesTo = sale.acrisrealparties.filter(party => party.partytype === 2)

        return sale
      })
    )
  },
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
          inputClass: 'sales-input',
        })
      },
    },
  },
})

export default AcrisRealMaster

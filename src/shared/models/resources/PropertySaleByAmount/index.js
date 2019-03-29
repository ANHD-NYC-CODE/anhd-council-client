import { constructDefaultSchema, constantToName } from 'shared/utilities/filterUtils'
import { LanguageModule } from 'shared/classes/LanguageModule'

const PropertySaleByAmount = databaseObject => ({
  id: 'PROPERTY_SALE_BY_AMOUNT',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'PROPERTY_SALE_BY_AMOUNT',
    apiField: 'acrisreallegals',
    amountFieldQuery: 'documentid__docamount',
    amountNoun: '',
    amountValuePrefix: '$',
    defaultAmount: '1000000',
    amountPropertyAdjective: 'sold for',
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'PROPERTY_SALE_BY_AMOUNT', capitalizeDepartment: false, plural: false }),
  }),
})

export default PropertySaleByAmount

import { constructDefaultSchema, constantToName } from 'shared/utilities/filterUtils'
import { LanguageModule } from 'shared/classes/LanguageModule'

const PropertySaleByCount = databaseObject => ({
  id: 'PROPERTY_SALE_BY_COUNT',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'PROPERTY_SALE_BY_COUNT',
    apiField: 'acrisreallegals',
    amountFieldQuery: 'documentid__count',
    amountPropertyAdjective: 'were sold',
    defaultAmount: 2,
    amountNoun: 'times',
    amountShortNoun: 'times',
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'PROPERTY_SALE_BY_COUNT', capitalizeDepartment: false, plural: false }),
  }),
})

export default PropertySaleByCount

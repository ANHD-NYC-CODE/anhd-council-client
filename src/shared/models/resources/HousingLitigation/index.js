import { constructDefaultSchema, constantToName } from 'shared/utilities/filterUtils'
import { LanguageModule } from 'shared/classes/LanguageModule'

const HousingLitigation = databaseObject => ({
  resourceConstant: 'HOUSING_LITIGATION',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'HOUSING_LITIGATION',
    amountFieldQuery: 'count',
    capitalizeDepartment: false,
    defaultAmount: 1,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'HOUSING_LITIGATION', capitalizeDepartment: false, plural: true }),
  }),
})

export default HousingLitigation

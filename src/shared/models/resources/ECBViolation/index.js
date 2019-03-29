import { constructDefaultSchema, constantToName } from 'shared/utilities/filterUtils'
import { LanguageModule } from 'shared/classes/LanguageModule'

const ECBViolation = databaseObject => ({
  resourceConstant: 'ECB_VIOLATION',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'ECB_VIOLATION',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'ECB_VIOLATION', capitalizeDepartment: true, plural: true }),
  }),
})

export default ECBViolation

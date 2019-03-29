import { constructDefaultSchema, constantToName } from 'shared/utilities/filterUtils'
import { LanguageModule } from 'shared/classes/LanguageModule'

const DOBViolation = databaseObject => ({
  id: 'DOB_VIOLATION',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'DOB_VIOLATION',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'DOB_VIOLATION', capitalizeDepartment: true, plural: true }),
  }),
})

export default DOBViolation

import { constructDefaultSchema, constantToName } from 'shared/utilities/filterUtils'
import { LanguageModule } from 'shared/classes/LanguageModule'

const HPDViolation = databaseObject => ({
  resourceConstant: 'HPD_VIOLATION',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'HPD_VIOLATION',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'HPD_VIOLATION', capitalizeDepartment: true, plural: true }),
  }),
})

export default HPDViolation

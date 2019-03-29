import { constructDefaultSchema, constantToName } from 'shared/utilities/filterUtils'
import { LanguageModule } from 'shared/classes/LanguageModule'

const HPDComplaint = databaseObject => ({
  resourceConstant: 'HPD_COMPLAINT',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'HPD_COMPLAINT',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'HPD_COMPLAINT', capitalizeDepartment: true, plural: true }),
  }),
})

export default HPDComplaint

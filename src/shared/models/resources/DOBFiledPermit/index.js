import { constructDefaultSchema, constantToName } from 'shared/utilities/filterUtils'
import { LanguageModule } from 'shared/classes/LanguageModule'

const DOBFiledPermit = databaseObject => ({
  id: 'DOB_FILED_PERMIT',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'DOB_FILED_PERMIT',
    apiField: 'doblegacyfiledpermits',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
    defaultAmount: 5,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'DOB_FILED_PERMIT', capitalizeDepartment: true, plural: true }),
  }),
})

export default DOBFiledPermit

import { constructDefaultSchema, constantToName } from 'shared/utilities/filterUtils'
import { LanguageModule } from 'shared/classes/LanguageModule'

const DOBIssuedPermit = databaseObject => ({
  resourceConstant: 'DOB_ISSUED_PERMIT',
  urlPath: 'dobissuedpermits',
  label: 'DOB Permits Issued',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'DOB_ISSUED_PERMIT',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
    defaultAmount: 5,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'DOB_ISSUED_PERMIT', capitalizeDepartment: true, plural: true }),
  }),
})

export default DOBIssuedPermit
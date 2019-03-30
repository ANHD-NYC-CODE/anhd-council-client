import { constructDefaultSchema, constantToName } from 'shared/utilities/filterUtils'
import { LanguageModule } from 'shared/classes/LanguageModule'

const DOBComplaint = databaseObject => ({
  resourceConstant: 'DOB_COMPLAINT',
  urlPath: 'dobcomplaints',
  label: 'DOB Complaints',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'DOB_COMPLAINT',
    amountFieldQuery: 'count',
    capitalizeDepartment: true,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'DOB_COMPLAINT', capitalizeDepartment: true, plural: true }),
  }),
})

export default DOBComplaint

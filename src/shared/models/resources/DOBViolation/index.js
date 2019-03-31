import { constructDefaultSchema, constantToName } from 'shared/utilities/filterUtils'
import { LanguageModule } from 'shared/classes/LanguageModule'

const DOBViolation = databaseObject => ({
  resourceConstant: 'DOB_VIOLATION',
  urlPath: 'dobviolations',
  label: 'DOB Violations',
})

export default DOBViolation

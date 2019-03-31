import { constructDefaultSchema, constantToName } from 'shared/utilities/filterUtils'
import { LanguageModule } from 'shared/classes/LanguageModule'

const HPDViolation = databaseObject => ({
  resourceConstant: 'HPD_VIOLATION',
  urlPath: 'hpdviolations',
  label: 'HPD Violations',
})

export default HPDViolation

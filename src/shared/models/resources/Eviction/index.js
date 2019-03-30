import { constructDefaultSchema, constantToName } from 'shared/utilities/filterUtils'
import { LanguageModule } from 'shared/classes/LanguageModule'

const Eviction = databaseObject => ({
  resourceConstant: 'EVICTION',
  urlPath: 'evictions',
  label: 'Evictions',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'EVICTION',
    amountFieldQuery: 'count',
    capitalizeDepartment: false,
    defaultAmount: 1,
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'EVICTION', capitalizeDepartment: false, plural: true }),
  }),
})

export default Eviction

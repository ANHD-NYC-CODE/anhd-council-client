import { constructDefaultSchema, constantToName } from 'shared/utilities/filterUtils'
import { LanguageModule } from 'shared/classes/LanguageModule'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import HiddenField from 'AdvancedSearch/FilterComponent/Field/HiddenField'

const LisPenden = databaseObject => ({
  resourceConstant: 'LISPENDEN',
  urlPath: 'lispendens',
  label: 'Foreclosures',
  schema: constructDefaultSchema({
    databaseObject,
    constant: 'LISPENDEN',
    apiField: 'lispendens',
    amountFieldQuery: 'count',
    defaultAmount: '1',
    capitalizeDepartment: false,
    hiddenParamMap: new ParameterMapping({
      component: GenericFieldSet,
      baseComponent: HiddenField,
      field: 'lispendens__type',
      comparison: '',
      value: 'foreclosure',
    }),
  }),
  languageModule: new LanguageModule({
    noun: constantToName({ constant: 'FORECLOSURE', capitalizeDepartment: false, plural: true }),
  }),
})

export default LisPenden

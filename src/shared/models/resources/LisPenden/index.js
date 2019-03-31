import { constructCountParamSet } from 'shared/utilities/filterUtils'
import ParamMap from 'shared/classes/ParamMap'

import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import HiddenField from 'AdvancedSearch/FilterComponent/Field/HiddenField'

const LisPenden = databaseObject => ({
  resourceConstant: 'LISPENDEN',
  urlPath: 'lispendens',
  label: 'Foreclosures',
  sentenceNoun: 'foreclosures',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountParamSet({
          resourceModel,
          defaultAmount: '1',
          hiddenParamMap: new ParamMap({
            component: GenericFieldSet,
            baseComponent: HiddenField,
            resourceModel: resourceModel,
            field: 'type',
            comparison: '',
            value: 'foreclosure',
          }),
        })
      },
    },
  },
})

export default LisPenden

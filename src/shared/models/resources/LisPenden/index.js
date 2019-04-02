import { constructCountDateParamSet } from 'shared/utilities/filterUtils'
import ParamMap from 'shared/classes/ParamMap'

import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import HiddenField from 'AdvancedSearch/FilterComponent/Field/HiddenField'

const LisPenden = databaseObject => ({
  summaryBackgroundColorClass: 'summary-blue',

  resourceConstant: 'LISPENDEN',
  urlPath: 'lispendens',
  label: 'Foreclosures',
  sentenceNoun: 'foreclosures',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountDateParamSet({
          resourceModel,
          amountValue: '1',
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

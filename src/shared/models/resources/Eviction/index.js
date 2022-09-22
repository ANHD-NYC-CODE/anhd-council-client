//  import { constructCountDateParamSet } from 'shared/utilities/filterUtils'

import { constructSingleMapParamSet, comparisonOptions, constructCountDateParamSet } from 'shared/utilities/filterUtils'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'

const Eviction = () => ({
  summaryBackgroundColorClass: 'summary-blue',
  resourceConstant: 'EVICTION',
  urlPath: 'evictions',
  label: 'Marshal Evictions',
  sentenceNoun: 'Marshal Evictions',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountDateParamSet({
          resourceModel,
          amountValue: 1,
        })
      },
    },

     // new to test --------------->

  residentialcommercial: {
    generatorFunction: resourceModel => {
      return constructSingleMapParamSet({
        resourceModel,
        component: GenericFieldSet,
        baseComponent: TextSelectField,
        paramMapValue: 'Commercial',
        paramMapType: 'SINGLE-TEXT',
        paramMapComparison: '',
        paramSetLabel: 'Type',
        paramMapField: 'residentialcommercial',
        valuePrefix: 'Type',
        inputClass: '',
        defaultOptions: comparisonOptions({
          name: 'value',
          comparisonValues: ['COMMERCIAL', 'RESIDENTIAL'],
          labels: ['Commercial', 'Residential'],
        }),
      })
    },
  },

  },

 
})

export default Eviction

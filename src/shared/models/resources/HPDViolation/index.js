import { constructSingleMapParamSet, comparisonOptions, constructCountDateParamSet } from 'shared/utilities/filterUtils'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'

const HPDViolation = () => ({
  summaryBackgroundColorClass: 'hpd-orange',
  resourceConstant: 'HPD_VIOLATION',
  urlPath: 'hpdviolations',
  label: 'HPD Violations',
  sentenceNoun: 'HPD violations',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountDateParamSet({
          resourceModel,
          amountValue: 1,
        })
      },
    },
    class_name: {
      generatorFunction: resourceModel => {
        return constructSingleMapParamSet({
          resourceModel,
          component: GenericFieldSet,
          baseComponent: TextSelectField,
          paramMapValue: 'A',
          paramMapType: 'SINGLE-TEXT',
          paramMapComparison: '',
          paramSetLabel: 'Class',
          paramMapField: 'class_name',
          valuePrefix: 'Class',
          inputClass: '',
          defaultOptions: comparisonOptions({
            name: 'value',
            comparisonValues: ['A', 'B', 'C'],
            labels: ['A', 'B', 'C'],
          }),
        })
      },
    },
    violationstatus: {
      generatorFunction: resourceModel => {
        return constructSingleMapParamSet({
          resourceModel,
          component: GenericFieldSet,
          baseComponent: TextSelectField,
          paramMapValue: 'Open',
          paramMapType: 'SINGLE-TEXT',
          paramMapComparison: '',
          paramSetLabel: 'Status',
          paramMapField: 'violationstatus',
          valuePrefix: 'Status',
          inputClass: '',
          defaultOptions: comparisonOptions({
            name: 'value',
            comparisonValues: ['Open', 'Close'],
            labels: ['Open', 'Closed'],
          }),
        })
      },
    },
  },
})

export default HPDViolation

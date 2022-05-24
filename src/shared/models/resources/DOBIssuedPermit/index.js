import { constructSingleMapParamSet, comparisonOptions, constructCountDateParamSet } from 'shared/utilities/filterUtils'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'

const DOBIssuedPermit = () => ({
  summaryBackgroundColorClass: 'dob-red',

  resourceConstant: 'DOB_ISSUED_PERMIT',
  urlPath: 'dobissuedpermits',
  label: 'DOB Permits Issued',
  sentenceNoun: 'DOB permit issuances',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountDateParamSet({
          resourceModel,
          amountValue: 1,
        })
      },
    },
    jobdescription: {
      generatorFunction: resourceModel => {
        return constructSingleMapParamSet({
          resourceModel,
          component: GenericFieldSet,
          baseComponent: TextSelectField,
          paramMapValue: 'a1',
          paramMapType: 'SINGLE-TEXT',
          paramMapComparison: 'icontains',
          paramMapField: 'jobdescription',
          paramSetLabel: 'Type',
          valuePrefix: 'Type',
          inputClass: '',
          defaultOptions: comparisonOptions({
            name: 'value',
            comparisonValues: ['a1', 'a2', 'a3', 'nb', 'dm'],
            labels: ['A1', 'A2', 'A3', 'NB', 'DM'],
          }),
        })
      },
    },
  },
  tableRecordsCountFunction: results => {
    return results.filter(result => result.filing_status === 'INITIAL').length
  },
})

export default DOBIssuedPermit

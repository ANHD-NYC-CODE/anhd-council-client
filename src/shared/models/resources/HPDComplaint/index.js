import { constructSingleMapParamSet, comparisonOptions, constructCountDateParamSet } from 'shared/utilities/filterUtils'
import GenericFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/GenericFieldSet'
import TextSelectField from 'AdvancedSearch/FilterComponent/Field/TextSelectField'

const HPDComplaint = () => ({
  summaryBackgroundColorClass: 'hpd-orange',
  resourceConstant: 'HPD_COMPLAINT',
  urlPath: 'hpdcomplaints',
  label: 'HPD Complaints / Problems',
  dashboardLabel: 'HPD Complaints & Problems',
  sentenceNoun: 'HPD complaints & problems',
  ownResourceFilters: {
    initial: {
      generatorFunction: resourceModel => {
        return constructCountDateParamSet({
          resourceModel,
          amountValue: 1,
        })
      },
    },
    status: {
      generatorFunction: resourceModel => {
        return constructSingleMapParamSet({
          resourceModel,
          component: GenericFieldSet,
          baseComponent: TextSelectField,
          paramMapValue: 'OPEN',
          paramMapType: 'SINGLE-TEXT',
          paramMapComparison: '',
          paramSetLabel: 'Status',
          paramMapField: 'status',
          valuePrefix: 'Status',
          inputClass: '',
          defaultOptions: comparisonOptions({
            name: 'value',
            comparisonValues: ['OPEN', 'CLOSE'],
            labels: ['Open', 'Closed'],
          }),
        })
      },
    },
  },
  tableResultsConstructor: results => {
    // Directly process each record, as each record is a different problem (sometimes same complaint #)
    // No need to map over 'problems' specifically anymore as each record in this table is a standalone problem

    return results.map(record => ({
      ...record,
    }));
  },

  tableRecordsCountFunction2: results => {
    // Create a new Set to store unique complaint IDs
    const uniqueComplaintIds = new Set();

    // Iterate over the results and add each complaint ID to the Set
    results.forEach(record => {
      uniqueComplaintIds.add(record.complaintid);
    });

    // The size of the Set represents the number of unique complaints (length also an option)
    return uniqueComplaintIds.size;
  },


})

export default HPDComplaint

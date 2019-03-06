import * as a from 'AdvancedSearch/utilities/advancedSearchUtils'

import { Condition } from 'shared/classes/Condition'
import { ConditionFilter } from 'shared/classes/ConditionFilter'

import { filterMocks } from 'shared/models/__mocks__/filterMocks'

describe('convertDatasetFilterToParams', () => {
  describe('one dataset', () => {
    it('converts the object into a field string', () => {
      const object = filterMocks['HPD_VIOLATION']

      const result =
        'hpdviolations__count__gte=10,hpdviolations__approveddate__gte=2017-01-01,hpdviolations__approveddate__lte=2018-01-01'
      expect(a.convertDatasetFilterToParams(undefined, object)).toEqual(result)
    })
  })
})

describe('convertConditionMappingToQ', () => {
  describe('3 ANDS', () => {
    it('converts the object into a Q', () => {
      let condition0Filters = [filterMocks['HPD_VIOLATION'], filterMocks['DOB_VIOLATION'], filterMocks['ECB_VIOLATION']]

      const conditions = {
        '0': new Condition({ type: 'AND', filters: condition0Filters }),
      }

      const result =
        '*condition_0=AND filter_0=hpdviolations__count__gte=10,hpdviolations__approveddate__gte=2017-01-01,hpdviolations__approveddate__lte=2018-01-01 filter_1=dobviolations__count__gte=10,dobviolations__issuedate__gte=2017-01-01,dobviolations__issuedate__lte=2018-01-01 filter_2=ecbviolations__count__gte=10,ecbviolations__issuedate__gte=2017-01-01,ecbviolations__issuedate__lte=2018-01-01'
      expect(a.convertConditionMappingToQ(undefined, conditions)).toEqual(result)
    })
  })

  describe('3 ORS', () => {
    it('converts the object into a Q', () => {
      let condition0Filters = [filterMocks['HPD_VIOLATION'], filterMocks['DOB_VIOLATION'], filterMocks['ECB_VIOLATION']]

      const conditions = {
        '0': new Condition({ type: 'OR', filters: condition0Filters }),
      }
      //
      const result =
        '*condition_0=OR filter_0=hpdviolations__count__gte=10,hpdviolations__approveddate__gte=2017-01-01,hpdviolations__approveddate__lte=2018-01-01 filter_1=dobviolations__count__gte=10,dobviolations__issuedate__gte=2017-01-01,dobviolations__issuedate__lte=2018-01-01 filter_2=ecbviolations__count__gte=10,ecbviolations__issuedate__gte=2017-01-01,ecbviolations__issuedate__lte=2018-01-01'
      expect(a.convertConditionMappingToQ(undefined, conditions)).toEqual(result)
    })
  })

  describe('1 AND filter(1 1 OR filter(2', () => {
    it('converts the object into a Q', () => {
      let condition0Filters = [filterMocks['HPD_VIOLATION'], new ConditionFilter({ conditionGroup: '1' })]

      let condition1Filters = [filterMocks['DOB_VIOLATION'], filterMocks['ECB_VIOLATION']]

      const conditions = {
        '0': new Condition({ type: 'AND', filters: condition0Filters }),
        '1': new Condition({ type: 'OR', filters: condition1Filters }),
      }

      const result =
        '*condition_0=AND filter_0=hpdviolations__count__gte=10,hpdviolations__approveddate__gte=2017-01-01,hpdviolations__approveddate__lte=2018-01-01 filter_1=condition_1 *condition_1=OR filter_0=dobviolations__count__gte=10,dobviolations__issuedate__gte=2017-01-01,dobviolations__issuedate__lte=2018-01-01 filter_1=ecbviolations__count__gte=10,ecbviolations__issuedate__gte=2017-01-01,ecbviolations__issuedate__lte=2018-01-01'
      expect(a.convertConditionMappingToQ(undefined, conditions)).toEqual(result)
    })
  })

  describe('1 OR filter(1 1 AND filter(2', () => {
    it('converts the object into a Q', () => {
      let condition0Filters = [filterMocks['HPD_VIOLATION'], new ConditionFilter({ conditionGroup: '1' })]

      let condition1Filters = [filterMocks['DOB_VIOLATION'], filterMocks['ECB_VIOLATION']]

      const conditions = {
        '0': new Condition({ type: 'OR', filters: condition0Filters }),
        '1': new Condition({ type: 'AND', filters: condition1Filters }),
      }

      const result =
        '*condition_0=OR filter_0=hpdviolations__count__gte=10,hpdviolations__approveddate__gte=2017-01-01,hpdviolations__approveddate__lte=2018-01-01 filter_1=condition_1 *condition_1=AND filter_0=dobviolations__count__gte=10,dobviolations__issuedate__gte=2017-01-01,dobviolations__issuedate__lte=2018-01-01 filter_1=ecbviolations__count__gte=10,ecbviolations__issuedate__gte=2017-01-01,ecbviolations__issuedate__lte=2018-01-01'
      expect(a.convertConditionMappingToQ(undefined, conditions)).toEqual(result)
    })
  })

  describe('3 Groupings', () => {
    it('converts the object into a Q', () => {
      let condition0Filters = [filterMocks['HPD_VIOLATION'], new ConditionFilter({ conditionGroup: '1' })]

      let condition1Filters = [
        filterMocks['DOB_VIOLATION'],
        filterMocks['ECB_VIOLATION'],
        new ConditionFilter({ conditionGroup: '2' }),
      ]

      let condition2Filters = [filterMocks['HPD_COMPLAINT'], filterMocks['DOB_COMPLAINT']]

      const conditions = {
        '0': new Condition({ type: 'AND', filters: condition0Filters }),
        '1': new Condition({ type: 'OR', filters: condition1Filters }),
        '2': new Condition({ type: 'AND', filters: condition2Filters }),
      }

      const result =
        '*condition_0=AND filter_0=hpdviolations__count__gte=10,hpdviolations__approveddate__gte=2017-01-01,hpdviolations__approveddate__lte=2018-01-01 filter_1=condition_1 *condition_1=OR filter_0=dobviolations__count__gte=10,dobviolations__issuedate__gte=2017-01-01,dobviolations__issuedate__lte=2018-01-01 filter_1=ecbviolations__count__gte=10,ecbviolations__issuedate__gte=2017-01-01,ecbviolations__issuedate__lte=2018-01-01 filter_2=condition_2 *condition_2=AND filter_0=hpdcomplaints__count__gte=10,hpdcomplaints__receiveddate__gte=2017-01-01,hpdcomplaints__receiveddate__lte=2018-01-01 filter_1=dobcomplaints__count__gte=10,dobcomplaints__dateentered__gte=2017-01-01,dobcomplaints__dateentered__lte=2018-01-01'
      expect(a.convertConditionMappingToQ(undefined, conditions)).toEqual(result)
    })
  })
})
//
//   describe('rentstabilized units dataset', () => {
//     const datasets = [d.RENTSTABILIZEDUNITSLOST]
//     it('converts the 2 date field object into a field string', () => {
//       datasets.forEach(ds => {
//         const object = {
//           dataset: ds,
//           comparison: 'gte',
//           value: '10',
//           startDate: '2010',
//           endDate: '2017',
//         }
//
//         const result = `${ds.queryName}__${ds.dateField('2010')}__gt=0,${ds.queryName}__${ds.dateField('2017')}__gt=0,${
//           ds.queryName
//         }__${ds.amountField()}__gte=0.1`
//         expect(a.convertDatasetFilterToParams(undefined, object)).toEqual(result)
//       })
//     })
//
//     it('converts the 1 date value object into a field string with dataset version limit', () => {
//       datasets.forEach(ds => {
//         const object = {
//           dataset: ds,
//           comparison: 'gte',
//           value: '10',
//           startDate: '2010',
//         }
//
//         const result = `${ds.queryName}__${ds.dateField('2010')}__gt=0,${ds.queryName}__${ds.dateField('2017')}__gt=0,${
//           ds.queryName
//         }__${ds.amountField()}__gte=0.1`
//         expect(a.convertDatasetFilterToParams(undefined, object)).toEqual(result)
//       })
//     })
//   })
//
//   describe('sold for amount dataset', () => {
//     const datasets = [d.SOLDFORAMOUNT]
//     it('converts the object into a field string', () => {
//       datasets.forEach(ds => {
//         const object = {
//           dataset: ds,
//           comparison: 'gte',
//           value: '10',
//           startDate: '2017-01-01',
//           endDate: '2018-01-01',
//         }
//
//         const result = `${ds.dateField()}__gte=2017-01-01,${ds.dateField()}__lte=2018-01-01,${ds.amountField()}__gte=10`
//         expect(a.convertDatasetFilterToParams(undefined, object)).toEqual(result)
//       })
//     })
//   })
//
//   describe('sold times dataset', () => {
//     const datasets = [d.SOLDTIMES]
//     it('converts the object into a field string', () => {
//       datasets.forEach(ds => {
//         const object = {
//           dataset: ds,
//           comparison: 'gte',
//           value: '2',
//           startDate: '2017-01-01',
//           endDate: '2018-01-01',
//         }
//
//         const result = `${ds.dateField()}__gte=2017-01-01,${ds.dateField()}__lte=2018-01-01,${ds.amountField()}__gte=2`
//         expect(a.convertDatasetFilterToParams(undefined, object)).toEqual(result)
//       })
//     })
//   })
//
//   describe('foreclosure dataset', () => {
//     const datasets = [d.FORECLOSURES]
//     it('converts the object into a field string', () => {
//       datasets.forEach(ds => {
//         const object = {
//           dataset: ds,
//           comparison: 'gte',
//           value: '1',
//           startDate: '2017-01-01',
//           endDate: '2018-01-01',
//         }
//
//         const result = `${ds.queryName}__${ds.dateField()}__gte=2017-01-01,${
//           ds.queryName
//         }__${ds.dateField()}__lte=2018-01-01,${ds.queryName}__${ds.amountField()}__gte=1,${
//           ds.queryName
//         }__type=foreclosure`
//         expect(a.convertDatasetFilterToParams(undefined, object)).toEqual(result)
//       })
//     })
//   })
// })

import * as a from 'AdvancedSearch/utilities/advancedSearchUtils'

import { Condition } from 'shared/classes/Condition'
import { ConditionFilter } from 'shared/classes/ConditionFilter'

import { filterMocks } from 'shared/models/__mocks__/filterMocks'
import moment from 'moment'

const todayminus1year = moment(moment.now())
  .subtract(1, 'Y')
  .format('YYYY-MM-DD')

const todayplus1year = moment(moment.now())
  .add(1, 'Y')
  .format('YYYY-MM-DD')

describe('convertDatasetFilterToParams', () => {
  describe('one dataset', () => {
    it('converts the object into a field string', () => {
      const mock1 = filterMocks('HPD_VIOLATION')
      const result = `hpdviolations__count__gte=5,hpdviolations__approveddate__gte=${todayminus1year},hpdviolations__approveddate__lte=${todayplus1year}`
      expect(a.convertDatasetFilterToParams(undefined, mock1)).toEqual(result)
    })
  })
})

describe('convertConditionMappingToQ', () => {
  describe('3 ANDS', () => {
    it('converts the object into a Q', () => {
      const mock1 = filterMocks('HPD_VIOLATION')
      const mock2 = filterMocks('DOB_VIOLATION')
      const mock3 = filterMocks('ECB_VIOLATION')

      let condition0Filters = [mock1, mock2, mock3]

      const conditions = {
        '0': new Condition({ type: 'AND', filters: condition0Filters }),
      }

      const result = `*condition_0=AND filter_0=hpdviolations__count__gte=5,hpdviolations__approveddate__gte=${todayminus1year},hpdviolations__approveddate__lte=${todayplus1year} filter_1=dobviolations__count__gte=5,dobviolations__issuedate__gte=${todayminus1year},dobviolations__issuedate__lte=${todayplus1year} filter_2=ecbviolations__count__gte=5,ecbviolations__issuedate__gte=${todayminus1year},ecbviolations__issuedate__lte=${todayplus1year}`
      expect(a.convertConditionMappingToQ(undefined, conditions)).toEqual(result)
    })
  })

  describe('3 ORS', () => {
    it('converts the object into a Q', () => {
      const mock1 = filterMocks('HPD_VIOLATION')
      const mock2 = filterMocks('DOB_VIOLATION')
      const mock3 = filterMocks('ECB_VIOLATION')

      let condition0Filters = [mock1, mock2, mock3]

      const conditions = {
        '0': new Condition({ type: 'OR', filters: condition0Filters }),
      }
      //
      const result = `*condition_0=OR filter_0=hpdviolations__count__gte=5,hpdviolations__approveddate__gte=${todayminus1year},hpdviolations__approveddate__lte=${todayplus1year} filter_1=dobviolations__count__gte=5,dobviolations__issuedate__gte=${todayminus1year},dobviolations__issuedate__lte=${todayplus1year} filter_2=ecbviolations__count__gte=5,ecbviolations__issuedate__gte=${todayminus1year},ecbviolations__issuedate__lte=${todayplus1year}`
      expect(a.convertConditionMappingToQ(undefined, conditions)).toEqual(result)
    })
  })

  describe('1 AND filter(1 1 OR filter(2', () => {
    it('converts the object into a Q', () => {
      const mock1 = filterMocks('HPD_VIOLATION')
      const mock2 = filterMocks('DOB_VIOLATION')
      const mock3 = filterMocks('ECB_VIOLATION')

      let condition0Filters = [mock1, new ConditionFilter({ conditionGroup: '1' })]

      let condition1Filters = [mock2, mock3]

      const conditions = {
        '0': new Condition({ type: 'AND', filters: condition0Filters }),
        '1': new Condition({ type: 'OR', filters: condition1Filters }),
      }

      const result = `*condition_0=AND filter_0=hpdviolations__count__gte=5,hpdviolations__approveddate__gte=${todayminus1year},hpdviolations__approveddate__lte=${todayplus1year} filter_1=condition_1 *condition_1=OR filter_0=dobviolations__count__gte=5,dobviolations__issuedate__gte=${todayminus1year},dobviolations__issuedate__lte=${todayplus1year} filter_1=ecbviolations__count__gte=5,ecbviolations__issuedate__gte=${todayminus1year},ecbviolations__issuedate__lte=${todayplus1year}`
      expect(a.convertConditionMappingToQ(undefined, conditions)).toEqual(result)
    })
  })

  describe('1 OR filter(1 1 AND filter(2', () => {
    it('converts the object into a Q', () => {
      const mock1 = filterMocks('HPD_VIOLATION')
      const mock2 = filterMocks('DOB_VIOLATION')
      const mock3 = filterMocks('ECB_VIOLATION')

      let condition0Filters = [mock1, new ConditionFilter({ conditionGroup: '1' })]

      let condition1Filters = [mock2, mock3]

      const conditions = {
        '0': new Condition({ type: 'OR', filters: condition0Filters }),
        '1': new Condition({ type: 'AND', filters: condition1Filters }),
      }

      const result = `*condition_0=OR filter_0=hpdviolations__count__gte=5,hpdviolations__approveddate__gte=${todayminus1year},hpdviolations__approveddate__lte=${todayplus1year} filter_1=condition_1 *condition_1=AND filter_0=dobviolations__count__gte=5,dobviolations__issuedate__gte=${todayminus1year},dobviolations__issuedate__lte=${todayplus1year} filter_1=ecbviolations__count__gte=5,ecbviolations__issuedate__gte=${todayminus1year},ecbviolations__issuedate__lte=${todayplus1year}`
      expect(a.convertConditionMappingToQ(undefined, conditions)).toEqual(result)
    })
  })

  describe('3 Groupings', () => {
    it('converts the object into a Q', () => {
      const mock1 = filterMocks('HPD_VIOLATION')
      const mock2 = filterMocks('DOB_VIOLATION')
      const mock3 = filterMocks('ECB_VIOLATION')
      const mock4 = filterMocks('HPD_COMPLAINT')
      const mock5 = filterMocks('DOB_COMPLAINT')
      let condition0Filters = [mock1, new ConditionFilter({ conditionGroup: '1' })]

      let condition1Filters = [mock2, mock3, new ConditionFilter({ conditionGroup: '2' })]

      let condition2Filters = [mock4, mock5]

      const conditions = {
        '0': new Condition({ type: 'AND', filters: condition0Filters }),
        '1': new Condition({ type: 'OR', filters: condition1Filters }),
        '2': new Condition({ type: 'AND', filters: condition2Filters }),
      }

      const result = `*condition_0=AND filter_0=hpdviolations__count__gte=5,hpdviolations__approveddate__gte=${todayminus1year},hpdviolations__approveddate__lte=${todayplus1year} filter_1=condition_1 *condition_1=OR filter_0=dobviolations__count__gte=5,dobviolations__issuedate__gte=${todayminus1year},dobviolations__issuedate__lte=${todayplus1year} filter_1=ecbviolations__count__gte=5,ecbviolations__issuedate__gte=${todayminus1year},ecbviolations__issuedate__lte=${todayplus1year} filter_2=condition_2 *condition_2=AND filter_0=hpdcomplaints__count__gte=5,hpdcomplaints__receiveddate__gte=${todayminus1year},hpdcomplaints__receiveddate__lte=${todayplus1year} filter_1=dobcomplaints__count__gte=5,dobcomplaints__dateentered__gte=${todayminus1year},dobcomplaints__dateentered__lte=${todayplus1year}`
      expect(a.convertConditionMappingToQ(undefined, conditions)).toEqual(result)
    })
  })

  describe('sold for amount dataset', () => {
    it('converts the object into a Q', () => {
      const mock = filterMocks('PROPERTY_SALE_BY_AMOUNT')

      let condition0Filters = [mock]

      const conditions = {
        '0': new Condition({ type: 'AND', filters: condition0Filters }),
      }

      const result = `*condition_0=AND filter_0=acrisreallegals__documentid__docamount__gte=1000000,acrisreallegals__documentid__docdate__gte=${todayminus1year},acrisreallegals__documentid__docdate__lte=${todayplus1year}`

      expect(a.convertConditionMappingToQ(undefined, conditions)).toEqual(result)
    })
  })

  describe('sold times dataset', () => {
    it('converts the object into a field string', () => {
      const mock = filterMocks('PROPERTY_SALE_BY_COUNT')
      let condition0Filters = [mock]

      const conditions = {
        '0': new Condition({ type: 'AND', filters: condition0Filters }),
      }

      const result = `*condition_0=AND filter_0=acrisreallegals__documentid__count__gte=2,acrisreallegals__documentid__docdate__gte=${todayminus1year},acrisreallegals__documentid__docdate__lte=${todayplus1year}`
      expect(a.convertConditionMappingToQ(undefined, conditions)).toEqual(result)
    })
  })

  describe('foreclosure dataset', () => {
    const mock = filterMocks('FORECLOSURE')
    let condition0Filters = [mock]

    const conditions = {
      '0': new Condition({ type: 'AND', filters: condition0Filters }),
    }

    const result = `*condition_0=AND filter_0=lispendens__count__gte=1,lispendens__fileddate__gte=${todayminus1year},lispendens__type=foreclosure,lispendens__fileddate__lte=${todayplus1year}`
    expect(a.convertConditionMappingToQ(undefined, conditions)).toEqual(result)
  })
})

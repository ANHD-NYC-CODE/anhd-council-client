import * as a from 'shared/utilities/advancedSearchUtils'
import * as d from 'shared/constants/datasets'

describe('convertObjectToQFields', () => {
  const datasets = [d.HPDVIOLATIONS, d.DOBVIOLATIONS, d.ECBVIOLATIONS]
  describe('all datasets', () => {
    it('converts the object into a field string', () => {
      datasets.forEach(ds => {
        const object = {
          dataset: ds,
          comparison: 'gte',
          value: '10',
          startDate: '2017-01-01',
          endDate: '2018-01-01',
        }

        const result = `${ds.model}__${ds.dateField()}__gte=2017-01-01,${ds.model}__${ds.dateField()}__lte=2018-01-01,${
          ds.model
        }__${ds.amountField()}__gte=10`
        expect(a.convertObjectToQFields(object)).toEqual(result)
      })
    })
  })
})

describe('convertConditionMappingToQ', () => {
  describe('3 ANDS', () => {
    it('converts the object into a Q', () => {
      let condition0Filters = [d.HPDVIOLATIONS, d.DOBVIOLATIONS, d.ECBVIOLATIONS].map(ds => {
        return {
          dataset: ds,
          comparison: 'gte',
          value: '10',
          startDate: '2017-01-01',
          endDate: '2018-01-01',
        }
      })

      const q = [
        {
          type: 'AND',
          filters: condition0Filters,
        },
      ]

      const result =
        'condition_0=AND+group_0a=hpdviolation__approveddate__gte=2017-01-01,hpdviolation__approveddate__lte=2018-01-01,hpdviolation__count__gte=10+group_0b=dobviolation__issuedate__gte=2017-01-01,dobviolation__issuedate__lte=2018-01-01,dobviolation__count__gte=10+group_0c=ecbviolation__issuedate__gte=2017-01-01,ecbviolation__issuedate__lte=2018-01-01,ecbviolation__count__gte=10'
      expect(a.convertConditionMappingToQ(q)).toEqual(result)
    })
  })

  describe('3 ORS', () => {
    it('converts the object into a Q', () => {
      let condition0Filters = [d.HPDVIOLATIONS, d.DOBVIOLATIONS, d.ECBVIOLATIONS].map(ds => {
        return {
          dataset: ds,
          comparison: 'gte',
          value: '10',
          startDate: '2017-01-01',
          endDate: '2018-01-01',
        }
      })

      const q = [
        {
          type: 'OR',
          filters: condition0Filters,
        },
      ]

      const result =
        'condition_0=OR+group_0a=hpdviolation__approveddate__gte=2017-01-01,hpdviolation__approveddate__lte=2018-01-01,hpdviolation__count__gte=10+group_0b=dobviolation__issuedate__gte=2017-01-01,dobviolation__issuedate__lte=2018-01-01,dobviolation__count__gte=10+group_0c=ecbviolation__issuedate__gte=2017-01-01,ecbviolation__issuedate__lte=2018-01-01,ecbviolation__count__gte=10'
      expect(a.convertConditionMappingToQ(q)).toEqual(result)
    })
  })

  describe('1 AND  2 ORs', () => {
    it('converts the object into a Q', () => {
      let condition0Filters = [d.HPDVIOLATIONS].map(ds => {
        return {
          dataset: ds,
          comparison: 'gte',
          value: '10',
          startDate: '2017-01-01',
          endDate: '2018-01-01',
        }
      })
      condition0Filters.unshift({ conditionGroup: 1 })

      let condition1Filters = [d.DOBVIOLATIONS, d.ECBVIOLATIONS].map(ds => {
        return {
          dataset: ds,
          comparison: 'gte',
          value: '10',
          startDate: '2017-01-01',
          endDate: '2018-01-01',
        }
      })

      const q = [
        {
          type: 'AND',
          filters: condition0Filters,
        },
        {
          type: 'OR',
          filters: condition1Filters,
        },
      ]

      const result =
        'condition_0=AND+group_0a=*condition_1+group_0b=hpdviolation__approveddate__gte=2017-01-01,hpdviolation__approveddate__lte=2018-01-01,hpdviolation__count__gte=10+condition_1=OR+group_1a=dobviolation__issuedate__gte=2017-01-01,dobviolation__issuedate__lte=2018-01-01,dobviolation__count__gte=10+group_1b=ecbviolation__issuedate__gte=2017-01-01,ecbviolation__issuedate__lte=2018-01-01,ecbviolation__count__gte=10'
      expect(a.convertConditionMappingToQ(q)).toEqual(result)
    })
  })

  describe('1 OR 2 ANDs', () => {
    it('converts the object into a Q', () => {
      let condition0Filters = [d.HPDVIOLATIONS].map(ds => {
        return {
          dataset: ds,
          comparison: 'gte',
          value: '10',
          startDate: '2017-01-01',
          endDate: '2018-01-01',
        }
      })
      condition0Filters.unshift({ conditionGroup: 1 })

      let condition1Filters = [d.DOBVIOLATIONS, d.ECBVIOLATIONS].map(ds => {
        return {
          dataset: ds,
          comparison: 'gte',
          value: '10',
          startDate: '2017-01-01',
          endDate: '2018-01-01',
        }
      })

      const q = [
        {
          type: 'OR',
          filters: condition0Filters,
        },
        {
          type: 'AND',
          filters: condition1Filters,
        },
      ]

      const result =
        'condition_0=OR+group_0a=*condition_1+group_0b=hpdviolation__approveddate__gte=2017-01-01,hpdviolation__approveddate__lte=2018-01-01,hpdviolation__count__gte=10+condition_1=AND+group_1a=dobviolation__issuedate__gte=2017-01-01,dobviolation__issuedate__lte=2018-01-01,dobviolation__count__gte=10+group_1b=ecbviolation__issuedate__gte=2017-01-01,ecbviolation__issuedate__lte=2018-01-01,ecbviolation__count__gte=10'
      expect(a.convertConditionMappingToQ(q)).toEqual(result)
    })
  })

  describe('3 Groupings', () => {
    it('converts the object into a Q', () => {
      let condition0Filters = [d.HPDVIOLATIONS].map(ds => {
        return {
          dataset: ds,
          comparison: 'gte',
          value: '10',
          startDate: '2017-01-01',
          endDate: '2018-01-01',
        }
      })
      condition0Filters.unshift({ conditionGroup: 1 })

      let condition1Filters = [d.DOBVIOLATIONS, d.ECBVIOLATIONS].map(ds => {
        return {
          dataset: ds,
          comparison: 'gte',
          value: '10',
          startDate: '2017-01-01',
          endDate: '2018-01-01',
        }
      })
      condition1Filters.unshift({ conditionGroup: 2 })

      let condition2Filters = [d.HPDCOMPLAINTS, d.DOBCOMPLAINTS].map(ds => {
        return {
          dataset: ds,
          comparison: 'gte',
          value: '10',
          startDate: '2017-01-01',
          endDate: '2018-01-01',
        }
      })

      const q = [
        {
          type: 'AND',
          filters: condition0Filters,
        },
        {
          type: 'OR',
          filters: condition1Filters,
        },
        {
          type: 'AND',
          filters: condition2Filters,
        },
      ]

      const result =
        'condition_0=AND+group_0a=*condition_1+group_0b=hpdviolation__approveddate__gte=2017-01-01,hpdviolation__approveddate__lte=2018-01-01,hpdviolation__count__gte=10+condition_1=OR+group_1a=*condition_2+group_1b=dobviolation__issuedate__gte=2017-01-01,dobviolation__issuedate__lte=2018-01-01,dobviolation__count__gte=10+group_1c=ecbviolation__issuedate__gte=2017-01-01,ecbviolation__issuedate__lte=2018-01-01,ecbviolation__count__gte=10+condition_2=AND+group_2a=hpdcomplaint__receiveddate__gte=2017-01-01,hpdcomplaint__receiveddate__lte=2018-01-01,hpdcomplaint__count__gte=10+group_2b=dobcomplaint__dateentered__gte=2017-01-01,dobcomplaint__dateentered__lte=2018-01-01,dobcomplaint__count__gte=10'
      expect(a.convertConditionMappingToQ(q)).toEqual(result)
    })
  })
})

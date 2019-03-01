import * as a from 'AdvancedSearch/utilities/advancedSearchUtils'
import * as d from 'shared/constants/datasets'

describe('convertFilterToParams', () => {
  const datasets = [d.HPDVIOLATIONS, d.DOBVIOLATIONS, d.ECBVIOLATIONS]
  describe('multiple datasets', () => {
    it('converts the object into a field string', () => {
      datasets.forEach(ds => {
        const object = {
          dataset: ds,
          comparison: 'gte',
          value: '10',
          startDate: '2017-01-01',
          endDate: '2018-01-01',
        }

        const result = `${ds.queryName}__${ds.dateField()}__gte=2017-01-01,${
          ds.queryName
        }__${ds.dateField()}__lte=2018-01-01,${ds.queryName}__${ds.amountField()}__gte=10`
        expect(a.convertFilterToParams(object)).toEqual(result)
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

      const conditions = {
        '0': {
          type: 'AND',
          filters: condition0Filters,
        },
      }

      const result =
        '*condition_0=AND filter_0=hpdviolations__approveddate__gte=2017-01-01,hpdviolations__approveddate__lte=2018-01-01,hpdviolations__count__gte=10 filter_1=dobviolations__issuedate__gte=2017-01-01,dobviolations__issuedate__lte=2018-01-01,dobviolations__count__gte=10 filter_2=ecbviolations__issuedate__gte=2017-01-01,ecbviolations__issuedate__lte=2018-01-01,ecbviolations__count__gte=10'
      expect(a.convertConditionMappingToQ(conditions)).toEqual(result)
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

      const conditions = {
        '0': {
          type: 'OR',
          filters: condition0Filters,
        },
      }

      const result =
        '*condition_0=OR filter_0=hpdviolations__approveddate__gte=2017-01-01,hpdviolations__approveddate__lte=2018-01-01,hpdviolations__count__gte=10 filter_1=dobviolations__issuedate__gte=2017-01-01,dobviolations__issuedate__lte=2018-01-01,dobviolations__count__gte=10 filter_2=ecbviolations__issuedate__gte=2017-01-01,ecbviolations__issuedate__lte=2018-01-01,ecbviolations__count__gte=10'
      expect(a.convertConditionMappingToQ(conditions)).toEqual(result)
    })
  })

  describe('1 AND filter(1 1 OR filter(2', () => {
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

      const conditions = {
        '0': {
          type: 'AND',
          filters: condition0Filters,
        },
        '1': {
          type: 'OR',
          filters: condition1Filters,
        },
      }

      const result =
        '*condition_0=AND filter_0=condition_1 filter_1=hpdviolations__approveddate__gte=2017-01-01,hpdviolations__approveddate__lte=2018-01-01,hpdviolations__count__gte=10 *condition_1=OR filter_0=dobviolations__issuedate__gte=2017-01-01,dobviolations__issuedate__lte=2018-01-01,dobviolations__count__gte=10 filter_1=ecbviolations__issuedate__gte=2017-01-01,ecbviolations__issuedate__lte=2018-01-01,ecbviolations__count__gte=10'
      expect(a.convertConditionMappingToQ(conditions)).toEqual(result)
    })
  })

  describe('1 OR filter(1 1 AND filter(2', () => {
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

      const conditions = {
        '0': {
          type: 'OR',
          filters: condition0Filters,
        },
        '1': {
          type: 'AND',
          filters: condition1Filters,
        },
      }

      const result =
        '*condition_0=OR filter_0=condition_1 filter_1=hpdviolations__approveddate__gte=2017-01-01,hpdviolations__approveddate__lte=2018-01-01,hpdviolations__count__gte=10 *condition_1=AND filter_0=dobviolations__issuedate__gte=2017-01-01,dobviolations__issuedate__lte=2018-01-01,dobviolations__count__gte=10 filter_1=ecbviolations__issuedate__gte=2017-01-01,ecbviolations__issuedate__lte=2018-01-01,ecbviolations__count__gte=10'
      expect(a.convertConditionMappingToQ(conditions)).toEqual(result)
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

      const conditions = {
        '0': {
          type: 'AND',
          filters: condition0Filters,
        },
        '1': {
          type: 'OR',
          filters: condition1Filters,
        },
        '2': {
          type: 'AND',
          filters: condition2Filters,
        },
      }

      const result =
        '*condition_0=AND filter_0=condition_1 filter_1=hpdviolations__approveddate__gte=2017-01-01,hpdviolations__approveddate__lte=2018-01-01,hpdviolations__count__gte=10 *condition_1=OR filter_0=condition_2 filter_1=dobviolations__issuedate__gte=2017-01-01,dobviolations__issuedate__lte=2018-01-01,dobviolations__count__gte=10 filter_2=ecbviolations__issuedate__gte=2017-01-01,ecbviolations__issuedate__lte=2018-01-01,ecbviolations__count__gte=10 *condition_2=AND filter_0=hpdcomplaints__receiveddate__gte=2017-01-01,hpdcomplaints__receiveddate__lte=2018-01-01,hpdcomplaints__count__gte=10 filter_1=dobcomplaints__dateentered__gte=2017-01-01,dobcomplaints__dateentered__lte=2018-01-01,dobcomplaints__count__gte=10'
      expect(a.convertConditionMappingToQ(conditions)).toEqual(result)
    })
  })

  describe('rentstabilized units dataset', () => {
    const datasets = [d.RENTSTABILIZEDUNITSLOST]
    it('converts the object into a field string', () => {
      datasets.forEach(ds => {
        const object = {
          dataset: ds,
          comparison: 'gte',
          value: '10',
          startDate: '2017',
          endDate: '2018',
        }

        const result = `${ds.queryName}__${ds.dateField('2017')}__gt=0,${ds.queryName}__${ds.dateField('2018')}__lt=0,${
          ds.queryName
        }__${ds.amountField()}__gte=10`
        expect(a.convertFilterToParams(object)).toEqual(result)
      })
    })
  })

  describe('sold for amount dataset', () => {
    const datasets = [d.SOLDFORAMOUNT]
    it('converts the object into a field string', () => {
      datasets.forEach(ds => {
        const object = {
          dataset: ds,
          comparison: 'gte',
          value: '10',
          startDate: '2017-01-01',
          endDate: '2018-01-01',
        }

        const result = `${ds.dateField()}__gte=2017-01-01,${ds.dateField()}__lte=2018-01-01,${ds.amountField()}__gte=10`
        expect(a.convertFilterToParams(object)).toEqual(result)
      })
    })
  })
})

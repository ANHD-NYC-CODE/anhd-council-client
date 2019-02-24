import * as a from 'shared/utilities/advancedSearchUtils'
import * as d from 'shared/constants/datasets'

describe('convertFilterToParams', () => {
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

  describe('1 AND group(1) 1 OR group(2)', () => {
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

  describe('1 OR group(1) 1 AND group(2)', () => {
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

describe('convertFilterToSentence', () => {
  describe('from/to', () => {
    it('converts the object into a field string', () => {
      const object = {
        dataset: d.HPDVIOLATIONS,
        comparison: 'gte',
        value: '10',
        startDate: '2017-01-01',
        endDate: '2018-01-01',
      }

      const result = `at least 10 ${d.HPDVIOLATIONS.name} from 01/01/2017 to 01/01/2018`
      expect(a.convertFilterToSentence(object)).toEqual(result)
    })
  })

  describe('since', () => {
    it('converts the object into a field string', () => {
      const object = {
        dataset: d.HPDVIOLATIONS,
        comparison: 'gte',
        value: '10',
        startDate: '2017-01-01',
      }

      const result = `at least 10 ${d.HPDVIOLATIONS.name} since 01/01/2017`
      expect(a.convertFilterToSentence(object)).toEqual(result)
    })
  })

  describe('before', () => {
    it('converts the object into a field string', () => {
      const object = {
        dataset: d.HPDVIOLATIONS,
        comparison: 'gte',
        value: '10',
        endDate: '2018-01-01',
      }

      const result = `at least 10 ${d.HPDVIOLATIONS.name} before 01/01/2018`
      expect(a.convertFilterToSentence(object)).toEqual(result)
    })
  })
})

describe('convertConditionMappingToSentence', () => {
  describe('2 ANDS', () => {
    it('converts the object into a Q', () => {
      let condition0Filters = [d.HPDVIOLATIONS, d.DOBVIOLATIONS].map(ds => {
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
        'Show me properties that have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 and at least 10 DOB Violations from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(q)).toEqual(result)
    })
  })

  describe('2 ORs', () => {
    it('converts the object into a Q', () => {
      let condition0Filters = [d.HPDVIOLATIONS, d.DOBVIOLATIONS].map(ds => {
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
        'Show me properties that have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 or at least 10 DOB Violations from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(q)).toEqual(result)
    })
  })

  describe('1 AND group(1) 1 OR group(2)', () => {
    it('converts the object into a sentence', () => {
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
        'Show me properties that have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 and that either have at least 10 DOB Violations from 01/01/2017 to 01/01/2018 or at least 10 ECB Violations from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(q)).toEqual(result)
    })
  })

  describe('1 OR group(1) 1 AND group(2)', () => {
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
        'Show me properties that have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 or that have at least 10 DOB Violations from 01/01/2017 to 01/01/2018 and at least 10 ECB Violations from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(q)).toEqual(result)
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
        'Show me properties that have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 and that either have at least 10 DOB Violations from 01/01/2017 to 01/01/2018 or at least 10 ECB Violations from 01/01/2017 to 01/01/2018 or that have at least 10 HPD Complaints from 01/01/2017 to 01/01/2018 and at least 10 DOB Complaints from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(q)).toEqual(result)
    })
  })

  describe('4 Groupings', () => {
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
      condition2Filters.unshift({ conditionGroup: 3 })

      let condition3Filters = [d.EVICTIONS, d.HPDVIOLATIONS].map(ds => {
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
        {
          type: 'OR',
          filters: condition3Filters,
        },
      ]

      const result =
        'Show me properties that have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 and that either have at least 10 DOB Violations from 01/01/2017 to 01/01/2018 or at least 10 ECB Violations from 01/01/2017 to 01/01/2018 or that have at least 10 HPD Complaints from 01/01/2017 to 01/01/2018 and at least 10 DOB Complaints from 01/01/2017 to 01/01/2018 and that either have at least 10 Evictions from 01/01/2017 to 01/01/2018 or at least 10 HPD Violations from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(q)).toEqual(result)
    })
  })
})

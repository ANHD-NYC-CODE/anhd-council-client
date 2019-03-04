import * as a from 'AdvancedSearch/utilities/sentenceUtils'
import * as d from 'shared/constants/datasets'
import * as b from 'shared/constants/boundaries'
import { Boundary } from 'Store/AdvancedSearch/classes/Boundary'
import { HousingType } from 'Store/AdvancedSearch/classes/HousingType'
import { ParameterMapSet } from 'shared/classes/ParameterMapSet'
import { ParameterMapping } from 'shared/classes/ParameterMapping'

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
    it('converts the object into a sentence', () => {
      let condition0Filters = [d.HPDVIOLATIONS, d.DOBVIOLATIONS].map(ds => {
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
        'have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 and at least 10 DOB Violations from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('2 ORs', () => {
    it('converts the object into a sentence', () => {
      let condition0Filters = [d.HPDVIOLATIONS, d.DOBVIOLATIONS].map(ds => {
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
        'have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 or at least 10 DOB Violations from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('1 AND filter(1 1 OR filter(2', () => {
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
        'have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 and that either have at least 10 DOB Violations from 01/01/2017 to 01/01/2018 or at least 10 ECB Violations from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('1 OR filter(1 1 AND filter(2', () => {
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
        'have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 or that have at least 10 DOB Violations from 01/01/2017 to 01/01/2018 and at least 10 ECB Violations from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('3 Groupings', () => {
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
        'have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 and that either have at least 10 DOB Violations from 01/01/2017 to 01/01/2018 or at least 10 ECB Violations from 01/01/2017 to 01/01/2018 or that have at least 10 HPD Complaints from 01/01/2017 to 01/01/2018 and at least 10 DOB Complaints from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('4 Groupings', () => {
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
      condition0Filters.unshift({ conditionGroup: '1' })

      let condition1Filters = [d.DOBVIOLATIONS, d.ECBVIOLATIONS].map(ds => {
        return {
          dataset: ds,
          comparison: 'gte',
          value: '10',
          startDate: '2017-01-01',
          endDate: '2018-01-01',
        }
      })
      condition1Filters.unshift({ conditionGroup: '2' })

      let condition2Filters = [d.HPDCOMPLAINTS, d.DOBCOMPLAINTS].map(ds => {
        return {
          dataset: ds,
          comparison: 'gte',
          value: '10',
          startDate: '2017-01-01',
          endDate: '2018-01-01',
        }
      })
      condition2Filters.unshift({ conditionGroup: '3' })

      let condition3Filters = [d.EVICTIONS, d.HPDVIOLATIONS].map(ds => {
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
        '3': {
          type: 'OR',
          filters: condition3Filters,
        },
      }

      const result =
        'have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 and that either have at least 10 DOB Violations from 01/01/2017 to 01/01/2018 or at least 10 ECB Violations from 01/01/2017 to 01/01/2018 or that have at least 10 HPD Complaints from 01/01/2017 to 01/01/2018 and at least 10 DOB Complaints from 01/01/2017 to 01/01/2018 and that either have at least 10 Evictions from 01/01/2017 to 01/01/2018 or at least 10 HPD Violations from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('Rent Stabilized Units Lost', () => {
    it('converts the object into a sentence', () => {
      let condition0Filters = [d.RENTSTABILIZEDUNITSLOST].map(ds => {
        return {
          dataset: ds,
          comparison: 'gte',
          value: '10',
          startDate: '2017',
          endDate: '2018',
        }
      })

      const conditions = {
        '0': {
          type: 'AND',
          filters: condition0Filters,
        },
      }

      const result = 'have lost at least 10% of their Rent Stabilized Units from 2017 to 2018.'
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('Sold For $', () => {
    it('converts the object into a sentence', () => {
      let condition0Filters = [d.SOLDFORAMOUNT, d.HPDVIOLATIONS].map(ds => {
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
        'have sold for at least $10 from 01/01/2017 to 01/01/2018 and at least 10 HPD Violations from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('Sold Times', () => {
    it('converts the object into a sentence', () => {
      let condition0Filters = [d.SOLDTIMES, d.HPDVIOLATIONS].map(ds => {
        return {
          dataset: ds,
          comparison: 'gte',
          value: '2',
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
        'have been sold at least 2 times from 01/01/2017 to 01/01/2018 and at least 2 HPD Violations from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })
})

describe('convertBoundariesToSentence', () => {
  describe('1 boundary', () => {
    it('converts the object into a sentence', () => {
      const boundaries = [new Boundary('COUNCIL', 1)]

      const result = 'in council district 1'

      expect(a.convertBoundariesToSentence(boundaries)).toEqual(result)
    })
  })

  describe('2 boundaries', () => {
    it('converts the object into a sentence', () => {
      const boundaries = [new Boundary('COUNCIL', 1), new Boundary('COMMUNITY', 2)]

      const result = 'in council district 1 and community board 2'

      expect(a.convertBoundariesToSentence(boundaries)).toEqual(result)
    })
  })
})

describe('convertHousingTypesToSentence', () => {
  describe('1 ht', () => {
    it('converts the object into a sentence', () => {
      const housingType1 = new HousingType('SMALL_HOMES', {
        unitsres: new ParameterMapSet(null, [new ParameterMapping('unitsres', 'lte', '4')]),
      })
      const housingTypes = [housingType1]

      const result = 'Small Home properties with at most 4 units'

      expect(a.convertHousingTypesToSentence(housingTypes)).toEqual(result)
    })
  })

  describe('2 hts', () => {
    it('converts the object into a sentence', () => {
      const housingType1 = new HousingType('SMALL_HOMES', {})
      const housingType2 = new HousingType('RENT_REGULATED', {})
      const housingTypes = [housingType1, housingType2]

      const result = 'Small Home properties and Rent Regulated properties'

      expect(a.convertHousingTypesToSentence(housingTypes)).toEqual(result)
    })
  })
})

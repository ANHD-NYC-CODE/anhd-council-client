import * as a from 'shared/utilities/sentenceUtils'
import * as c from 'shared/constants'
import Geography from 'shared/classes/Geography'
import Filter from 'shared/classes/Filter'
import ParamMap from 'shared/classes/ParamMap'
import Condition from 'shared/classes/Condition'
import ConditionFilter from 'shared/classes/ConditionFilter'
import { filterMocks } from 'shared/models/__mocks__/filterMocks'
import { rangeComparisonOptions } from 'shared/utilities/filterUtils'
import moment from 'moment'

const rawStartDate = c.CUSTOM_DEFAULT_START_DATE
const rawEndDate = c.CUSTOM_DEFAULT_END_DATE

const startDate = moment(rawStartDate, 'YYYY-MM-DD').format('MM/DD/YYYY')
const endDate = moment(rawEndDate, 'YYYY-MM-DD').format('MM/DD/YYYY')

describe('convertFilterToSentence', () => {
  describe('from/to', () => {
    it('convertFilterToSentence - converts the object into a field string', () => {
      const object = filterMocks('HPD_VIOLATION')
      const result = `have at least 5 HPD violations between ${startDate} and ${endDate}`
      expect(a.convertFilterToSentence(object)).toEqual(result)
    })
  })

  describe('sentencePosition', () => {
    it('sentence position - converts the object into a field string', () => {
      const object = new Filter({
        modelConstant: 'HPD_VIOLATION',
        paramSets: {
          hpdviolations: {
            paramMaps: [
              new ParamMap({
                resourceModel: filterMocks('HPD_VIOLATION'),
                type: 'AMOUNT',
                role: 'PRIMARY',
                field: 'hpdviolations__count',
                comparison: 'gte',
                value: 5,
              }),
              new ParamMap({
                resourceModel: filterMocks('HPD_VIOLATION'),
                type: 'DATE',
                role: 'LIMITER',
                field: 'hpdviolations__approveddate',
                defaultOptions: rangeComparisonOptions({
                  comparisonValues: ['gte', 'between', 'lte'],
                  labels: ['Since', 'Between', 'Before'],
                  rangeKey: 'DATE',
                }),
                comparison: 'gte',
                value: rawStartDate,
              }),
              new ParamMap({
                resourceModel: filterMocks('HPD_VIOLATION'),
                type: 'TEXT',
                role: '',
                valuePrefix: 'class',
                field: 'hpdviolations__class_name',
                comparison: '',
                value: 'A',
              }),
            ],
          },
        },
      })

      const result = `have at least 5 HPD violations (class A) since ${startDate}`
      expect(a.convertFilterToSentence(object)).toEqual(result)
    })
  })
})

describe('convertGeographiesToSentence', () => {
  describe('1 geography', () => {
    it('converts the object into a sentence', () => {
      const geographies = [new Geography('COUNCIL', 1)]

      const result = 'in council district 1'

      expect(a.convertGeographiesToSentence(geographies)).toEqual(result)
    })
  })
})

describe('process property housing type filter', () => {
  describe('1 ht', () => {
    it('converts the object into a sentence', () => {
      const object = filterMocks('PROPERTY')
      const result = 'All properties'

      expect(a.convertFilterToSentence(object)).toEqual(result)
    })
  })

  describe('Subsidized Housing', () => {
    it('converts the object into a sentence', () => {
      const object = filterMocks('PROPERTY')
      object.paramSets['initial'].paramMaps.find(pm => pm.field === 'housingtype').value = 'rr'

      object.paramSets['housingType_rr_2'].create()
      const result = `Subsidized Housing properties (expiring after ${startDate})`

      expect(a.convertFilterToSentence(object)).toEqual(result)
    })

    it('converts the object into a sentence', () => {
      const object = filterMocks('PROPERTY')
      object.paramSets['initial'].paramMaps.find(pm => pm.field === 'housingtype').value = 'rr'

      object.paramSets['housingType_rr_2'].createAll()

      const result = `Subsidized Housing properties (expiring between ${startDate} and ${endDate})`

      expect(a.convertFilterToSentence(object)).toEqual(result)
    })

    it('converts the object into a sentence', () => {
      const object = filterMocks('PROPERTY')
      object.paramSets['initial'].paramMaps.find(pm => pm.field === 'housingtype').value = 'rr'
      object.paramSets['housingType_rr_1'].createAll()
      object.paramSets['housingType_rr_2'].createAll()
      object.paramSets['housingType_rr_1'].paramMaps.find(pm => pm.field === 'subsidyprograms__programname').value =
        'LIHCT,J-51,421-a'

      const result = `Subsidized Housing properties (LIHCT, J-51, or 421-a, expiring between ${startDate} and ${endDate})`

      expect(a.convertFilterToSentence(object)).toEqual(result)
    })
  })

  describe('Rent Stabilized', () => {
    it('converts the object into a sentence', () => {
      const object = filterMocks('PROPERTY')
      object.paramSets['initial'].paramMaps.find(pm => pm.field === 'housingtype').value = 'rs'

      object.paramSets['housingType_rs_1'].createAll()

      const result = 'Rent Stabilized properties (at least 25% units losts, between 2007 and 2017)'

      expect(a.convertFilterToSentence(object)).toEqual(result)
    })
  })
})

describe('convertConditionMappingToSentence', () => {
  describe('2 ANDS', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          type: 'AND',
          filters: [filterMocks('HPD_VIOLATION'), filterMocks('DOB_VIOLATION')],
        }),
      }

      const result = ` that have at least 5 HPD violations between ${startDate} and ${endDate} and have at least 5 DOB violations between ${startDate} and ${endDate}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('2 ORs', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          type: 'OR',
          filters: [filterMocks('HPD_VIOLATION'), filterMocks('DOB_VIOLATION')],
        }),
      }

      const result = ` that either have at least 5 HPD violations between ${startDate} and ${endDate} or have at least 5 DOB violations between ${startDate} and ${endDate}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('1 AND filter(1 1 OR filter(2', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks('HPD_VIOLATION'), new ConditionFilter({ conditionGroup: '1' })],
        }),
        '1': new Condition({
          key: '1',
          type: 'OR',
          filters: [filterMocks('DOB_VIOLATION'), filterMocks('ECB_VIOLATION')],
        }),
      }

      const result = ` that have at least 5 HPD violations between ${startDate} and ${endDate} and that either have at least 5 DOB violations between ${startDate} and ${endDate} or have at least 5 ECB violations between ${startDate} and ${endDate}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('1 OR filter(1 1 AND filter(2', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'OR',
          filters: [filterMocks('HPD_VIOLATION'), new ConditionFilter({ conditionGroup: '1' })],
        }),
        '1': new Condition({
          key: '1',
          type: 'AND',
          filters: [filterMocks('DOB_VIOLATION'), filterMocks('ECB_VIOLATION')],
        }),
      }

      const result = ` that either have at least 5 HPD violations between ${startDate} and ${endDate} or that have at least 5 DOB violations between ${startDate} and ${endDate} and have at least 5 ECB violations between ${startDate} and ${endDate}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('3 Groupings', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks('HPD_VIOLATION'), new ConditionFilter({ conditionGroup: '1' })],
        }),
        '2': new Condition({
          key: '2',
          type: 'AND',
          filters: [filterMocks('HPD_COMPLAINT'), filterMocks('DOB_COMPLAINT')],
        }),
        '1': new Condition({
          key: '1',
          type: 'OR',
          filters: [
            filterMocks('DOB_VIOLATION'),
            filterMocks('ECB_VIOLATION'),
            new ConditionFilter({ conditionGroup: '2' }),
          ],
        }),
      }

      const result = ` that have at least 5 HPD violations between ${startDate} and ${endDate} and that either have at least 5 DOB violations between ${startDate} and ${endDate} or have at least 5 ECB violations between ${startDate} and ${endDate} or that have at least 5 HPD complaints between ${startDate} and ${endDate} and have at least 5 DOB complaints between ${startDate} and ${endDate}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('4 Groupings', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks('HPD_VIOLATION'), new ConditionFilter({ conditionGroup: '1' })],
        }),
        '3': new Condition({
          key: '1',
          type: 'OR',
          filters: [filterMocks('EVICTION'), filterMocks('HPD_VIOLATION')],
        }),
        '2': new Condition({
          key: '2',
          type: 'AND',
          filters: [
            filterMocks('HPD_COMPLAINT'),
            filterMocks('DOB_COMPLAINT'),
            new ConditionFilter({ conditionGroup: '3' }),
          ],
        }),
        '1': new Condition({
          key: '1',
          type: 'OR',
          filters: [
            filterMocks('DOB_VIOLATION'),
            filterMocks('ECB_VIOLATION'),
            new ConditionFilter({ conditionGroup: '2' }),
          ],
        }),
      }

      const result = ` that have at least 5 HPD violations between ${startDate} and ${endDate} and that either have at least 5 DOB violations between ${startDate} and ${endDate} or have at least 5 ECB violations between ${startDate} and ${endDate} or that have at least 5 HPD complaints between ${startDate} and ${endDate} and have at least 5 DOB complaints between ${startDate} and ${endDate} and that either have at least 1 Marshal Eviction between ${startDate} and ${endDate} or have at least 5 HPD violations between ${startDate} and ${endDate}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('2 Groupings on 1 Condition', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [
            filterMocks('HPD_VIOLATION'),
            new ConditionFilter({ conditionGroup: '1' }),
            new ConditionFilter({ conditionGroup: '2' }),
          ],
        }),
        '2': new Condition({
          key: '2',
          type: 'OR',
          filters: [filterMocks('HPD_COMPLAINT'), filterMocks('DOB_COMPLAINT')],
        }),
        '1': new Condition({
          key: '1',
          type: 'OR',
          filters: [filterMocks('DOB_VIOLATION'), filterMocks('ECB_VIOLATION')],
        }),
      }

      const result = ` that have at least 5 HPD violations between ${startDate} and ${endDate} and that either have at least 5 DOB violations between ${startDate} and ${endDate} or have at least 5 ECB violations between ${startDate} and ${endDate} and that either have at least 5 HPD complaints between ${startDate} and ${endDate} or have at least 5 DOB complaints between ${startDate} and ${endDate}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('Sold For $', () => {
    it('converts the object into a sentence', () => {
      const filter = filterMocks('ACRIS_REAL_MASTER')
      filter.paramSets['docamount'].create()
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filter],
        }),
      }

      const result = ` that have at least 1 Sale (at least $1000000) between ${startDate} and ${endDate}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('Sold Times', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks('ACRIS_REAL_MASTER')],
        }),
      }

      const result = ` that have at least 1 Sale between ${startDate} and ${endDate}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('foreclosures', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks('FORECLOSURE')],
        }),
      }

      const result = ` that have at least 1 foreclosure filing between ${startDate} and ${endDate}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('evictions', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks('EVICTION')],
        }),
      }

      const result = ` that have at least 1 Marshal Eviction between ${startDate} and ${endDate}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('DOB Issued Permits', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks('DOB_ISSUED_PERMIT')],
        }),
      }

      const result = ` that have at least 5 DOB permit issuances between ${startDate} and ${endDate}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('DOB permit applications', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks('DOB_FILED_PERMIT')],
        }),
      }

      const result = ` that have at least 5 DOB permit applications between ${startDate} and ${endDate}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('litigations', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks('HOUSING_LITIGATION')],
        }),
      }

      const result = ` that have at least 1 litigation between ${startDate} and ${endDate}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })
})

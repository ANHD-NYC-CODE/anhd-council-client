import * as a from 'shared/utilities/sentenceUtils'
import Geography from 'shared/classes/Geography'
import Filter from 'shared/classes/Filter'
import ParamMap from 'shared/classes/ParamMap'
import Condition from 'shared/classes/Condition'
import ConditionFilter from 'shared/classes/ConditionFilter'
import { filterMocks } from 'shared/models/__mocks__/filterMocks'
import StandardizedInput from 'shared/classes/StandardizedInput'
import moment from 'moment'

const todayminus1year = moment(moment.now())
  .subtract(1, 'Y')
  .format('MM/DD/YYYY')

const todayplus1year = moment(moment.now())
  .add(1, 'Y')
  .format('MM/DD/YYYY')

describe('convertFilterToSentence', () => {
  describe('from/to', () => {
    it('convertFilterToSentence - converts the object into a field string', () => {
      const object = filterMocks('HPD_VIOLATION')
      const result = `have at least 5 HPD violations between ${todayminus1year} and ${todayplus1year}`
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
                comparison: 'gte',
                value: todayminus1year,
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

      const result = `have at least 5 HPD violations (class A) after ${todayminus1year}`
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

  describe('2 geographies', () => {
    it('converts the object into a sentence', () => {
      const geographies = [new Geography('COUNCIL', 1), new Geography('COMMUNITY', 2)]

      const result = 'in council district 1 and community district 2'

      expect(a.convertGeographiesToSentence(geographies)).toEqual(result)
    })
  })
})

describe('process property housing type filter', () => {
  describe('1 ht', () => {
    it('converts the object into a sentence', () => {
      const object = filterMocks('PROPERTY')
      const result = 'all properties'

      expect(a.convertFilterToSentence(object)).toEqual(result)
    })
  })

  describe('Subsidized Housing', () => {
    it('converts the object into a sentence', () => {
      const object = filterMocks('PROPERTY')
      object.paramSets['initial'].paramMaps.find(pm => pm.field === 'housingtype').value = 'rr'

      object.paramSets['housingType_rr_2'].create()
      const result = `subsidized housing properties (expiring after ${moment(moment.now())
        .subtract(1, 'Y')
        .format('MM/DD/YYYY')})`

      expect(a.convertFilterToSentence(object)).toEqual(result)
    })

    it('converts the object into a sentence', () => {
      const object = filterMocks('PROPERTY')
      object.paramSets['initial'].paramMaps.find(pm => pm.field === 'housingtype').value = 'rr'

      object.paramSets['housingType_rr_2'].createAll()

      const result = `subsidized housing properties (expiring between ${moment(
        moment(moment.now()).subtract(1, 'Y')
      ).format('MM/DD/YYYY')} and ${moment(moment.now())
        .add(1, 'Y')
        .format('MM/DD/YYYY')})`

      expect(a.convertFilterToSentence(object)).toEqual(result)
    })

    it('converts the object into a sentence', () => {
      const object = filterMocks('PROPERTY')
      object.paramSets['initial'].paramMaps.find(pm => pm.field === 'housingtype').value = 'rr'
      object.paramSets['housingType_rr_1'].createAll()
      object.paramSets['housingType_rr_2'].createAll()
      object.paramSets['housingType_rr_1'].paramMaps.find(pm => pm.field === 'coresubsidyrecord__programname').value =
        'LIHCT,J-51,421-a'

      const result = `subsidized housing properties (LIHCT, J-51, or 421-a, expiring between ${moment(moment.now())
        .subtract(1, 'Y')
        .format('MM/DD/YYYY')} and ${moment(moment.now())
        .add(1, 'Y')
        .format('MM/DD/YYYY')})`

      expect(a.convertFilterToSentence(object)).toEqual(result)
    })
  })

  describe('Rent Stabilized', () => {
    it('converts the object into a sentence', () => {
      const object = filterMocks('PROPERTY')
      object.paramSets['initial'].paramMaps.find(pm => pm.field === 'housingtype').value = 'rs'

      object.paramSets['housingType_rs'].createAll()

      const result = 'rent stabilized properties (at least 25% units losts, between 2007 and 2017)'

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

      const result = ` that have at least 5 HPD violations between ${todayminus1year} and ${todayplus1year} and have at least 5 DOB violations between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` that either have at least 5 HPD violations between ${todayminus1year} and ${todayplus1year} or have at least 5 DOB violations between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` that have at least 5 HPD violations between ${todayminus1year} and ${todayplus1year} and that either have at least 5 DOB violations between ${todayminus1year} and ${todayplus1year} or have at least 5 ECB violations between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` that either have at least 5 HPD violations between ${todayminus1year} and ${todayplus1year} or that have at least 5 DOB violations between ${todayminus1year} and ${todayplus1year} and have at least 5 ECB violations between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` that have at least 5 HPD violations between ${todayminus1year} and ${todayplus1year} and that either have at least 5 DOB violations between ${todayminus1year} and ${todayplus1year} or have at least 5 ECB violations between ${todayminus1year} and ${todayplus1year} or that have at least 5 HPD complaints between ${todayminus1year} and ${todayplus1year} and have at least 5 DOB complaints between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` that have at least 5 HPD violations between ${todayminus1year} and ${todayplus1year} and that either have at least 5 DOB violations between ${todayminus1year} and ${todayplus1year} or have at least 5 ECB violations between ${todayminus1year} and ${todayplus1year} or that have at least 5 HPD complaints between ${todayminus1year} and ${todayplus1year} and have at least 5 DOB complaints between ${todayminus1year} and ${todayplus1year} and that either have at least 1 eviction between ${todayminus1year} and ${todayplus1year} or have at least 5 HPD violations between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` that have at least 5 HPD violations between ${todayminus1year} and ${todayplus1year} and that either have at least 5 DOB violations between ${todayminus1year} and ${todayplus1year} or have at least 5 ECB violations between ${todayminus1year} and ${todayplus1year} and that either have at least 5 HPD complaints between ${todayminus1year} and ${todayplus1year} or have at least 5 DOB complaints between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` that have at least 1 sale (at least $1000000) between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` that have at least 1 sale between ${todayminus1year} and ${todayplus1year}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('foreclosures', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks('LISPENDEN')],
        }),
      }

      const result = ` that have at least 1 foreclosure between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` that have at least 1 eviction between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` that have at least 5 DOB permit issuances between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` that have at least 5 DOB permit applications between ${todayminus1year} and ${todayplus1year}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('repair litigations', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks('HOUSING_LITIGATION')],
        }),
      }

      const result = ` that have at least 1 repair litigation between ${todayminus1year} and ${todayplus1year}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })
})

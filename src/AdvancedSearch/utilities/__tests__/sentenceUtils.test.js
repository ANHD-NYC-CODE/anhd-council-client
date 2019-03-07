import * as a from 'AdvancedSearch/utilities/sentenceUtils'
import * as d from 'shared/constants/datasets'
import { Boundary } from 'Store/AdvancedSearch/classes/Boundary'
import { HousingType } from 'Store/AdvancedSearch/classes/HousingType'
import { ParameterMapSet } from 'shared/classes/ParameterMapSet'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
import { Condition } from 'shared/classes/Condition'
import { ConditionFilter } from 'shared/classes/ConditionFilter'
import { LanguageModule } from 'shared/classes/LanguageModule'
import { filterMocks } from 'shared/models/__mocks__/filterMocks'
import moment from 'moment'

describe('convertFilterToSentence', () => {
  describe('from/to', () => {
    it('converts the object into a field string', () => {
      const object = filterMocks['HPD_VIOLATION']

      const result = `at least 10 ${d.HPDVIOLATIONS.name} from 01/01/2017 to 01/01/2018`
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
          filters: [filterMocks['HPD_VIOLATION'], filterMocks['DOB_VIOLATION']],
        }),
      }

      const result =
        'have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 and at least 10 DOB Violations from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('2 ORs', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          type: 'OR',
          filters: [filterMocks['HPD_VIOLATION'], filterMocks['DOB_VIOLATION']],
        }),
      }

      const result =
        'have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 or at least 10 DOB Violations from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('1 AND filter(1 1 OR filter(2', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks['HPD_VIOLATION'], new ConditionFilter({ conditionGroup: '1' })],
        }),
        '1': new Condition({
          key: '1',
          type: 'OR',
          filters: [filterMocks['DOB_VIOLATION'], filterMocks['ECB_VIOLATION']],
        }),
      }

      const result =
        'have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 and that either have at least 10 DOB Violations from 01/01/2017 to 01/01/2018 or at least 10 ECB Violations from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('1 OR filter(1 1 AND filter(2', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'OR',
          filters: [filterMocks['HPD_VIOLATION'], new ConditionFilter({ conditionGroup: '1' })],
        }),
        '1': new Condition({
          key: '1',
          type: 'AND',
          filters: [filterMocks['DOB_VIOLATION'], filterMocks['ECB_VIOLATION']],
        }),
      }

      const result =
        'have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 or that have at least 10 DOB Violations from 01/01/2017 to 01/01/2018 and at least 10 ECB Violations from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('3 Groupings', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks['HPD_VIOLATION'], new ConditionFilter({ conditionGroup: '1' })],
        }),
        '2': new Condition({
          key: '2',
          type: 'AND',
          filters: [filterMocks['HPD_COMPLAINT'], filterMocks['DOB_COMPLAINT']],
        }),
        '1': new Condition({
          key: '1',
          type: 'OR',
          filters: [
            filterMocks['DOB_VIOLATION'],
            filterMocks['ECB_VIOLATION'],
            new ConditionFilter({ conditionGroup: '2' }),
          ],
        }),
      }

      const result =
        'have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 and that either have at least 10 DOB Violations from 01/01/2017 to 01/01/2018 or at least 10 ECB Violations from 01/01/2017 to 01/01/2018 or that have at least 10 HPD Complaints from 01/01/2017 to 01/01/2018 and at least 10 DOB Complaints from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('4 Groupings', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks['HPD_VIOLATION'], new ConditionFilter({ conditionGroup: '1' })],
        }),
        '3': new Condition({
          key: '1',
          type: 'OR',
          filters: [filterMocks['EVICTION'], filterMocks['HPD_VIOLATION']],
        }),
        '2': new Condition({
          key: '2',
          type: 'AND',
          filters: [
            filterMocks['HPD_COMPLAINT'],
            filterMocks['DOB_COMPLAINT'],
            new ConditionFilter({ conditionGroup: '3' }),
          ],
        }),
        '1': new Condition({
          key: '1',
          type: 'OR',
          filters: [
            filterMocks['DOB_VIOLATION'],
            filterMocks['ECB_VIOLATION'],
            new ConditionFilter({ conditionGroup: '2' }),
          ],
        }),
      }

      const result =
        'have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 and that either have at least 10 DOB Violations from 01/01/2017 to 01/01/2018 or at least 10 ECB Violations from 01/01/2017 to 01/01/2018 or that have at least 10 HPD Complaints from 01/01/2017 to 01/01/2018 and at least 10 DOB Complaints from 01/01/2017 to 01/01/2018 and that either have at least 10 Evictions from 01/01/2017 to 01/01/2018 or at least 10 HPD Violations from 01/01/2017 to 01/01/2018.'
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
            filterMocks['HPD_VIOLATION'],
            new ConditionFilter({ conditionGroup: '1' }),
            new ConditionFilter({ conditionGroup: '2' }),
          ],
        }),
        '2': new Condition({
          key: '2',
          type: 'OR',
          filters: [filterMocks['HPD_COMPLAINT'], filterMocks['DOB_COMPLAINT']],
        }),
        '1': new Condition({
          key: '1',
          type: 'OR',
          filters: [filterMocks['DOB_VIOLATION'], filterMocks['ECB_VIOLATION']],
        }),
      }

      const result =
        'have at least 10 HPD Violations from 01/01/2017 to 01/01/2018 and that either have at least 10 DOB Violations from 01/01/2017 to 01/01/2018 or at least 10 ECB Violations from 01/01/2017 to 01/01/2018 and that either have at least 10 HPD Complaints from 01/01/2017 to 01/01/2018 or at least 10 DOB Complaints from 01/01/2017 to 01/01/2018.'
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  //
  //   describe('Sold For $', () => {
  //     it('converts the object into a sentence', () => {
  //       let condition0Filters = [d.SOLDFORAMOUNT, d.HPDVIOLATIONS].map(ds => {
  //         return {
  //           dataset: ds,
  //           comparison: 'gte',
  //           value: '10',
  //           startDate: '2017-01-01',
  //           endDate: '2018-01-01',
  //         }
  //       })
  //
  //       const conditions = {
  //         '0': {
  //           type: 'AND',
  //           filters: condition0Filters,
  //         },
  //       }
  //
  //       const result =
  //         'have sold for at least $10 from 01/01/2017 to 01/01/2018 and at least 10 HPD Violations from 01/01/2017 to 01/01/2018.'
  //       expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
  //     })
  //   })
  //
  //   describe('Sold Times', () => {
  //     it('converts the object into a sentence', () => {
  //       let condition0Filters = [d.SOLDTIMES, d.HPDVIOLATIONS].map(ds => {
  //         return {
  //           dataset: ds,
  //           comparison: 'gte',
  //           value: '2',
  //           startDate: '2017-01-01',
  //           endDate: '2018-01-01',
  //         }
  //       })
  //
  //       const conditions = {
  //         '0': {
  //           type: 'AND',
  //           filters: condition0Filters,
  //         },
  //       }
  //
  //       const result =
  //         'have been sold at least 2 times from 01/01/2017 to 01/01/2018 and at least 2 HPD Violations from 01/01/2017 to 01/01/2018.'
  //       expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
  //     })
  //   })
  // })
  //
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
        const housingType1 = new HousingType({
          housingType: 'SMALL_HOMES',
        })
        housingType1.paramsObject['unitsres'].create()
        const housingTypes = [housingType1]

        const result = 'Small Home properties with at most 6 units'

        expect(a.convertHousingTypesToSentence(housingTypes)).toEqual(result)
      })
    })

    describe('2 hts', () => {
      it('converts the object into a sentence', () => {
        const housingType1 = new HousingType({ housingType: 'SMALL_HOMES' })
        const housingType2 = new HousingType({ housingType: 'RENT_REGULATED' })
        const housingTypes = [housingType1, housingType2]
        const result = 'Small Home properties and Rent Regulated properties'

        expect(a.convertHousingTypesToSentence(housingTypes)).toEqual(result)
      })
    })

    describe('Rent Regulated', () => {
      it('converts the object into a sentence', () => {
        const housingType1 = new HousingType({
          housingType: 'RENT_REGULATED',
        })
        housingType1.paramsObject['coresubsidyrecord__enddate'].create()
        const housingTypes = [housingType1]

        const result = `Rent Regulated properties expiring before ${moment(moment.now())
          .add(1, 'Y')
          .format('YYYY-MM-DD')}`

        expect(a.convertHousingTypesToSentence(housingTypes)).toEqual(result)
      })

      it('converts the object into a sentence', () => {
        const housingType1 = new HousingType({
          housingType: 'RENT_REGULATED',
        })
        housingType1.paramsObject['coresubsidyrecord__enddate'].createAll()
        // housingType1.paramsObject['coresubsidyrecord__enddate'].create()
        const housingTypes = [housingType1]

        const result = `Rent Regulated properties expiring between ${moment(moment.now())
          .subtract(1, 'Y')
          .format('YYYY-MM-DD')} and ${moment(moment.now())
          .add(1, 'Y')
          .format('YYYY-MM-DD')}`

        expect(a.convertHousingTypesToSentence(housingTypes)).toEqual(result)
      })

      it('converts the object into a sentence', () => {
        const housingType1 = new HousingType({
          housingType: 'RENT_REGULATED',
        })
        housingType1.paramsObject['coresubsidyrecord__programname'].create()
        housingType1.paramsObject['coresubsidyrecord__programname'].paramMaps[0].update({
          e: { name: 'value', value: 'LIHCT,J-51,421-a' },
        })
        housingType1.paramsObject['coresubsidyrecord__enddate'].createAll()

        // housingType1.paramsObject['coresubsidyrecord__enddate'].create()
        const housingTypes = [housingType1]

        const result = `Rent Regulated properties expiring between ${moment(moment.now())
          .subtract(1, 'Y')
          .format('YYYY-MM-DD')} and ${moment(moment.now())
          .add(1, 'Y')
          .format('YYYY-MM-DD')}`

        expect(a.convertHousingTypesToSentence(housingTypes)).toEqual(result)
      })
    })
  })
})

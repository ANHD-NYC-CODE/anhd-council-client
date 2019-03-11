import * as a from 'AdvancedSearch/utilities/sentenceUtils'
import * as d from 'shared/constants/datasets'
import { Boundary } from 'shared/classes/Boundary'
import { HousingType } from 'shared/classes/HousingType'
import { Condition } from 'shared/classes/Condition'
import { ConditionFilter } from 'shared/classes/ConditionFilter'
import { filterMocks } from 'shared/models/__mocks__/filterMocks'
import { StandardizedInput } from 'shared/classes/StandardizedInput'
import moment from 'moment'

const todayminus1year = moment(moment.now())
  .subtract(1, 'Y')
  .format('MM/DD/YYYY')

const todayplus1year = moment(moment.now())
  .add(1, 'Y')
  .format('MM/DD/YYYY')

describe('convertFilterToSentence', () => {
  describe('from/to', () => {
    it('converts the object into a field string', () => {
      const object = filterMocks('HPD_VIOLATION')

      const result = ` have at least 5 ${d.HPDVIOLATIONS.name} between ${todayminus1year} and ${todayplus1year}`
      expect(a.convertFilterToSentence(object)).toEqual(result)
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
      const housingType1 = new HousingType({
        housingType: 'SMALL_HOMES',
      })
      housingType1.paramsObject['unitsres'].create()
      const housingTypes = [housingType1]

      const result = 'small home properties with at most 6 units'

      expect(a.convertHousingTypesToSentence(housingTypes)).toEqual(result)
    })
  })

  describe('2 hts', () => {
    it('converts the object into a sentence', () => {
      const housingType1 = new HousingType({ housingType: 'SMALL_HOMES' })
      const housingType2 = new HousingType({ housingType: 'RENT_REGULATED' })
      const housingTypes = [housingType1, housingType2]
      const result = 'small home properties and rent regulated properties'

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

      const result = `rent regulated properties expiring before ${moment(moment.now())
        .add(1, 'Y')
        .format('MM/DD/YYYY')}`

      expect(a.convertHousingTypesToSentence(housingTypes)).toEqual(result)
    })

    it('converts the object into a sentence', () => {
      const housingType1 = new HousingType({
        housingType: 'RENT_REGULATED',
      })
      housingType1.paramsObject['coresubsidyrecord__enddate'].createAll()
      const housingTypes = [housingType1]

      const result = `rent regulated properties expiring between ${moment(moment.now()).format(
        'MM/DD/YYYY'
      )} and ${moment(moment.now())
        .add(1, 'Y')
        .format('MM/DD/YYYY')}`

      expect(a.convertHousingTypesToSentence(housingTypes)).toEqual(result)
    })

    it('converts the object into a sentence', () => {
      const housingType1 = new HousingType({
        housingType: 'RENT_REGULATED',
      })
      housingType1.paramsObject['coresubsidyrecord__enddate'].createAll()
      housingType1.paramsObject['coresubsidyrecord__programname'].create()
      housingType1.paramsObject['coresubsidyrecord__programname'].paramMaps[0].update({
        e: new StandardizedInput({ name: 'value', value: 'LIHCT,J-51,421-a' }),
      })

      const housingTypes = [housingType1]

      const result = `rent regulated properties with LIHCT, J-51, or 421-a and expiring between ${moment(
        moment.now()
      ).format('MM/DD/YYYY')} and ${moment(moment.now())
        .add(1, 'Y')
        .format('MM/DD/YYYY')}`

      expect(a.convertHousingTypesToSentence(housingTypes)).toEqual(result)
    })
  })

  describe('Rent Stabilized', () => {
    it('converts the object into a sentence', () => {
      const housingType1 = new HousingType({
        housingType: 'RENT_STABILIZED',
      })
      housingType1.paramsObject['rsunitslost'].create()
      const housingTypes = [housingType1]

      const result = 'rent stabilized properties that lost at least 25% rent stabilized units after 2010'

      expect(a.convertHousingTypesToSentence(housingTypes)).toEqual(result)
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

      const result = ` have at least 5 HPD Violations between ${todayminus1year} and ${todayplus1year} and have at least 5 DOB Violations between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` either have at least 5 HPD Violations between ${todayminus1year} and ${todayplus1year} or have at least 5 DOB Violations between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` have at least 5 HPD Violations between ${todayminus1year} and ${todayplus1year} and that either have at least 5 DOB Violations between ${todayminus1year} and ${todayplus1year} or have at least 5 ECB Violations between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` either have at least 5 HPD Violations between ${todayminus1year} and ${todayplus1year} or that have at least 5 DOB Violations between ${todayminus1year} and ${todayplus1year} and have at least 5 ECB Violations between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` have at least 5 HPD Violations between ${todayminus1year} and ${todayplus1year} and that either have at least 5 DOB Violations between ${todayminus1year} and ${todayplus1year} or have at least 5 ECB Violations between ${todayminus1year} and ${todayplus1year} or that have at least 5 HPD Complaints between ${todayminus1year} and ${todayplus1year} and have at least 5 DOB Complaints between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` have at least 5 HPD Violations between ${todayminus1year} and ${todayplus1year} and that either have at least 5 DOB Violations between ${todayminus1year} and ${todayplus1year} or have at least 5 ECB Violations between ${todayminus1year} and ${todayplus1year} or that have at least 5 HPD Complaints between ${todayminus1year} and ${todayplus1year} and have at least 5 DOB Complaints between ${todayminus1year} and ${todayplus1year} and that either have at least 1 Eviction between ${todayminus1year} and ${todayplus1year} or have at least 5 HPD Violations between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` have at least 5 HPD Violations between ${todayminus1year} and ${todayplus1year} and that either have at least 5 DOB Violations between ${todayminus1year} and ${todayplus1year} or have at least 5 ECB Violations between ${todayminus1year} and ${todayplus1year} and that either have at least 5 HPD Complaints between ${todayminus1year} and ${todayplus1year} or have at least 5 DOB Complaints between ${todayminus1year} and ${todayplus1year}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('Sold For $', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks('PROPERTY_SALE_BY_AMOUNT')],
        }),
      }

      const result = ` sold for at least $1000000 between ${todayminus1year} and ${todayplus1year}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('Sold Times', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks('PROPERTY_SALE_BY_COUNT')],
        }),
      }

      const result = ` have been sold at least 2 times between ${todayminus1year} and ${todayplus1year}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('Foreclosures', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks('FORECLOSURE')],
        }),
      }

      const result = ` have at least 1 Foreclosure between ${todayminus1year} and ${todayplus1year}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('Evictions', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks('EVICTION')],
        }),
      }

      const result = ` have at least 1 Eviction between ${todayminus1year} and ${todayplus1year}.`
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

      const result = ` have at least 5 DOB Issued Permits between ${todayminus1year} and ${todayplus1year}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('DOB Filed Permits', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks('DOB_FILED_PERMIT')],
        }),
      }

      const result = ` have at least 5 DOB Filed Permits between ${todayminus1year} and ${todayplus1year}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })

  describe('Housing Litigations', () => {
    it('converts the object into a sentence', () => {
      const conditions = {
        '0': new Condition({
          key: '0',
          type: 'AND',
          filters: [filterMocks('HOUSING_LITIGATION')],
        }),
      }

      const result = ` have at least 1 Housing Litigation between ${todayminus1year} and ${todayplus1year}.`
      expect(a.convertConditionMappingToSentence(conditions)).toEqual(result)
    })
  })
})

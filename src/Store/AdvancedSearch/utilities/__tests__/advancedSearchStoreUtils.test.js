import * as u from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'
import { Boundary } from 'Store/AdvancedSearch/classes/Boundary'
import { HousingType } from 'Store/AdvancedSearch/classes/HousingType'
import { ParameterMapSet } from 'shared/classes/ParameterMapSet'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
import { filterMocks } from 'shared/models/__mocks__/filterMocks'
import { Condition } from 'shared/classes/Condition'

describe('transformStateIntoParamObject', () => {
  it('transforms the state to a params object', () => {
    let condition0Filters = [filterMocks['HPD_VIOLATION']]

    const conditions = {
      '0': new Condition({ type: 'AND', filters: condition0Filters }),
    }

    const boundary1 = new Boundary('COUNCIL', '1')
    const boundary2 = new Boundary('COMMUNITY', '1')

    const housingType1 = new HousingType({
      housingType: 'MARKET_RATE',
      paramsObject: {
        someField: new ParameterMapSet({
          paramMaps: [new ParameterMapping({ field: 'someField', comparison: 'lte', value: '2018-01-01' })],
        }),
        unitsres: new ParameterMapSet({
          paramMaps: [
            new ParameterMapping({ field: 'unitsres', comparison: 'lte', value: '4' }),
            new ParameterMapping({ field: 'unitsres', comparison: 'gte', value: '1' }),
          ],
        }),
      },
    })

    const advancedSearch = {
      conditions: conditions,
      boundaries: [boundary1, boundary2],
      housingTypes: [housingType1],
    }

    const datasetsConfig = []
    const result = u.transformStateIntoParamObject(datasetsConfig, advancedSearch)
    const expected = {
      q:
        '*condition_0=AND filter_0=hpdviolations__count__gte=10,hpdviolations__approveddate__gte=2017-01-01,hpdviolations__approveddate__lte=2018-01-01',
      council: '1',
      cd: '1',
      housingtype: 'mr',
      unitsres__lte: '4',
      unitsres__gte: '1',
      someField__lte: '2018-01-01',
    }
    expect(result).toEqual(expected)
  })
})

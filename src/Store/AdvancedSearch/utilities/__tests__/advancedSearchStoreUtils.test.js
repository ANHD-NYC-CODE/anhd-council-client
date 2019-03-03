import * as u from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'
import * as d from 'shared/constants/datasets'
import { Boundary } from 'Store/AdvancedSearch/classes/Boundary'
import { HousingType } from 'Store/AdvancedSearch/classes/HousingType'

describe('transformStateIntoParamObject', () => {
  it('transforms the state to a params object', () => {
    const condition0Filters = [
      {
        dataset: d.HPDVIOLATIONS,
        comparison: 'gte',
        value: '10',
        startDate: '2017-01-01',
        endDate: '2018-01-01',
      },
    ]

    const condition0 = {
      '0': {
        type: 'AND',
        filters: condition0Filters,
      },
    }

    const boundary1 = new Boundary('COUNCIL', '1')
    const boundary2 = new Boundary('COMMUNITY', '1')

    const housingType1 = new HousingType('SMALL_HOMES', [
      { comparison: 'lte', field: 'unitsres', value: '4' },
      { comparison: 'gte', field: 'unitsres', value: '1' },
    ])

    const advancedSearch = {
      conditions: { ...condition0 },
      boundaries: [boundary1, boundary2],
      housingTypes: [housingType1],
    }

    const datasetsConfig = []

    const result = u.transformStateIntoParamObject(datasetsConfig, advancedSearch)
    const expected = {
      q:
        '*condition_0=AND filter_0=hpdviolations__approveddate__gte=2017-01-01,hpdviolations__approveddate__lte=2018-01-01,hpdviolations__count__gte=10',
      council: '1',
      cd: '1',
      housingtype: 'sh',
      unitsres__lte: '4',
      unitsres__gte: '1',
    }
    expect(result).toEqual(expected)
  })
})

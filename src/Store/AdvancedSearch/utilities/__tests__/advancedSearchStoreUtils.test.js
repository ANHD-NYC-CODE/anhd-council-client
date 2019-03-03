import * as u from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'
import * as d from 'shared/constants/datasets'
import * as b from 'shared/constants/boundaries'

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

    const boundary1 = { object: b.COUNCILBOUNDARY, id: '1' }
    const boundary2 = { object: b.COMMUNITYBOUNDARY, id: '1' }

    const housingType1 = {
      type: 'sh',
      params: [
        { type: 'unitsres', comparison: 'lte', value: '4' },
        { type: 'unitsres', comparison: 'gte', value: '1' },
      ],
    }

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

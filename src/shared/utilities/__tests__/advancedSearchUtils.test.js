import * as a from 'shared/utilities/advancedSearchUtils'

describe('convertObjectToDatasetParam', () => {
  it('should convert the object into the dataset query string', () => {
    const object = {
      type: 'hpdviolations',
      comparison: 'gte',
      value: '10',
      startDate: '2017-01-01',
      endDate: '2018-01-01',
    }

    const result =
      'hpdviolation__approveddate__gte=2017-01-01,hpdviolation__approveddate__lte=2018-01-01,hpdviolation__count__gte=10'
    expect(a.convertObjectToDatasetParam(object)).toEqual(result)
  })
})

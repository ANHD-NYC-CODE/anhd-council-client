import * as a from 'shared/utilities/advancedSearchUtils'
import * as d from 'shared/constants/datasets'

describe('convertObjectToDatasetParam', () => {
  const datasets = [d.HPDVIOLATIONS, d.DOBVIOLATIONS, d.ECBVIOLATIONS]
  describe('all datasets', () => {
    it('converts the object into a dataset query string', () => {
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
        expect(a.convertObjectToDatasetParam(object)).toEqual(result)
      })
    })
  })
})

import DataRequest from 'shared/classes/DataRequest'
import ApiMap from 'shared/classes/ApiMap'
import ParamMap from 'shared/classes/ParamMap'
describe('DataRequest', () => {
  describe('get requestConstant', () => {
    it('returns the derived constant', () => {
      const constant1 = 'BUILDING'
      const constant2 = 'HPD_VIOLATION'
      const dataRequest = new DataRequest({
        apiMaps: [
          new ApiMap({ constant: constant1, resourceId: '1' }),
          new ApiMap({ constant: constant2, resourceId: '2' }),
        ],
      })

      expect(dataRequest.requestConstant).toEqual('BUILDING_HPD_VIOLATION')
    })
  })
  describe('get path', () => {
    describe('with a single api map', () => {
      it('returns the derived path', () => {
        const constant1 = 'HPD_VIOLATION'
        const dataRequest = new DataRequest({ apiMaps: [new ApiMap({ constant: constant1 })] })

        expect(dataRequest.path).toEqual('/hpdviolations/')
      })
    })

    describe('with a single api map with id', () => {
      it('returns the derived path', () => {
        const constant1 = 'HPD_VIOLATION'
        const dataRequest = new DataRequest({ apiMaps: [new ApiMap({ constant: constant1, resourceId: '1' })] })

        expect(dataRequest.path).toEqual('/hpdviolations/1/')
      })
    })

    describe('with a multiple api maps with id', () => {
      it('returns the derived path', () => {
        const constant1 = 'BUILDING'
        const constant2 = 'HPD_VIOLATION'
        const dataRequest = new DataRequest({
          apiMaps: [
            new ApiMap({ constant: constant1, resourceId: '1' }),
            new ApiMap({ constant: constant2, resourceId: '2' }),
          ],
        })

        expect(dataRequest.path).toEqual('/buildings/1/hpdviolations/2/')
      })
    })
  })

  describe('get params', () => {
    it('returns the params', () => {
      const dataRequest = new DataRequest({
        paramMaps: [new ParamMap({ field: 'hpdviolations', comparison: 'gte', value: '10' })],
      })

      expect(dataRequest.params).toEqual({ hpdviolations__gte: '10' })
    })

    it('returns the multiple params', () => {
      const dataRequest = new DataRequest({
        paramMaps: [
          new ParamMap({ field: 'hpdviolations', comparison: 'gte', value: '10' }),
          new ParamMap({ field: 'hpdviolations__approveddate', comparison: 'gte', value: '10' }),
        ],
      })

      expect(dataRequest.params).toEqual({ hpdviolations__gte: '10', hpdviolations__approveddate__gte: '10' })
    })
  })

  describe('get csv_params', () => {
    it('returns the csv params', () => {
      const dataRequest = new DataRequest({
        apiMaps: [new ApiMap({ constant: 'PROPERTY', resourceId: '1' }), new ApiMap({ constant: 'HPD_VIOLATION' })],
        paramMaps: [new ParamMap({ field: 'hpdviolations', comparison: 'gte', value: '10' })],
      })

      expect(dataRequest.csv_params).toEqual({
        hpdviolations__gte: '10',
        format: 'csv',
        filename: 'dapportal-properties-1-hpdviolations-hpdviolations__gte=10.csv',
      })
    })
  })

  describe('get label', () => {
    it('label with param maps', () => {
      const dataRequest = new DataRequest({
        apiMaps: [
          new ApiMap({ constant: 'COUNCIL', resourceId: '1' }),
          new ApiMap({ constant: 'PROPERTY', resourceId: '1', name: 'Properties' }),
        ],
        paramMaps: [
          new ParamMap({
            resourceConstant: 'HPD_VIOLATION',
            field: 'hpdviolations',
            comparison: 'gte',
            value: '10',
            type: 'AMOUNT',
          }),
          new ParamMap({
            resourceConstant: 'HPD_VIOLATION',
            field: 'hpdviolations',
            comparison: 'gte',
            value: '2018-01-01',
            type: 'DATE',
          }),
        ],
      })

      expect(dataRequest.summaryCardLabel).toEqual('Properties with 10+ HPD Violations')
    })

    it('label without param maps', () => {
      const dataRequest = new DataRequest({
        apiMaps: [
          new ApiMap({ constant: 'PROPERTY', resourceId: '1', name: 'Properties' }),
          new ApiMap({ constant: 'HPD_VIOLATION' }),
        ],
      })

      expect(dataRequest.summaryCardLabel).toEqual('HPD Violations')
    })
  })
})

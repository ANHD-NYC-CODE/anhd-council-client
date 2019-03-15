import { DataRequest } from 'shared/classes/DataRequest'
import { ApiMap } from 'shared/classes/ApiMap'
import { ParameterMapping } from 'shared/classes/ParameterMapping'
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
        paramMaps: [new ParameterMapping({ field: 'hpdviolations', comparison: 'gte', value: '10' })],
      })

      expect(dataRequest.params).toEqual({ hpdviolations__gte: '10' })
    })

    it('returns the multiple params', () => {
      const dataRequest = new DataRequest({
        paramMaps: [
          new ParameterMapping({ field: 'hpdviolations', comparison: 'gte', value: '10' }),
          new ParameterMapping({ field: 'hpdviolations__approveddate', comparison: 'gte', value: '10' }),
        ],
      })

      expect(dataRequest.params).toEqual({ hpdviolations__gte: '10', hpdviolations__approveddate__gte: '10' })
    })
  })
})
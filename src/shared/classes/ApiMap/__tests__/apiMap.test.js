import ApiMap from 'shared/classes/ApiMap'

describe('ApiMap', () => {
  describe('get name', () => {
    it('returns the calculated name', () => {
      const apiMap = new ApiMap({ constant: 'HPD_VIOLATION' })
      expect(apiMap.name).toEqual('HPD Violations')
    })
  })

  describe('get queryName', () => {
    it('returns the calculated queryName', () => {
      const apiMap = new ApiMap({ constant: 'HPD_VIOLATION' })
      expect(apiMap.queryName).toEqual('hpdviolations')
    })

    it('returns the calculated queryName that ends in y', () => {
      const apiMap = new ApiMap({ constant: 'COMMUNITY' })
      expect(apiMap.queryName).toEqual('communities')
    })
  })

  describe('get model', () => {
    it('returns the calculated model name', () => {
      const apiMap = new ApiMap({ constant: 'HPD_VIOLATION' })
      expect(apiMap.model).toEqual('hpdviolation')
    })
  })

  describe('get url', () => {
    it('returns the calculated url', () => {
      const apiMap = new ApiMap({ constant: 'HPD_VIOLATION' })
      expect(apiMap.url).toEqual('/hpdviolations/')
    })

    it('returns the calculated url that ends in y', () => {
      const apiMap = new ApiMap({ constant: 'PROPERTY' })
      expect(apiMap.url).toEqual('/properties/')
    })

    it('returns the calculated url with id', () => {
      const apiMap = new ApiMap({ constant: 'HPD_VIOLATION', resourceId: '1' })
      expect(apiMap.url).toEqual('/hpdviolations/1/')
    })
  })
})

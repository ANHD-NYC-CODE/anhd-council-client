import { Filter } from 'shared/classes/Filter'
import { constantToQueryName } from 'shared/utilities/filterUtils'

export const createFilterMock = ({ constant = '' } = {}) => {
  const filter = new Filter({
    datasetConstant: constant,
  })
  filter.paramsObject[constantToQueryName(filter.constant)].createOppositeRangeMap()
  return filter
}

export const filterMocks = constant => {
  switch (constant) {
    case 'HPD_VIOLATION':
      return createFilterMock({
        constant: 'HPD_VIOLATION',
      })
    case 'DOB_VIOLATION':
      return createFilterMock({
        constant: 'DOB_VIOLATION',
      })
    case 'ECB_VIOLATION':
      return createFilterMock({
        constant: 'ECB_VIOLATION',
      })
    case 'HPD_COMPLAINT':
      return createFilterMock({
        constant: 'HPD_COMPLAINT',
      })
    case 'DOB_COMPLAINT':
      return createFilterMock({
        constant: 'DOB_COMPLAINT',
      })
    case 'PROPERTY_SALE_BY_AMOUNT':
      return createFilterMock({
        constant: 'PROPERTY_SALE_BY_AMOUNT',
      })
    case 'PROPERTY_SALE_BY_COUNT':
      return createFilterMock({
        constant: 'PROPERTY_SALE_BY_COUNT',
      })
    case 'EVICTION':
      return createFilterMock({
        constant: 'EVICTION',
      })
    case 'FORECLOSURE':
      return createFilterMock({
        constant: 'FORECLOSURE',
      })
  }
}

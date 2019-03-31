import { Filter } from 'shared/classes/Filter'
import { constantToQueryName } from 'shared/utilities/filterUtils'
import * as resourceModels from 'shared/models/resources'
import { createAdvancedSearchFilters } from 'shared/utilities/filterUtils'
import { mockSetupResourceModels } from 'shared/utilities/configUtils'
const ADVANCED_FILTERS = createAdvancedSearchFilters({ resourceModels: mockSetupResourceModels() })

export const createFilterMock = ({ constant = '' } = {}) => {
  const filter = new Filter({
    resourceModel: ADVANCED_FILTERS.find(f => f.resourceModel.resourceConstant === constant).resourceModel,
    schema: ADVANCED_FILTERS.find(f => f.resourceModel.resourceConstant === constant).schema,
  })
  filter.paramSets[constantToQueryName(constant)].createOppositeRangeMap()
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
    case 'LISPENDEN':
      return createFilterMock({
        constant: 'LISPENDEN',
      })
    case 'DOB_ISSUED_PERMIT':
      return createFilterMock({
        constant: 'DOB_ISSUED_PERMIT',
      })
    case 'DOB_FILED_PERMIT':
      return createFilterMock({
        constant: 'DOB_FILED_PERMIT',
      })
    case 'HOUSING_LITIGATION':
      return createFilterMock({
        constant: 'HOUSING_LITIGATION',
      })
  }
}

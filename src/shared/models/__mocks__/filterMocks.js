import Filter from 'shared/classes/Filter'

import { mockSetupResourceModels } from 'shared/testUtilities/index.js'

const resourceModels = mockSetupResourceModels()

// Grabs the resource model (src/shared/models/resources/*)
// and hydrates a custom-search filter with it
export const filterMocks = constant => {
  const resourceModel = resourceModels[constant]
  const filter = new Filter({
    primaryResourceModel: resourceModels['PROPERTY'],
    resourceModel: resourceModel,
    schema: resourceModel.ownResourceFilters,
  })
  filter.paramSets['initial'].createOppositeRangeMap()
  return filter
}

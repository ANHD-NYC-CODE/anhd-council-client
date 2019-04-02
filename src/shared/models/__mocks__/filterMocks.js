import Filter from 'shared/classes/Filter'

import { mockSetupResourceModels } from 'shared/testUtilities/index.js'

const resourceModels = mockSetupResourceModels()

export const filterMocks = constant => {
  const resourceModel = resourceModels[constant]
  const filter = new Filter({
    resourceModel: resourceModel,
    schema: resourceModel.ownResourceFilters,
  })
  filter.paramSets['initial'].createOppositeRangeMap()
  return filter
}

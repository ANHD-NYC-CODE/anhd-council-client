import * as resources from 'shared/models/resources'

const Property = databaseObject => {
  return {
    resourceConstant: 'PROPERTY',
    ownResourceFilters: [],
    relatedResources: Object.keys(resources).filter(key => key !== 'PROPERTY'),
  }
}

export default Property

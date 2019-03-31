export default class Resource {
  constructor({ resourceModel = undefined } = {}) {
    Object.keys(resourceModel).forEach(key => {
      this[key] = resourceModel[key]
    })

    if (resourceModel.ownResourceFilters) {
      // Add generated param sets to the resource
      Object.keys(resourceModel.ownResourceFilters).forEach(key => {
        this.ownResourceFilters[key] = resourceModel.ownResourceFilters[key].generatorFunction(resourceModel)
      })
    }
  }
}

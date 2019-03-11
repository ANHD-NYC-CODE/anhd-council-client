export class Dataset {
  constructor({ model = undefined } = {}) {
    Object.keys(model).forEach(key => {
      this[key] = model[key]
    })
  }
}

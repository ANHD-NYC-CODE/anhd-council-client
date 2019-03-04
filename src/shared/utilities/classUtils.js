export const cloneInstance = classInstance => {
  return Object.assign(Object.create(Object.getPrototypeOf(classInstance)), classInstance)
}

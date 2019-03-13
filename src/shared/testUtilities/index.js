import configureStore from 'Store/configureStore'

export const setupStore = initialState => {
  return configureStore({ ...initialState })
}

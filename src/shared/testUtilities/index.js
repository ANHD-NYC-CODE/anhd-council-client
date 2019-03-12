import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from 'Store/reducers'

export const setupStore = initialState => {
  return createStore(reducers, { ...initialState }, applyMiddleware(thunk))
}

export const configuredAppWrapper = wrapper => {}

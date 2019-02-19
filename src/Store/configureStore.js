import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { requestMiddleware } from 'shared/utilities/authUtils'

import createRootReducer from './reducers'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const history = createBrowserHistory()
const middleware = [routerMiddleware(history), thunk, requestMiddleware()]

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware))
  )

  return store
}

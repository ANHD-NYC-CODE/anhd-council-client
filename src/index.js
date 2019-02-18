import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import configureStore from './Store/configureStore'
import { USER_STORAGE } from 'shared/constants/actions'
// Login user with browser refresh, if token fresh and available
const getAuthState = () => {
  try {
    const storage = JSON.parse(localStorage.getItem(USER_STORAGE)) || undefined

    return { auth: { user: storage.user, access_token: storage.access, refresh_token: storage.refresh } }
  } catch (err) {
    return undefined
  }
}

const store = configureStore({ ...getAuthState() })

import './shared/styles/bootstrap/index.scss'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

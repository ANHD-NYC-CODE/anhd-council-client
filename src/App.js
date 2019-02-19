import React from 'react'
import Router from 'Router'

import configureStore from 'Store/configureStore'
import { USER_STORAGE } from 'shared/constants/actions'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import Auth2 from 'Auth2'

import 'react-toastify/dist/ReactToastify.css'

// Login user with browser refresh, if token fresh and available
const getAuthState = () => {
  try {
    const storage = JSON.parse(localStorage.getItem(USER_STORAGE)) || undefined
    return { auth: { user: storage.user, access: storage.access, refresh: storage.refresh } }
  } catch (err) {
    return undefined
  }
}

const store = configureStore({ ...getAuthState() })

export class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Auth2>
            <Router />
            <ToastContainer />
          </Auth2>
        </Provider>
      </div>
    )
  }
}

export default App

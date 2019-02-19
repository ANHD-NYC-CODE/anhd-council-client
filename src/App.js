import React from 'react'
import { Provider } from 'react-redux'

import Router from 'Router'
import configureStore from 'Store/configureStore'
import { USER_STORAGE } from 'shared/constants/actions'
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
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router />
        </Provider>
      </div>
    )
  }
}

export default App

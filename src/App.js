import React from 'react'
import Router from 'Router'

import configureStore from 'Store/configureStore'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { getUserStorageData } from 'shared/utilities/storageUtils'
import Auth from 'Auth'
import Config from 'Config'
import ModalContainer from 'ModalContainer'

import 'react-toastify/dist/ReactToastify.css'

// Login user with browser refresh, if token fresh and available
const getStateFromStorage = () => {
  try {
    const userStorage = getUserStorageData()

    return {
      auth: {
        user: (userStorage || {}).user,
        access: (userStorage || {}).access,
        refresh: (userStorage || {}).refresh,
      },
      council: {
        districts: [],
      },
      community: {
        boards: [],
      },
    }
  } catch (err) {
    return undefined
  }
}

const store = configureStore({ ...getStateFromStorage() })

export class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Auth>
            <Config>
              <Router />
              <ToastContainer />
              <ModalContainer />
            </Config>
          </Auth>
        </Provider>
      </div>
    )
  }
}

export default App

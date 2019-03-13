import React from 'react'

import configureStore from 'Store/configureStore'
import { Provider } from 'react-redux'
import { getUserStorageData } from 'shared/utilities/storageUtils'
import App from 'App'

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

export class AppProvider extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default AppProvider

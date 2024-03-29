import React from 'react'

import configureStore from 'Store/configureStore'
import { Provider } from 'react-redux'
import { getUserStorageData } from 'shared/utilities/storageUtils'
import App from 'App'
import ReactGA from 'react-ga'
import * as c from 'shared/constants'
if (c.ENABLE_GOOGLE_ANALYTICS) {
  ReactGA.initialize('G-3VVXDRFSS7', {
    debug: process.env.NODE_ENV === 'development',
    testMode: process.env.NODE_ENV === 'development',
    anonymizeIp: true, // Removes last 3 digits from IP
    cookieDomain: false,
  })
}
ReactGA.pageview(window.location.pathname + window.location.search)

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
        districts: [],
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

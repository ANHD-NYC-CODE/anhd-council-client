import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { refreshTokens } from 'Store/Auth/actions'
import { createErrorSelector } from 'Store/Error/selectors'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { GET_TOKEN, GET_USER_PROFILE } from 'shared/constants/actions'
import { logoutUser } from 'Store/Auth/actions'
import { addStorageEventListener, removeStorageEventListener } from 'shared/utilities/storageUtils'
import { handleSyncStorage } from 'Store/Auth/actions'

import UserContext from 'Auth/UserContext'

// Debug logging - only in development or staging
const isDebugMode = () => {
  return process.env.NODE_ENV === 'development' || 
         (typeof window !== 'undefined' && window.location.hostname.includes('staging'))
}

const debugLog = (...args) => {
  if (isDebugMode()) {
    console.log(...args)
  }
}

class Auth extends React.Component {
  constructor(props) {
    super(props)

    // Refresh the access token on app load
    if (props.auth && props.auth.refresh) {
      props.dispatch(refreshTokens(props.auth.refresh.token))
    }
  }

  componentDidMount() {
    // Listen for storage events to sync authentication across tabs
    this.handleStorageChange = this.handleStorageChange.bind(this)
    addStorageEventListener(this.handleStorageChange)
  }

  componentWillUnmount() {
    // Clean up storage event listener
    removeStorageEventListener(this.handleStorageChange)
  }

  handleStorageChange = (newData, oldData, event) => {
    debugLog('🔐 Auth: Storage change detected:', {
      hasNewData: !!newData,
      hasOldData: !!oldData,
      newDataKeys: newData ? Object.keys(newData) : [],
      oldDataKeys: oldData ? Object.keys(oldData) : []
    })

    const { dispatch } = this.props

    // Handle all authentication data changes, including first-time login and logout
    let authChanged = false
    
    if (!oldData && newData) {
      // First time login - new data exists but no old data
      authChanged = true
      debugLog('🔐 Auth: First time login detected')
    } else if (oldData && !newData) {
      // Logout - old data exists but no new data
      authChanged = true
      debugLog('🔐 Auth: Logout detected')
    } else if (oldData && newData) {
      // Data update - check if authentication data actually changed
      authChanged = (
        JSON.stringify(newData.access) !== JSON.stringify(oldData.access) ||
        JSON.stringify(newData.refresh) !== JSON.stringify(oldData.refresh) ||
        JSON.stringify(newData.user) !== JSON.stringify(oldData.user)
      )
      debugLog('🔐 Auth: Data update detected, changed:', authChanged)
    }

    if (authChanged) {
      debugLog('🔐 Auth: Syncing authentication state from storage event')
      // Sync the new authentication state to this tab's Redux store
      dispatch(handleSyncStorage(newData, dispatch))
    } else {
      debugLog('🔐 Auth: No authentication change detected, ignoring storage event')
    }
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          loginError: this.props.loginError,
          loginLoading: this.props.loginLoading,
          user: this.props.auth.user,
          logoutUser: () => this.props.dispatch(logoutUser(true)),
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

Auth.propTypes = {
  auth: PropTypes.object,
  modal: PropTypes.object,
  dispatch: PropTypes.func,
}

const errorSelector = createErrorSelector([GET_TOKEN, GET_USER_PROFILE])
const loadingSelector = createLoadingSelector([GET_TOKEN, GET_USER_PROFILE])

const mapStateToProps = state => {
  return {
    auth: state.auth,
    loginError: errorSelector(state),
    loginLoading: loadingSelector(state),
    path: state.router.location.pathname,
  }
}

export default connect(mapStateToProps)(Auth)

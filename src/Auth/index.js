import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { refreshTokens } from 'Store/Auth/actions'
import { createErrorSelector } from 'Store/Error/selectors'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { GET_TOKEN, GET_USER_PROFILE } from 'shared/constants/actions'
import { logoutUser } from 'Store/Auth/actions'

import UserContext from 'Auth/UserContext'

class Auth extends React.Component {
  constructor(props) {
    super(props)

    // Refresh the access token on app load
    if (props.auth && props.auth.refresh) {
      props.dispatch(refreshTokens(props.auth.refresh.token))
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

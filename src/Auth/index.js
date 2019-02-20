import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { refreshTokens } from 'Store/Auth/actions'
import { createErrorSelector } from 'Store/Error/selectors'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { GET_TOKEN, GET_USER_PROFILE } from 'shared/constants/actions'
import { push } from 'connected-react-router'
import { logoutUser } from 'Store/Auth/actions'

import { handleClearErrors } from 'Store/Error/actions'
import { openModal, closeModal } from 'Store/Modal/actions'
import UserContext from 'Auth/UserContext'
import LoginModal from 'Auth/LoginModal'

class Auth extends React.Component {
  constructor(props) {
    super(props)

    // Refresh the access token on app load
    if (props.auth && props.auth.refresh) {
      props.dispatch(refreshTokens(props.auth.refresh.token))
    }

    this.openLoginModal = this.openLoginModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.handleLoginPath = this.handleLoginPath.bind(this)
    this.handleLogoutPath = this.handleLogoutPath.bind(this)

    this.handleLoginPath(props)
    this.handleLogoutPath(props)
  }

  componentWillReceiveProps(nextProps) {
    this.handleLoginPath(nextProps)
    this.handleLogoutPath(nextProps)

    if (nextProps.auth.user) {
      nextProps.dispatch(closeModal(LoginModal))

      if (nextProps.path === '/login') {
        nextProps.dispatch(push('/'))
      }
    }
  }

  handleLoginPath(props) {
    if (props.auth.user) {
      props.dispatch(closeModal(LoginModal))

      if (props.path === '/login') {
        props.dispatch(push('/'))
      }
    } else if (props.path === '/login') {
      this.openLoginModal(props)
    }
  }

  handleLogoutPath(props) {
    if (props.path === '/logout') {
      props.dispatch(logoutUser())
      props.dispatch(push('/login'))
    }
  }

  hideModal() {
    this.props.dispatch(handleClearErrors(GET_TOKEN))
    this.props.dispatch(handleClearErrors(GET_USER_PROFILE))
    this.props.dispatch(closeModal(LoginModal))

    if (this.props.path === '/login') {
      this.props.dispatch(push('/'))
    }
  }

  openLoginModal(props) {
    props.dispatch(
      openModal(LoginModal, {
        onHide: this.hideModal,
        dispatch: props.dispatch,
        error: props.loginError,
        loading: props.loginLoading,
      })
    )
  }

  render() {
    return <UserContext.Provider value={this.props.auth.user}>{this.props.children}</UserContext.Provider>
  }
}

Auth.propTypes = {
  auth: PropTypes.object,
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

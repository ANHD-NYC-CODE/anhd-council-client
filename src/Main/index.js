import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Header from 'Navigation/Header'
import LeafletMap from 'LeafletMap'
import UserContext from 'Auth/UserContext'
import Auth from 'Auth'
import { logoutUser } from 'Store/Auth/actions'
import { push } from 'connected-react-router'
import { GET_TOKEN, GET_USER_PROFILE } from 'shared/constants/actions'

import { handleClearErrors } from 'Store/Error/actions'

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showLoginModal: props.path === '/login',
    }

    this.openLoginModal = this.openLoginModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.handleLoginPath = this.handleLoginPath.bind(this)
    this.handleLogoutPath = this.handleLogoutPath.bind(this)

    this.handleLogoutPath(props)
  }

  componentWillReceiveProps(nextProps) {
    this.handleLoginPath(nextProps)
    this.handleLogoutPath(nextProps)
  }

  handleLoginPath(props) {
    if (props.path === '/login') {
      this.openLoginModal()
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

    this.setState({
      showLoginModal: false,
    })

    if (this.props.path === '/login') {
      this.props.dispatch(push('/'))
    }
  }

  openLoginModal() {
    this.setState({
      showLoginModal: true,
    })
  }

  render() {
    return (
      <UserContext.Provider value={this.props.auth.user}>
        <Auth show={this.state.showLoginModal} hideModal={this.hideModal} />
        <UserContext.Consumer>
          {user => <Header openLoginModal={this.openLoginModal} user={user} />}
        </UserContext.Consumer>
        <LeafletMap />
      </UserContext.Provider>
    )
  }
}

Main.propTypes = {
  auth: PropTypes.object,
  dispatch: PropTypes.func,
  showLoginModal: PropTypes.bool,
  path: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    path: state.router.location.pathname,
  }
}

export default connect(mapStateToProps)(Main)

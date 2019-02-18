import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Nav } from 'react-bootstrap'
import LoginModal from 'Auth/LoginModal'
import LoginForm from 'Auth/LoginForm'
import { createErrorSelector } from 'Store/Error/selectors'
import { createLoadingSelector } from 'Store/Loading/selectors'

import { GET_TOKEN, GET_USER_PROFILE } from 'shared/constants/actions'
import { handleClearErrors } from 'Store/Error/actions'
import { logoutUser } from 'Store/Auth/actions'

class Auth extends React.Component {
  constructor(props) {
    super(props)

    this.state = { modalShow: false }
    this.modalClose = this.modalClose.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.modalClose()
    }
  }

  modalClose() {
    this.props.dispatch(handleClearErrors(GET_TOKEN))
    this.props.dispatch(handleClearErrors(GET_USER_PROFILE))

    this.setState({ modalShow: false })
  }

  render() {
    return (
      <div className="auth">
        {this.props.user ? (
          <Nav.Link onClick={() => this.props.dispatch(logoutUser())}>Logout</Nav.Link>
        ) : (
          <Nav.Link onClick={() => this.setState({ modalShow: true })}>Login</Nav.Link>
        )}
        <LoginModal show={this.state.modalShow} onHide={this.modalClose}>
          <LoginForm dispatch={this.props.dispatch} error={this.props.error} loading={this.props.loading} />
        </LoginModal>
      </div>
    )
  }
}

Auth.propTypes = {
  dispatch: PropTypes.func,
  error: PropTypes.object,
  user: PropTypes.object,
}

const errorSelector = createErrorSelector([GET_TOKEN, GET_USER_PROFILE])
const loadingSelector = createLoadingSelector([GET_TOKEN, GET_USER_PROFILE])

const mapStateToProps = state => {
  return {
    error: errorSelector(state),
    loading: loadingSelector(state),
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Auth)

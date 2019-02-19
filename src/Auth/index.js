import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import LoginModal from 'Auth/LoginModal'
import LoginForm from 'Auth/LoginForm'
import { createErrorSelector } from 'Store/Error/selectors'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { GET_TOKEN, GET_USER_PROFILE } from 'shared/constants/actions'

class Auth extends React.Component {
  constructor(props) {
    super(props)

    if (props.path === '/login' && props.user) {
      props.dispatch(push('/'))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      nextProps.hideModal()
      if (nextProps.path === '/login') {
        nextProps.dispatch(push('/'))
      }
    }
  }

  render() {
    return (
      <div className="auth">
        <LoginModal show={this.props.show} onHide={this.props.hideModal}>
          <LoginForm dispatch={this.props.dispatch} error={this.props.error} loading={this.props.loading} />
        </LoginModal>
      </div>
    )
  }
}

Auth.propTypes = {
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
  hideModal: PropTypes.func,
  user: PropTypes.object,
}

const errorSelector = createErrorSelector([GET_TOKEN, GET_USER_PROFILE])
const loadingSelector = createLoadingSelector([GET_TOKEN, GET_USER_PROFILE])

const mapStateToProps = state => {
  return {
    error: errorSelector(state),
    loading: loadingSelector(state),
    user: state.auth.user,
    path: state.router.location.pathname,
  }
}

export default connect(mapStateToProps)(Auth)

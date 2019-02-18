import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, ButtonToolbar, Button } from 'react-bootstrap'
import LoginModal from 'Auth/LoginModal'
import LoginForm from 'Auth/LoginForm'
import { createErrorSelector } from 'Store/Error/selectors'
import { createLoadingSelector } from 'Store/Loading/selectors'

import { GET_TOKEN } from 'shared/constants/actions'
import { handleClearErrors } from 'Store/Error/actions'

class Auth extends React.Component {
  constructor(props) {
    super(props)

    this.state = { modalShow: false }
    this.modalFooter = this.modalFooter.bind(this)
    this.modalClose = this.modalClose.bind(this)
  }

  modalClose() {
    this.props.dispatch(handleClearErrors(GET_TOKEN))
    this.setState({ modalShow: false })
  }

  modalFooter() {
    return (
      <Modal.Footer className="auth-login-modal--footer-elements">
        <Button variant="secondary" onClick={this.modalClose}>
          Close
        </Button>
      </Modal.Footer>
    )
  }

  render() {
    return (
      <div className="auth">
        <ButtonToolbar>
          <Button variant="primary" onClick={() => this.setState({ modalShow: true })}>
            Login
          </Button>

          <LoginModal show={this.state.modalShow} onHide={this.modalClose}>
            <LoginForm dispatch={this.props.dispatch} error={this.props.error} loading={this.props.loading} />
          </LoginModal>
        </ButtonToolbar>
      </div>
    )
  }
}

Auth.propTypes = {
  dispatch: PropTypes.func,
  error: PropTypes.object,
}

const errorSelector = createErrorSelector([GET_TOKEN])
const loadingSelector = createLoadingSelector([GET_TOKEN])

const mapStateToProps = state => {
  return {
    error: errorSelector(state),
    loading: loadingSelector(state),
  }
}

export default connect(mapStateToProps)(Auth)

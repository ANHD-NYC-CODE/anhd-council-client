import React from 'react'
import PropTypes from 'prop-types'
import BaseModal from 'shared/components/BaseModal'
import LoginForm from 'shared/components/forms/LoginForm'
import { connect } from 'react-redux'
import UserContext from 'Auth/UserContext'
const LoginModal = props => {
  return (
    <UserContext.Consumer>
      {auth => {
        if (auth.user) props.hideModal()
        return (
          <BaseModal
            centered={true}
            className="auth-login-modal"
            labelId={props.labelId}
            modalFooter={props.modalFooter}
            hideModal={props.hideModal}
            show={props.show}
            title="Login"
          >
            <LoginForm
              dispatch={props.dispatch}
              error={auth.loginError}
              loading={auth.loginLoading}
              postLoginAction={props.postLoginAction}
              user={auth.user}
            />
          </BaseModal>
        )
      }}
    </UserContext.Consumer>
  )
}

LoginModal.defaultProps = {
  user: {},
}

LoginModal.propTypes = {
  centered: PropTypes.bool,
  className: PropTypes.string,
  dialogClassName: PropTypes.string,
  dispatch: PropTypes.func,
  error: PropTypes.object,
  labelId: PropTypes.string,
  loading: PropTypes.bool,
  modalFooter: PropTypes.object,
  hideModal: PropTypes.func,
  show: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
}

export default connect()(LoginModal)

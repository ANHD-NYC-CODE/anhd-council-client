import React from 'react'
import PropTypes from 'prop-types'
import BaseModal from 'shared/components/BaseModal'
import LoginForm from 'Auth/LoginForm'

const LoginModal = props => {
  return (
    <BaseModal
      centered={true}
      className="auth-login-modal"
      labelId={props.labelId}
      modalFooter={props.modalFooter}
      onHide={props.onHide}
      show={props.show}
      title="Login"
    >
      <LoginForm dispatch={props.dispatch} error={props.error} loading={props.loading} />
    </BaseModal>
  )
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
  onHide: PropTypes.func,
  show: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
}

export default LoginModal

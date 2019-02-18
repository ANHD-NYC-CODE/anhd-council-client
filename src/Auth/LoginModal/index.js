import React from 'react'
import PropTypes from 'prop-types'
import BaseModal from 'shared/components/BaseModal'

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
      {props.children}
    </BaseModal>
  )
}

LoginModal.propTypes = {
  centered: PropTypes.bool,
  className: PropTypes.string,
  dialogClassName: PropTypes.string,
  labelId: PropTypes.string,
  modalFooter: PropTypes.object,
  onHide: PropTypes.func,
  show: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
}

export default LoginModal

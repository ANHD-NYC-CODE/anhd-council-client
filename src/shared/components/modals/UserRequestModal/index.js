import React from 'react'
import PropTypes from 'prop-types'
import BaseModal from 'shared/components/BaseModal'
import UserRequestForm from 'shared/components/forms/UserRequestForm'
import ModalContext from 'Modal/ModalContext'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { connect } from 'react-redux'
const UserRequestModal = props => {
  return (
    <ModalContext.Consumer>
      {modal => {
        return (
          <BaseModal
            centered={true}
            className="auth-login-modal"
            labelId={props.labelId}
            modalFooter={props.modalFooter}
            hideModal={modal.hideModal}
            show={props.show}
            size={props.size}
            title="Request an account"
          >
            <UserRequestForm
              dispatch={props.dispatch}
              error={props.error}
              loading={props.loading}
              hideModal={modal.hideModal}
            />
          </BaseModal>
        )
      }}
    </ModalContext.Consumer>
  )
}

UserRequestModal.propTypes = {
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

const mapStateToProps = state => {
  const errorSelector = createErrorSelector(['POST_USER_REQUEST'])
  const loadingSelector = createLoadingSelector(['POST_USER_REQUEST'])

  return {
    error: errorSelector(state),
    loading: loadingSelector(state),
  }
}

export default connect(mapStateToProps)(UserRequestModal)

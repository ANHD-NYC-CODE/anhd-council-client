import React from 'react'
import BaseModal from 'shared/components/BaseModal'
import * as c from 'shared/constants'
import ModalContext from 'Modal/ModalContext'
import LoginModal from 'shared/components/modals/LoginModal'
import LoginModalFooter from 'shared/components/forms/LoginForm/LoginModalFooter'

const Component = props => {
  return (
    <ModalContext.Consumer>
      {modal => {
        return (
          <BaseModal
            centered={true}
            labelId={props.labelId}
            modalFooter={props.modalFooter}
            hideModal={props.hideModal}
            show={props.show}
            size={props.size}
            title={'Why do we have a login?'}
          >
            <p>
              To protect sensitive information, we restrict data on potential and actual foreclosures to the New York
              City Council and ANHD member and partner organizations. Please{' '}
              <button
                onClick={ev => {
                  ev.preventDefault()
                  modal.setModal({
                    modalComponent: LoginModal,
                    modalProps: {
                      modalFooter: <LoginModalFooter modal={modal} />,
                      modal: modal
                    },
                  })
                }}
              >
                click here
              </button> to request an account or email <a href={`mailto:${c.CONTACT_EMAIL}`}>{c.CONTACT_EMAIL}</a> with questions.
            </p>
          </BaseModal>
        )
      }}
    </ModalContext.Consumer>
  )
}

Component.propTypes = {}

export default Component

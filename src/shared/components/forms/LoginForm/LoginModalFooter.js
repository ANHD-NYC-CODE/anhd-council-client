import React from 'react'
import { Modal, Row, Col, Button } from 'react-bootstrap'

import UserRegisterModal from 'shared/components/modals/UserRegisterModal'

const LoginModalFooter = props => (
  <Modal.Footer as={Row}>
    <Col xs={12}>
      <Button
        className="login-form__request-button"
        block
        variant="dark"
        size="md"
        onClick={ev => {
          ev.preventDefault()
          props.modal.setModal({
            modalComponent: UserRegisterModal,
            modalProps: {
              size: 'lg',
            },
          })
        }}
      >
        Register for an account
      </Button>
    </Col>
  </Modal.Footer>
)

LoginModalFooter.propTypes = {}

export default LoginModalFooter

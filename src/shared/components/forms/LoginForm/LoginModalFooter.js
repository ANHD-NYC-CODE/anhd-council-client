import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Button } from 'react-bootstrap'
import BaseLink from 'shared/components/BaseLink'
import UserRequestModal from 'shared/components/modals/UserRequestModal'
const LoginModalFooter = props => {
  return (
    <Modal.Footer as={Row}>
      <Col xs={12}>
        <Button
          className="login-form__request-button"
          block
          variant="dark"
          size="md"
          onClick={e => {
            e.preventDefault()
            props.modal.setModal({
              modalComponent: UserRequestModal,
              modalProps: {
                size: 'lg',
              },
            })
          }}
        >
          Request an account
        </Button>
      </Col>
    </Modal.Footer>
  )
}

LoginModalFooter.propTypes = {}

export default LoginModalFooter

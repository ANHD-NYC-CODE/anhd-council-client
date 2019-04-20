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
          block
          variant="outline-primary"
          onClick={e => {
            e.preventDefault()
            props.modal.setModal({
              modalComponent: UserRequestModal,
            })
          }}
        >
          Request an account
        </Button>
      </Col>
      <Col xs={12}>
        <BaseLink className="btn-link" href="https://api.displacementalert.org/password_reset">
          <Button block variant="outline-secondary">
            Reset Password
          </Button>
        </BaseLink>
      </Col>
    </Modal.Footer>
  )
}

LoginModalFooter.propTypes = {}

export default LoginModalFooter

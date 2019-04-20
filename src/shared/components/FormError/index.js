import React from 'react'
import PropTypes from 'prop-types'

import { Form } from 'react-bootstrap'

const FormError = props => {
  return (
    !!props.show && (
      <div className="form-error">
        <Form.Text className="text-danger" type="invalid">
          {Array.isArray(props.message)
            ? props.message.map((m, index) => {
                return <p key={`error-message-${index}`}>{m}</p>
              })
            : props.message}
        </Form.Text>
      </div>
    )
  )
}

FormError.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool,
}

export default FormError

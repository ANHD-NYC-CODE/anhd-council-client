import React from 'react'
import PropTypes from 'prop-types'

import { Form } from 'react-bootstrap'

const FormError = props => {
  return (
    !!props.show && (
      <div className="form-error">
        <Form.Text className="text-danger" type="invalid">
          {props.message}
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

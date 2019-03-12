import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

import './style.scss'

const DateField = props => {
  return (
    <Form.Control
      key={props.key}
      min={props.paramMap.validations.min}
      max={props.paramMap.validations.max}
      name="value"
      onChange={props.onChange}
      size="sm"
      type={props.type || 'date'}
      value={props.paramMap.value}
    />
  )
}

DateField.propTypes = {
  key: PropTypes.string,
  onChange: PropTypes.func,
  paramMap: PropTypes.object,
  type: PropTypes.string,
}

export default DateField

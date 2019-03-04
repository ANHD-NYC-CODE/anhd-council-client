import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

const DateField = props => {
  return (
    <Form.Control name="value" onChange={props.onChange} size="sm" type={props.type} value={props.paramMap.value} />
  )
}

DateField.propTypes = {
  onChange: PropTypes.func,
  paramMap: PropTypes.object,
  type: PropTypes.string,
}

export default DateField

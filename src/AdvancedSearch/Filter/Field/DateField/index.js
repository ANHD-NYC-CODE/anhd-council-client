import React from 'react'
import PropTypes from 'prop-types'
import { Form, InputGroup } from 'react-bootstrap'

const DateField = props => {
  return (
    <InputGroup size="sm">
      <Form.Control
        key={props.key}
        name="value"
        onChange={props.onChange}
        size="sm"
        type={props.type || 'date'}
        value={props.paramMap.value}
      />
    </InputGroup>
  )
}

DateField.propTypes = {
  key: PropTypes.string,
  onChange: PropTypes.func,
  paramMap: PropTypes.object,
  type: PropTypes.string,
}

export default DateField

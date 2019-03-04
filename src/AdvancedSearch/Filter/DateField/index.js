import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

const DateField = props => {
  return (
    <Form.Control
      name="value"
      onChange={e => props.onChangeParamMap(props.paramMap, e)}
      size="sm"
      type={props.type}
      value={props.paramMap.value}
    />
  )
}

DateField.propTypes = {
  type: PropTypes.string,
  onChangeParamMap: PropTypes.func,
  paramMap: PropTypes.object,
}

export default DateField

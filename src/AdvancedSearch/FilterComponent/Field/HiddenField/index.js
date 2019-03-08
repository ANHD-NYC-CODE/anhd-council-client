import React from 'react'
import PropTypes from 'prop-types'
import { InputGroup, Form } from 'react-bootstrap'
const IntegerField = props => {
  return (
    <InputGroup size="sm">
      <Form.Control key={props.key} name="value" size="sm" type="hidden" value={props.paramMap.value} />
    </InputGroup>
  )
}

IntegerField.propTypes = {
  key: PropTypes.string,
  paramMap: PropTypes.object,
  dispatchAction: PropTypes.func,
}

export default IntegerField

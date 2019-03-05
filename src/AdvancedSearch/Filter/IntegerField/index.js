import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
const IntegerField = props => {
  return (
    <Form.Control
      key={props.key}
      name="value"
      onChange={e => props.paramMap.update({ dispatchAction: props.dispatchParameterAction, e: e })}
      size="sm"
      type="number"
      value={props.paramMap.value}
    />
  )
}

IntegerField.propTypes = {
  key: PropTypes.string,
  paramMap: PropTypes.object,
  dispatchParameterAction: PropTypes.func,
}

export default IntegerField

import React from 'react'
import PropTypes from 'prop-types'
import { InputGroup, Form } from 'react-bootstrap'
const IntegerField = props => {
  return (
    <InputGroup size="sm">
      <Form.Control
        key={props.key}
        min={0}
        name="value"
        onChange={e => props.paramMap.update({ dispatchAction: props.dispatchAction, e: e })}
        size="sm"
        type={props.type || 'number'}
        value={props.paramMap.value}
      />
      <InputGroup.Append>
        <InputGroup.Text>%</InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  )
}

IntegerField.propTypes = {
  key: PropTypes.string,
  paramMap: PropTypes.object,
  dispatchAction: PropTypes.func,
}

export default IntegerField

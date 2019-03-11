import React from 'react'
import PropTypes from 'prop-types'
import { StandardizedInput } from 'shared/classes/StandardizedInput'

import { Form } from 'react-bootstrap'

const IntegerField = props => {
  return (
    <Form.Control
      className=""
      key={props.key}
      min={props.paramMap.props.minValue || 0}
      max={props.paramMap.props.maxValue}
      name="value"
      onChange={e => props.paramMap.update({ dispatchAction: props.dispatchAction, e: new StandardizedInput(e) })}
      size="sm"
      type={props.type || 'number'}
      value={props.paramMap.value}
    />
  )
}

IntegerField.propTypes = {
  key: PropTypes.string,
  paramMap: PropTypes.object,
  dispatchAction: PropTypes.func,
}

export default IntegerField

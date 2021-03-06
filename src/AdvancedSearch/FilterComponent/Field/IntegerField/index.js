import React from 'react'
import PropTypes from 'prop-types'
import StandardizedInput from 'shared/classes/StandardizedInput'

import { Form } from 'react-bootstrap'

const IntegerField = props => {
  return (
    <Form.Control
      className={props.paramMap.inputClass}
      key={props.key}
      min={props.paramMap.validations.min || 0}
      max={props.paramMap.validations.max}
      name="value"
      onChange={e => {
        props.paramMap.update({ dispatchAction: props.dispatchAction, e: new StandardizedInput(e) })
      }}
      type={props.type || 'number'}
      value={props.paramMap.value}
    />
  )
}

IntegerField.propTypes = {
  key: PropTypes.string,
  paramMap: PropTypes.object,
  dispatchAction: PropTypes.func,
  onChange: PropTypes.func,
}

export default IntegerField

import React from 'react'
import PropTypes from 'prop-types'
import { StandardizedInput } from 'shared/classes/StandardizedInput'
import AutosizeInput from 'react-input-autosize'

import { Form } from 'react-bootstrap'

const IntegerField = props => {
  return (
    <AutosizeInput
      className=""
      key={props.key}
      min={0}
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

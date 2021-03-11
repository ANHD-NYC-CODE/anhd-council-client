import React from 'react'
import PropTypes from 'prop-types'
import AutosizeInput from 'react-input-autosize'

import StandardizedInput from 'shared/classes/StandardizedInput'

const IntegerField = props => (
  <AutosizeInput
    key={props.key}
    min={0}
    name="value"
    onChange={e => props.paramMap.update({ dispatchAction: props.dispatchAction, e: new StandardizedInput(e) })}
    size="sm"
    type={props.type || 'number'}
    value={props.paramMap.value}
  />
)

IntegerField.propTypes = {
  key: PropTypes.string,
  paramMap: PropTypes.object,
  dispatchAction: PropTypes.func,
}

export default IntegerField

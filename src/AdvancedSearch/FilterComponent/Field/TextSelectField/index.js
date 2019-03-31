import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import StandardizedInput from 'shared/classes/StandardizedInput'
import { Form } from 'react-bootstrap'
const TextSelectField = props => {
  return (
    <Form.Control
      name="value"
      as="select"
      className={classnames({ valued: !!props.paramMap.value })}
      data-range-key={props.paramMap.rangeKey}
      onChange={e =>
        props.paramMap.rangeKey
          ? props.rangeChange(props.paramMap, e)
          : props.paramMap.update({ dispatchAction: props.dispatchAction, e: new StandardizedInput(e) })
      }
      value={props.paramMap.value}
    >
      {props.options.map((option, index) => {
        return (
          <option key={`paramMap-${props.paramMapIndex}-option-${index}`} name={option.name} value={option.value}>
            {option.label}
          </option>
        )
      })}
    </Form.Control>
  )
}

TextSelectField.propTypes = {}

export default TextSelectField

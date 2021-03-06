import React from 'react'
import PropTypes from 'prop-types'
import { InputGroup } from 'react-bootstrap'

import './style.scss'

const GenericFieldSet = props => (
  <InputGroup className="generic-fieldset fieldset" key={props.key}>
    {props.paramMap.valuePrefix && (
      <InputGroup.Prepend className="input-group__label">
        <InputGroup.Text>{props.paramMap.valuePrefix}</InputGroup.Text>
      </InputGroup.Prepend>
    )}
    {props.paramMap.baseComponent({
      key: `paramMap-field-${props.paramMapIndex}`,
      dispatchAction: props.dispatchAction,
      options: props.paramMap.options,
      paramMap: props.paramMap,
    })}
  </InputGroup>
)

GenericFieldSet.propTypes = {
  key: PropTypes.string,
  dispatchAction: PropTypes.func,
  paramMap: PropTypes.object,
  paramMapIndex: PropTypes.number,
  options: PropTypes.array,
}

export default GenericFieldSet

import React from 'react'
import PropTypes from 'prop-types'
import { InputGroup, Col } from 'react-bootstrap'
import './style.scss'
const GenericFieldSet = props => {
  return (
    <InputGroup
      className="generic-fieldset fieldset"
      key={props.key}
      as={Col}
      xs={{
        '3': props.filter && !props.paramMap.rangeKey,
        '6': !props.filter,
        '8': props.filter && props.paramMap.rangeKey,
      }}
    >
      {props.paramMap.valuePrefix && (
        <InputGroup.Prepend>
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
}

GenericFieldSet.propTypes = {
  key: PropTypes.string,
  dispatchAction: PropTypes.func,
  paramMap: PropTypes.object,
  paramMapIndex: PropTypes.number,
  options: PropTypes.array,
}

export default GenericFieldSet

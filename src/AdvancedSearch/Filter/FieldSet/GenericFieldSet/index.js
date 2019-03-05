import React from 'react'
import PropTypes from 'prop-types'

const GenericFieldSet = props => {
  return (
    <div className="generic-fieldset" key={props.key}>
      {props.paramMap.baseComponent({
        key: `paramMap-field-${props.paramMapIndex}`,
        dispatchAction: props.dispatchAction,
        paramMap: props.paramMap,
      })}
    </div>
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

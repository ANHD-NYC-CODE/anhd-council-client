import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'

const MultiTypeFieldGroup = props => {
  return (
    <div className="multitype-fieldgroup">
      {props.paramSet.paramMaps.map((paramMap, paramMapIndex) => {
        return paramMap.component({
          key: `integer-fieldset-${paramMapIndex}`,
          paramMap: paramMap,
          paramMapIndex: paramMapIndex,
          options: props.paramSet.setComponent.options,
          onChangeParamMap: props.onChangeParamMap,
        })
      })}
      {!!props.paramSet.paramMaps.length && (
        <Button variant="danger" onClick={() => props.clearParamSetMaps(props.paramSet)}>
          -
        </Button>
      )}
    </div>
  )
}

MultiTypeFieldGroup.propTypes = {
  dispatchParameterAction: PropTypes.func,
  onChangeParamMap: PropTypes.func,
  paramSet: PropTypes.object,
  paramSetIndex: PropTypes.number,
  removeParamsMap: PropTypes.object,
}

export default MultiTypeFieldGroup

import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'

const IntegerFieldGroup = props => {
  return (
    <div className="integer-fieldgroup">
      {props.paramSet.paramMaps.map((paramMap, paramMapIndex) => {
        return paramMap.component({
          key: `integer-fieldset-${paramMapIndex}`,
          paramMap: paramMap,
          paramMapIndex: paramMapIndex,
          options: props.paramSet.setComponent.options,
          dispatchParameterAction: props.dispatchParameterAction,
        })
      })}
      {!!props.paramSet.paramMaps.length && (
        <Button
          variant="danger"
          onClick={() => props.paramSet.deleteAll({ dispatchAction: props.dispatchParameterAction })}
        >
          -
        </Button>
      )}
    </div>
  )
}

IntegerFieldGroup.propTypes = {
  dispatchParameterAction: PropTypes.func,
  paramSet: PropTypes.object,
  paramSetIndex: PropTypes.number,
}

export default IntegerFieldGroup

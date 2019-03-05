import React from 'react'
import PropTypes from 'prop-types'

import { Button, Form } from 'react-bootstrap'

const IntegerFieldGroup = props => {
  return (
    <div className="text-fieldgroup">
      {props.paramSet.paramMaps.length ? (
        <Form.Label>{props.paramSet.props.label}</Form.Label>
      ) : (
        <Button onClick={() => props.paramSet.createOne({ dispatchAction: props.dispatchParameterAction })}>
          {props.paramSet.props.newButtonLabel}
        </Button>
      )}
      {props.paramSet.paramMaps.map((paramMap, paramMapIndex) => {
        return paramMap.component({
          key: `integer-fieldset-${paramMapIndex}`,
          paramMap: paramMap,
          paramMapIndex: paramMapIndex,
          options: paramMap.options,
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

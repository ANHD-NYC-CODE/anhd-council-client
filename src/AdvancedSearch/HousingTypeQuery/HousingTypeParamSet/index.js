import React from 'react'
import PropTypes from 'prop-types'

import { Form, Button } from 'react-bootstrap'

const HousingTypeParamSet = props => {
  return (
    <Form.Group className="housingtype-paramset">
      {props.paramSet.paramMaps.length ? (
        <Form.Label>{props.paramSet.setComponent.label}</Form.Label>
      ) : (
        <Button onClick={() => props.paramSet.createOne({ dispatchAction: props.dispatchParameterAction })}>
          {props.paramSet.setComponent.newButtonLabel}
        </Button>
      )}
      {props.paramSet.setComponent.component({
        dispatchParameterAction: props.dispatchParameterAction,
        paramSet: props.paramSet,
        paramSetIndex: props.paramSetIndex,
      })}
    </Form.Group>
  )
}

HousingTypeParamSet.propTypes = {
  dispatchParameterAction: PropTypes.func,
  paramSetIndex: PropTypes.number,
  paramSet: PropTypes.object,
}

export default HousingTypeParamSet

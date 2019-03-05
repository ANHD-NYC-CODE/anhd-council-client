import React from 'react'
import PropTypes from 'prop-types'

import { Form } from 'react-bootstrap'

const HousingTypeParamSet = props => {
  return (
    <Form.Group className="housingtype-paramset">
      {props.paramSet.component({
        key: 'housing-type-param-set',
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

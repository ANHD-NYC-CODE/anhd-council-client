import React from 'react'
import PropTypes from 'prop-types'

import { Form } from 'react-bootstrap'

const HousingTypeParamSet = props => {
  return (
    <Form.Group className="housingtype-paramset">
      {props.paramSet.component({
        key: 'housing-type-param-set',
        dispatchAction: props.dispatchAction,
        paramSet: props.paramSet,
        paramSetIndex: props.paramSetIndex,
      })}
    </Form.Group>
  )
}

HousingTypeParamSet.propTypes = {
  dispatchAction: PropTypes.func,
  paramSetIndex: PropTypes.number,
  paramSet: PropTypes.object,
}

export default HousingTypeParamSet

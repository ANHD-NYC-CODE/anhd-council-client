import React from 'react'
import PropTypes from 'prop-types'

import { Form, Col, Button } from 'react-bootstrap'

const HousingTypeParamSet = props => {
  return props.paramSet.allowActions && !props.paramSet.paramMaps.length ? (
    <Form.Group as={Col} className="housingtype-paramset">
      <Button onClick={() => props.paramSet.create({ dispatchAction: props.dispatchAction })}>
        {props.paramSet.props.newButtonLabel}
      </Button>
    </Form.Group>
  ) : (
    <Form.Group as={Col} xs={12} className="housingtype-paramset">
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

import React from 'react'
import PropTypes from 'prop-types'

import { Form, Col, Button } from 'react-bootstrap'

const HousingTypeParamSet = props => {
  return props.paramSet.allowActions && !props.paramSet.paramMaps.length ? (
    <Col>
      <Button onClick={() => props.paramSet.create({ dispatchAction: props.dispatchAction })}>
        {props.paramSet.props.newButtonLabel}
      </Button>
    </Col>
  ) : (
    <Col xs={12}>
      <Form.Group className="housingtype-paramset">
        <Form.Label>{props.paramSet.props.label}</Form.Label>
        {props.paramSet.component({
          key: 'housing-type-param-set',
          dispatchAction: props.dispatchAction,
          paramSet: props.paramSet,
          paramSetIndex: props.paramSetIndex,
        })}
      </Form.Group>
    </Col>
  )
}

HousingTypeParamSet.propTypes = {
  dispatchAction: PropTypes.func,
  paramSetIndex: PropTypes.number,
  paramSet: PropTypes.object,
}

export default HousingTypeParamSet

import React from 'react'
import PropTypes from 'prop-types'

import { Form, Col, InputGroup, Button } from 'react-bootstrap'

const HousingTypeParamSet = props => {
  return (
    <Form.Row>
      <Col>
        {props.paramSet.allowActions && !props.paramSet.paramMaps.length ? (
          <Button onClick={() => props.paramSet.create({ dispatchAction: props.dispatchAction })}>
            {props.paramSet.props.newButtonLabel}
          </Button>
        ) : (
          <Form.Group className="housingtype-paramset">
            <Form.Label>{props.paramSet.props.label}</Form.Label>
            {props.paramSet.component({
              key: 'housing-type-param-set',
              dispatchAction: props.dispatchAction,
              paramSet: props.paramSet,
              paramSetIndex: props.paramSetIndex,
            })}
          </Form.Group>
        )}
      </Col>
    </Form.Row>
  )
}

HousingTypeParamSet.propTypes = {
  dispatchAction: PropTypes.func,
  paramSetIndex: PropTypes.number,
  paramSet: PropTypes.object,
}

export default HousingTypeParamSet

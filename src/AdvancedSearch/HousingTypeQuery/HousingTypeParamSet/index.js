import React from 'react'
import PropTypes from 'prop-types'

import { Form, Col, ButtonGroup, Button } from 'react-bootstrap'

const HousingTypeParamSet = props => {
  return (
    <Form.Row className="housingtype-paramset align-items-center">
      <Form.Group className="housingtype-paramset--group" as={Col} xs={10}>
        {props.paramSet.component({
          key: 'housing-type-param-set',
          dispatchAction: props.dispatchAction,
          paramSet: props.paramSet,
          paramSetIndex: props.paramSetIndex,
        })}
      </Form.Group>
      <Col xs={2} className="flex-column">
        <ButtonGroup className="align-center">
          <Button
            size="sm"
            onClick={() => props.paramSet.deleteAll({ dispatchAction: props.dispatchAction })}
            variant="danger"
          >
            -
          </Button>
        </ButtonGroup>
      </Col>
    </Form.Row>
  )
}

HousingTypeParamSet.propTypes = {
  dispatchAction: PropTypes.func,
  paramSetIndex: PropTypes.number,
  paramSet: PropTypes.object,
  removeFilter: PropTypes.func,
}

export default HousingTypeParamSet

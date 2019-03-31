import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { Form, Col, ButtonGroup, Button } from 'react-bootstrap'

const ParamSetWrapper = props => {
  return (
    <Form.Row className="form-row__container housingtype-paramset align-content-center">
      <Form.Group className="paramset-wrapper--group" as={Col} xs={10}>
        {props.paramSet.component({
          dispatchAction: props.dispatchAction,
          paramSet: props.paramSet,
          paramSetIndex: props.paramSetIndex,
        })}
      </Form.Group>
      <Col xs={2} className="flex-column">
        <ButtonGroup className="align-self-center">
          <Button onClick={() => props.paramSet.deleteAll({ dispatchAction: props.dispatchAction })} variant="danger">
            <FontAwesomeIcon icon={faMinus} />
          </Button>
        </ButtonGroup>
      </Col>
    </Form.Row>
  )
}

ParamSetWrapper.propTypes = {
  dispatchAction: PropTypes.func,
  paramSetIndex: PropTypes.number,
  paramSet: PropTypes.object,
  removeFilter: PropTypes.func,
}

export default ParamSetWrapper

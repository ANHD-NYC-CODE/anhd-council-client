import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { Form, Col, ButtonGroup, Button } from 'react-bootstrap'

const ParamSetWrapper = props => {
  return (
    <div className="form-row__container housingtype-paramset align-content-center">
      <div className="paramset-wrapper--group">
        {props.paramSet.component({
          dispatchAction: props.dispatchAction,
          paramSet: props.paramSet,
          paramSetIndex: props.paramSetIndex,
        })}
      </div>
      <div className="flex-column">
        <ButtonGroup className="align-self-center">
          <Button onClick={() => props.paramSet.deleteAll({ dispatchAction: props.dispatchAction })} variant="danger">
            <FontAwesomeIcon icon={faMinus} />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

ParamSetWrapper.propTypes = {
  dispatchAction: PropTypes.func,
  paramSetIndex: PropTypes.number,
  paramSet: PropTypes.object,
  removeFilter: PropTypes.func,
}

export default ParamSetWrapper

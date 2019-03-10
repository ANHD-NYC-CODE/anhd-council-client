import React from 'react'
import PropTypes from 'prop-types'
import { updateHousingType } from 'Store/AdvancedSearch/actions'

import { Form, Col, Row } from 'react-bootstrap'
import HousingTypeParamSet from 'AdvancedSearch/HousingTypeQuery/HousingTypeParamSet'
import HousingTypeSelect from 'AdvancedSearch/HousingTypeQuery/HousingTypeSelect'

const HousingTypeSelection = props => {
  const dispatchAction = () => {
    props.dispatch(updateHousingType(props.housingTypeIndex, props.housingType))
  }

  return (
    <Form>
      <Form.Group as={Row}>
        <Col xs={12}>
          <HousingTypeSelect
            onChange={e => props.changeHousingType(props.housingTypeIndex, e)}
            value={props.housingType.constant}
          />
        </Col>
      </Form.Group>
      <Form.Row>
        {Object.keys(props.housingType.paramsObject).map((paramsSetKey, paramSetIndex) => (
          <HousingTypeParamSet
            key={`housingtype-paramset-${paramSetIndex}`}
            dispatchAction={dispatchAction}
            paramSet={props.housingType.paramsObject[paramsSetKey]}
          />
        ))}
      </Form.Row>
    </Form>
  )
}

HousingTypeSelection.propTypes = {
  changeHousingType: PropTypes.func,
  dispatch: PropTypes.func,
  housingType: PropTypes.object,
  housingTypeIndex: PropTypes.number,
}

export default HousingTypeSelection

import React from 'react'
import PropTypes from 'prop-types'
import { updateHousingType } from 'Store/AdvancedSearch/actions'

import { Form, Col, Row, Button } from 'react-bootstrap'
import HousingTypeParamSet from 'AdvancedSearch/HousingTypeQuery/HousingTypeParamSet'
import HousingTypeSelect from 'AdvancedSearch/HousingTypeQuery/HousingTypeSelect'

const HousingTypeSelection = props => {
  const dispatchAction = () => {
    props.dispatch(updateHousingType(props.housingTypeIndex, props.housingType))
  }

  return (
    <div className="housing-type-selection">
      <Form.Group as={Row}>
        <Col xs={12}>
          <HousingTypeSelect
            onChange={e => props.changeHousingType(props.housingTypeIndex, e)}
            value={props.housingType.constant}
          />
        </Col>
      </Form.Group>

      {Object.keys(props.housingType.paramsObject).map((paramsSetKey, paramSetIndex) => {
        const paramSet = props.housingType.paramsObject[paramsSetKey]
        return !!paramSet.allowActions && !paramSet.paramMaps.length ? (
          <Form.Row>
            <Form.Group as={Col} className="housingtype-paramset">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => paramSet.create({ dispatchAction: dispatchAction })}
              >
                {paramSet.props.newButtonLabel}
              </Button>
            </Form.Group>
          </Form.Row>
        ) : (
          <HousingTypeParamSet
            key={`housingtype-paramset-${paramSetIndex}`}
            dispatchAction={dispatchAction}
            paramSet={props.housingType.paramsObject[paramsSetKey]}
          />
        )
      })}
    </div>
  )
}

HousingTypeSelection.propTypes = {
  changeHousingType: PropTypes.func,
  dispatch: PropTypes.func,
  housingType: PropTypes.object,
  housingTypeIndex: PropTypes.number,
}

export default HousingTypeSelection

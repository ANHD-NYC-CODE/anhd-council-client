import React from 'react'
import PropTypes from 'prop-types'
import { updateHousingType } from 'Store/AdvancedSearch/actions'

import { Form, Col, Row, Button } from 'react-bootstrap'
import ParamSetWrapper from 'shared/components/ParamSetWrapper'
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
            value={props.housingType.id || props.housingType.resourceModel.id}
          />
        </Col>
      </Form.Group>

      {Object.keys(props.housingType.paramSets).map((paramsSetKey, paramSetIndex) => {
        const paramSet = props.housingType.paramSets[paramsSetKey]

        return !paramSet.paramMaps.length ? (
          <Form.Row key={`housingtype-${paramSetIndex}`}>
            <Form.Group as={Col} className="paramset-wrapper--group">
              <Button
                className="housingtype-paramset--new-button"
                variant="outline-primary"
                onClick={() => paramSet.create({ dispatchAction: dispatchAction })}
              >
                {`Add ${paramSet.label} +`}
              </Button>
            </Form.Group>
          </Form.Row>
        ) : (
          <ParamSetWrapper
            key={`housingtype-paramset-${paramSetIndex}`}
            dispatchAction={dispatchAction}
            paramSet={props.housingType.paramSets[paramsSetKey]}
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

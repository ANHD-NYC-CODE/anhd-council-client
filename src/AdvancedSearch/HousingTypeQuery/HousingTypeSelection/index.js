import React from 'react'
import PropTypes from 'prop-types'
import * as ht from 'shared/constants/housingTypes'
import { HousingType } from 'Store/AdvancedSearch/classes/HousingType'

import { updateHousingType } from 'Store/AdvancedSearch/actions'
import { Form, Col } from 'react-bootstrap'
import CustomSelect from 'shared/components/CustomSelect'
import HousingTypeParamSet from 'AdvancedSearch/HousingTypeQuery/HousingTypeParamSet'

const changeHousingType = (dispatch, housingTypeIndex, option) => {
  const newHousingType = new HousingType(option.value.value)

  dispatch(updateHousingType(housingTypeIndex, newHousingType))
}

const HousingTypeSelection = props => {
  const dispatchParameterAction = () => {
    props.dispatch(updateHousingType(props.housingTypeIndex, props.housingType))
  }

  return (
    <div className="housingtype-selection">
      <Form.Group>
        <Col sm={6} md={4}>
          <Form.Label>Housing Type</Form.Label>
          <CustomSelect
            isSearchable={false}
            onChange={e => changeHousingType(props.dispatch, props.housingTypeIndex, e)}
            options={Object.keys(ht).map(key => ({
              value: { key: 'object', value: ht[key].constant },
              label: ht[key].name,
            }))}
            size="sm"
            value={{ value: props.housingType.constant, label: props.housingType.name.toLowerCase() }}
          />
        </Col>
      </Form.Group>
      <Form.Group>
        {!!Object.keys(props.housingType.paramsObject).length && <Form.Label>Options</Form.Label>}
        {Object.keys(props.housingType.paramsObject).map((paramsSetKey, paramSetIndex) => (
          <HousingTypeParamSet
            dispatchParameterAction={dispatchParameterAction}
            key={`housingtype-paramset-${paramSetIndex}`}
            paramSet={props.housingType.paramsObject[paramsSetKey]}
          />
        ))}
      </Form.Group>
    </div>
  )
}

HousingTypeSelection.propTypes = {
  dispatch: PropTypes.func,
  housingType: PropTypes.object,
  housingTypeIndex: PropTypes.number,
}

export default HousingTypeSelection

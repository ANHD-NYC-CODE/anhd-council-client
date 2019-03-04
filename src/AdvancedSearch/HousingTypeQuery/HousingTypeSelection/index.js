import React from 'react'
import PropTypes from 'prop-types'
import * as ht from 'shared/constants/housingTypes'
import { HousingType } from 'Store/AdvancedSearch/classes/HousingType'

import { updateHousingType } from 'Store/AdvancedSearch/actions'
import { Form, Col, Button } from 'react-bootstrap'
import CustomSelect from 'shared/components/CustomSelect'
import HousingTypeParamSet from 'AdvancedSearch/HousingTypeQuery/HousingTypeParamSet'

const changeHousingType = (dispatch, housingTypeIndex, option) => {
  const newHousingType = new HousingType(option.value.value)

  dispatch(updateHousingType(housingTypeIndex, newHousingType))
}

const addHousingTypeParamMapping = (dispatch, housingTypeIndex, housingType, paramsMappingKey, paramMapIndex) => {
  housingType.addParamMapping(paramsMappingKey, paramMapIndex)
  dispatch(updateHousingType(housingTypeIndex, housingType))
}

const HousingTypeSelection = props => {
  const dispatchParameterAction = () => {
    props.dispatch(updateHousingType(props.housingTypeIndex, props.housingType))
  }

  return (
    <Form.Row className="housingtype-selection">
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

      {Object.keys(props.housingType.paramsObject).map((paramsSetKey, paramSetIndex) => (
        <HousingTypeParamSet
          key={`housingtype-paramset-${paramSetIndex}`}
          paramSet={props.housingType.paramsObject[paramsSetKey]}
          parmSetIndex={paramSetIndex}
          dispatchParameterAction={dispatchParameterAction}
        />
      ))}
      {Object.keys(props.housingType.paramsMappingSchema).map((schemaKey, index) => {
        return (
          props.housingType.paramsObject[schemaKey].paramMaps.length <
            props.housingType.paramsMappingSchema[schemaKey].maxMaps && (
            <Col key={`${props.housingType.name}-add-param-${schemaKey}-${index}`} sm={6} md={4}>
              <Button
                onClick={() =>
                  addHousingTypeParamMapping(props.dispatch, props.housingTypeIndex, props.housingType, schemaKey, 0)
                }
              >
                {props.housingType.paramsMappingSchema[schemaKey].filter.newButtonLabel}
              </Button>
            </Col>
          )
        )
      })}
    </Form.Row>
  )
}

HousingTypeSelection.propTypes = {
  dispatch: PropTypes.func,
  housingType: PropTypes.object,
  housingTypeIndex: PropTypes.number,
}

export default HousingTypeSelection

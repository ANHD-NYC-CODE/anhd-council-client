import React from 'react'
import PropTypes from 'prop-types'
import { Form, Col, Button } from 'react-bootstrap'

const changeHousingTypeParam = (dispatchParameterAction, housingTypeIndex, housingType, paramSet, paramMapIndex, e) => {
  // Converts multi select input value into a standardized Input object
  if (Array.isArray(e)) {
    if (e.length) {
      e = { name: e[0].name, value: e.map(v => v.value).join(',') }
    } else {
      e = { name: 'value', value: '' }
    }
  }
  const standarizedInputObject = { name: e.name, value: e.value }
  paramSet.updateParameterMap(paramMapIndex, standarizedInputObject)
  dispatchParameterAction()
}

const removeParamsObject = (dispatchParameterAction, paramSet, paramMapIndex) => {
  paramSet.removeParameterMap(paramMapIndex)
  dispatchParameterAction()
}

const HousingTypeParamField = props => {
  return (
    <Col className="housingtype-paramfield">
      <Form.Label>
        <Button
          variant="danger"
          onClick={() => removeParamsObject(props.dispatchParameterAction, props.paramSet, props.paramMapIndex)}
        >
          {' '}
          -{' '}
        </Button>
      </Form.Label>
      {props.paramSet.filter.component({
        paramMapping: props.paramMap,
        index: props.paramSetIndex,
        options: props.paramSet.filter.options(props.paramSet.filter.optionValues),
        onChange: e =>
          changeHousingTypeParam(
            props.dispatchParameterAction,
            props.housingTypeIndex,
            props.housingType,
            props.paramSet,
            props.paramMapIndex,
            e
          ),
      })}
    </Col>
  )
}

HousingTypeParamField.propTypes = {
  dispatchParameterAction: PropTypes.func,
  paramMap: PropTypes.object,
  paramMapIndex: PropTypes.number,
  paramSetIndex: PropTypes.number,
  paramSet: PropTypes.object,
}

export default HousingTypeParamField

import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const changeHousingTypeParam = (dispatchParameterAction, paramMap, e) => {
  // Converts multi select input value into a standardized Input object
  if (Array.isArray(e)) {
    if (e.length) {
      e = { name: e[0].name, value: e.map(v => v.value).join(',') }
    } else {
      e = { name: 'value', value: '' }
    }
  }
  const standarizedInputObject = { name: e.name, value: e.value }
  paramMap.updateParameterMapValue(standarizedInputObject)
  dispatchParameterAction()
}

const HousingTypeParamField = props => {
  return (
    <div>
      <div className="housingtype-paramfield">
        {props.paramSet.filter.component({
          paramMapping: props.paramMap,
          index: props.paramSetIndex,
          options: props.paramSet.filter.options(props.paramSet.filter.optionValues),
          onChange: e => changeHousingTypeParam(props.dispatchParameterAction, props.paramMap, e),
        })}
      </div>
      <div>
        <Button
          variant="danger"
          onClick={() => props.removeParamsMap(props.dispatchParameterAction, props.paramSet, props.paramMapIndex)}
        >
          {' '}
          -{' '}
        </Button>
      </div>
    </div>
  )
}

HousingTypeParamField.propTypes = {
  dispatchParameterAction: PropTypes.func,
  paramMap: PropTypes.object,
  paramMapIndex: PropTypes.number,
  paramSetIndex: PropTypes.number,
  paramSet: PropTypes.object,
  removeParamsMap: PropTypes.func,
}

export default HousingTypeParamField

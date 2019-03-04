import React from 'react'
import PropTypes from 'prop-types'

import { Form, Button } from 'react-bootstrap'

const HousingTypeParamSet = props => {
  const changeHousingTypeParam = (paramMap, e) => {
    // Converts multi select input value into a standardized Input object
    if (Array.isArray(e)) {
      if (e.length) {
        e = { name: e[0].name, value: e.map(v => v.value).join(',') }
      } else {
        e = { name: 'value', value: '' }
      }
    }
    // Convert form event into standardized input
    if (e.target) {
      const target = e.target
      e.name = target.name
      e.value = target.value
    }

    const standarizedInputObject = { name: e.name, value: e.value }
    paramMap.updateParameterMapValue(standarizedInputObject)
    props.dispatchParameterAction()
  }

  const removeParamsMap = (paramSet, paramMapIndex) => {
    paramSet.removeParameterMap(paramMapIndex)
    props.dispatchParameterAction()
  }

  const clearParamSetMaps = paramSet => {
    paramSet.clearParameterMaps()
    props.dispatchParameterAction()
  }
  return (
    <Form.Group className="housingtype-paramset">
      {props.paramSet.paramMaps.length ? (
        <Form.Label>{props.paramSet.setComponent.label}</Form.Label>
      ) : (
        <Button onClick={() => props.paramSet.createOne({ dispatchAction: props.dispatchParameterAction })}>
          {props.paramSet.setComponent.newButtonLabel}
        </Button>
      )}
      {props.paramSet.setComponent.component({
        clearParamSetMaps: clearParamSetMaps,
        onChangeParamMap: changeHousingTypeParam,
        dispatchParameterAction: props.dispatchParameterAction,
        paramSet: props.paramSet,
        paramSetIndex: props.paramSetIndex,
        removeParamsMap: removeParamsMap,
      })}
    </Form.Group>
  )
}

HousingTypeParamSet.propTypes = {
  dispatchParameterAction: PropTypes.func,
  paramSetIndex: PropTypes.number,
  paramSet: PropTypes.object,
}

export default HousingTypeParamSet

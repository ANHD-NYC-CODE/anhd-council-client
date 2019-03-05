import React from 'react'
import PropTypes from 'prop-types'

import { Form, Button } from 'react-bootstrap'
import { cloneInstance } from 'shared/utilities/classUtils'

import RangeFieldSet from 'AdvancedSearch/Filter/RangeFieldSet'

const renderDateFields = props => {
  const onDateFieldChange = (paramMap, e) => {
    // When changing a comparison to range mode
    if (e.rangeKey && e.name === 'comparison' && e.value.toUpperCase().match(/(BETWEEN|RANGE)/)) {
      // Add the opposite paramMap based on 'rangePosition'
      if (paramMap.rangePosition === 1) {
        props.paramSet.createSpecific({
          dispatchAction: props.dispatchParameterAction,
          paramMap: cloneInstance(props.paramSet.defaults.find(mapping => mapping.rangePosition === 2)),
          unshift: true,
        })
      } else if (paramMap.rangePosition === 2) {
        props.paramSet.createSpecific({
          dispatchAction: props.dispatchParameterAction,
          paramMap: cloneInstance(props.paramSet.defaults.find(mapping => mapping.rangePosition === 1)),
        })
      }
      props.dispatchParameterAction()
    } else {
      paramMap.update({ dispatchAction: props.dispatchParameterAction, e: e })
    }
  }

  if (props.paramSet.paramMaps.length === 1) {
    return props.paramSet.paramMaps[0].component({
      key: `datefieldgroup-${0}`,
      onChange: onDateFieldChange,
      dispatchParameterAction: props.dispatchParameterAction,
      options: props.paramSet.paramMaps[0].options,
      paramMap: props.paramSet.paramMaps[0],
      paramMapIndex: 0,
    })
  } else if (props.paramSet.paramMaps.length > 1) {
    return <RangeFieldSet paramSet={props.paramSet} dispatchParameterAction={props.dispatchParameterAction} />
  } else {
    return null
  }
}

const DateFieldGroup = props => {
  return (
    <div className="date-fieldgroup">
      {props.paramSet.paramMaps.length ? (
        <Form.Label>{props.paramSet.props.label}</Form.Label>
      ) : (
        <Button onClick={() => props.paramSet.createOne({ dispatchAction: props.dispatchParameterAction })}>
          {props.paramSet.props.newButtonLabel}
        </Button>
      )}
      {renderDateFields(props)}
      {!!props.paramSet.paramMaps.length && (
        <Button
          variant="danger"
          onClick={() => props.paramSet.deleteAll({ dispatchAction: props.dispatchParameterAction })}
        >
          -
        </Button>
      )}
    </div>
  )
}

DateFieldGroup.propTypes = {
  dispatchParameterAction: PropTypes.func,
  paramSet: PropTypes.object,
  paramSetIndex: PropTypes.number,
}

export default DateFieldGroup

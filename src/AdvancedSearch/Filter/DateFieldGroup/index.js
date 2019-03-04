import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'
import { cloneInstance } from 'shared/utilities/classUtils'

import CustomSelect from 'shared/components/CustomSelect'
import DateField from 'AdvancedSearch/Filter/DateField'

const comparisonReconfigure = (props, e) => {
  if (e.value.toUpperCase().match(/(LTE|END)/)) {
    props.paramSet.deleteSpecific({
      dispatchAction: props.dispatchParameterAction,
      paramMapIndex: props.paramSet.paramMaps.findIndex(paramMap =>
        paramMap.comparison.toUpperCase().match(/(GTE|START)/)
      ),
    })
  } else if (e.value.toUpperCase().match(/(GTE|START)/)) {
    props.paramSet.deleteSpecific({
      dispatchAction: props.dispatchParameterAction,
      paramMapIndex: props.paramSet.paramMaps.findIndex(paramMap =>
        paramMap.comparison.toUpperCase().match(/(LTE|END)/)
      ),
    })
    props.dispatchParameterAction()
  } else {
    return
  }
}

const renderDateFields = props => {
  const onDateFieldChange = (paramMap, e) => {
    if (e.name === 'comparison' && e.value.toUpperCase().match(/(BETWEEN)/)) {
      // Change paramMap to LTE and clone the GTE default
      if (paramMap.comparison.toUpperCase().match(/(LTE|END)/)) {
        props.paramSet.createSpecific({
          dispatchAction: props.dispatchParameterAction,
          paramMap: cloneInstance(
            props.paramSet.defaults.find(mapping => mapping.comparison.toUpperCase().match(/(GTE|START)/))
          ),
          unshift: true,
        })
      } else if (paramMap.comparison.toUpperCase().match(/(GTE|START)/)) {
        props.paramSet.createSpecific({
          dispatchAction: props.dispatchParameterAction,
          paramMap: cloneInstance(
            props.paramSet.defaults.find(mapping => mapping.comparison.toUpperCase().match(/(LTE|END)/))
          ),
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
      options: props.paramSet.setComponent.options,
      paramMap: props.paramSet.paramMaps[0],
      paramMapIndex: 0,
      type: props.paramSet.setComponent.type.constant,
    })
  } else if (props.paramSet.paramMaps.length > 1) {
    return (
      <div>
        <CustomSelect
          name="comparison"
          options={props.paramSet.setComponent.options}
          onChange={e => comparisonReconfigure(props, e)}
          size="sm"
          value={props.paramSet.setComponent.options.find(option => option.value.toUpperCase().match(/(BETWEEN)/))}
        />
        {props.paramSet.paramMaps.map((paramMap, paramMapIndex) => {
          return (
            <DateField
              key={`paramMap-${paramMapIndex}`}
              onChange={e => paramMap.update({ dispatchAction: props.dispatchParameterAction, e })}
              paramMap={paramMap}
              type={props.paramSet.setComponent.type.constant}
            />
          )
        })}
      </div>
    )
  } else {
    return null
  }
}

const DateFieldGroup = props => {
  return (
    <div className="date-fieldgroup">
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

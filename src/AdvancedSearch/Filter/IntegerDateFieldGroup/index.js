import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'
import { cloneInstance } from 'shared/utilities/classUtils'

import CustomSelect from 'shared/components/CustomSelect'
import DateField from 'AdvancedSearch/Filter/DateField'

import DateFieldSet from 'AdvancedSearch/Filter/DateFieldSet'
import IntegerFieldSet from 'AdvancedSearch/Filter/IntegerFieldSet'

const comparisonReconfigure = (props, e) => {
  if (e.value.toUpperCase().match(/(LTE|END)/)) {
    props.removeParamsMap(
      props.paramSet,
      props.paramSet.paramMaps.findIndex(paramMap => paramMap.comparison.toUpperCase().match(/(GTE|START)/))
    )
  } else if (e.value.toUpperCase().match(/(GTE|START)/)) {
    props.removeParamsMap(
      props.paramSet,
      props.paramSet.paramMaps.findIndex(paramMap => paramMap.comparison.toUpperCase().match(/(LTE|END)/))
    )
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
        props.addHousingTypeParamMapping(
          props.paramSet,
          cloneInstance(props.paramSet.defaults.find(mapping => mapping.comparison.toUpperCase().match(/(GTE|START)/))),
          true
        )
      } else if (paramMap.comparison.toUpperCase().match(/(GTE|START)/)) {
        props.addHousingTypeParamMapping(
          props.paramSet,
          cloneInstance(props.paramSet.defaults.find(mapping => mapping.comparison.toUpperCase().match(/(LTE|END)/)))
        )
      }
      props.dispatchParameterAction()
    } else {
      props.onChangeParamMap(paramMap, e)
    }
  }

  if (props.paramSet.paramMaps.length <= 2) {
    return (
      <div key={`datefieldgroup-${0}`}>
        <IntegerFieldSet
          options={props.paramSet.filter.options}
          onChangeParamMap={props.onChangeParamMap}
          paramMap={props.paramSet.paramMaps[0]}
          paramMapIndex={0}
        />
        <DateFieldSet
          options={props.paramSet.filter.options}
          onChangeParamMap={onDateFieldChange}
          paramMap={props.paramSet.paramMaps[1]}
          paramMapIndex={1}
          type={props.paramSet.filter.type.constant}
        />
      </div>
    )
  } else if (props.paramSet.paramMaps.length > 2) {
    return (
      <div>
        <CustomSelect
          name="comparison"
          options={props.paramSet.filter.options}
          onChange={e => comparisonReconfigure(props, e)}
          size="sm"
          value={props.paramSet.filter.options.find(option => option.value.toUpperCase().match(/(BETWEEN)/))}
        />
        {props.paramSet.paramMaps.map((paramMap, paramMapIndex) => {
          return (
            <DateField
              key={`paramMap-${paramMapIndex}`}
              onChangeParamMap={onDateFieldChange}
              paramMap={paramMap}
              type={props.paramSet.filter.type.constant}
            />
          )
        })}
      </div>
    )
  } else {
    return null
  }
}

const IntegerDateFieldGroup = props => {
  return (
    <div className="date-fieldgroup">
      {renderDateFields(props)}
      {!!props.paramSet.paramMaps.length && (
        <Button variant="danger" onClick={() => props.clearParamSetMaps(props.paramSet)}>
          -
        </Button>
      )}
    </div>
  )
}

IntegerDateFieldGroup.propTypes = {
  addHousingTypeParamMapping: PropTypes.func,
  dispatchParameterAction: PropTypes.func,
  onChangeParamMap: PropTypes.func,
  paramSet: PropTypes.object,
  paramSetIndex: PropTypes.number,
  removeParamsMap: PropTypes.object,
}

export default IntegerDateFieldGroup

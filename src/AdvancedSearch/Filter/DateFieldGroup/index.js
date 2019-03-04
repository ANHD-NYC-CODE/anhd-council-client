import React from 'react'
import PropTypes from 'prop-types'

import { Form, Row, Col } from 'react-bootstrap'
import CustomSelect from 'shared/components/CustomSelect'
import DateField from 'AdvancedSearch/Filter/DateField'

import DateFieldSet from 'AdvancedSearch/Filter/DateFieldSet'

const comparisonReconfigure = (props, e) => {
  if (e.value === 'lte') {
    props.removeParamsMap(props.paramSet, props.paramSet.paramMaps.findIndex(paramMap => paramMap.comparison === 'gte'))
  } else if (e.value === 'gte') {
    props.removeParamsMap(props.paramSet, props.paramSet.paramMaps.findIndex(paramMap => paramMap.comparison === 'lte'))
    props.dispatchParameterAction()
  } else {
    return
  }
}

const renderDateFields = props => {
  const onDateFieldChange = (paramMap, e) => {
    if (e.name === 'comparison' && e.value === 'between') {
      // Add the opposite param mapping to the set
      if (paramMap.comparison === 'gte') {
        props.addHousingTypeParamMapping(
          props.paramSet,
          props.paramSet.defaults.find(mapping => mapping.comparison === 'lte')
        )
      } else {
        props.addHousingTypeParamMapping(
          props.paramSet,
          props.paramSet.defaults.find(mapping => mapping.comparison === 'gte')
        )
      }
      props.dispatchParameterAction()
      // debugger
    } else {
      props.onChangeParamMap(paramMap, e)
    }
  }

  if (props.paramSet.paramMaps.length === 1) {
    return (
      <div key={`datefieldgroup-${0}`}>
        <DateFieldSet
          dateType={props.paramSet.filter.dateType}
          options={props.paramSet.filter.options()}
          onChangeParamMap={onDateFieldChange}
          paramMap={props.paramSet.paramMaps[0]}
          paramMapIndex={0}
        />
      </div>
    )
  } else if (props.paramSet.paramMaps.length > 1) {
    return (
      <Col md="3">
        <CustomSelect
          name="comparison"
          options={props.paramSet.filter.options()}
          onChange={e => comparisonReconfigure(props, e)}
          size="sm"
          value={props.paramSet.filter.options().find(option => option.value === 'between')}
        />
        {props.paramSet.paramMaps.map((paramMap, paramMapIndex) => {
          return (
            <DateField
              key={`paramMap-${paramMapIndex}`}
              dateType={props.paramSet.filter.dateType}
              onChangeParamMap={onDateFieldChange}
              paramMap={paramMap}
            />
          )
        })}
      </Col>
    )
  } else {
    return null
  }
}

const DateFieldGroup = props => {
  return <div className="classname">{renderDateFields(props)}</div>
}

DateFieldGroup.propTypes = {
  addHousingTypeParamMapping: PropTypes.func,
  dispatchParameterAction: PropTypes.func,
  onChangeParamMap: PropTypes.func,
  paramSet: PropTypes.object,
  paramSetIndex: PropTypes.number,
  removeParamsMap: PropTypes.object,
}

export default DateFieldGroup

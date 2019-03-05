import React from 'react'
import PropTypes from 'prop-types'
import { cloneInstance } from 'shared/utilities/classUtils'

import { Button, Form } from 'react-bootstrap'
import RangeFieldSet from 'AdvancedSearch/Filter/FieldSet/RangeFieldSet'

const MultiTypeFieldGroup = props => {
  const rangeChange = (paramMap, e) => {
    // When changing a comparison to range mode
    if (e.rangeKey && e.name === 'comparison' && e.value.toUpperCase().match(/(BETWEEN|RANGE)/)) {
      // Add the opposite paramMap based on 'rangePosition'
      props.paramSet.createSpecific({
        paramMap: cloneInstance(
          props.paramSet.defaults.find(mapping => mapping.rangePosition !== paramMap.rangePosition)
        ),
      })

      props.paramSet.paramMaps
        .sort((a, b) => b.rangePosition - a.rangePosition)
        .forEach((pm, index) => {
          if (index) {
            pm.update({ e: { name: 'comparison', value: 'lte' } })
          } else {
            pm.update({ e: { name: 'comparison', value: 'gte' } })
          }
        })

      props.dispatchParameterAction()
    } else {
      paramMap.update({ dispatchAction: props.dispatchParameterAction, e: e })
    }
  }

  const renderRangeFields = (props, rangeKey) => {
    const paramMapRangeGroup = props.paramSet.paramMaps.filter(paramMap => paramMap.rangeKey === rangeKey)
    if (paramMapRangeGroup.length === 1) {
      return paramMapRangeGroup[0].component({
        key: `paramMap-rangeGroup-${0}`,
        rangeChange: rangeChange,
        dispatchParameterAction: props.dispatchParameterAction,
        options: paramMapRangeGroup[0].options,
        paramMap: paramMapRangeGroup[0],
        paramMapIndex: 0,
        type: paramMapRangeGroup[0].props.type,
      })
    } else if (paramMapRangeGroup.length > 1) {
      return (
        <RangeFieldSet
          key={'rangeFieldSet'}
          paramMapRangeGroup={paramMapRangeGroup}
          paramSet={props.paramSet}
          dispatchParameterAction={props.dispatchParameterAction}
        />
      )
    } else {
      return null
    }
  }

  return (
    <div className="multitype-fieldgroup">
      {props.paramSet.paramMaps.length ? (
        <Form.Label>{props.paramSet.props.label}</Form.Label>
      ) : (
        <Button onClick={() => props.paramSet.create({ dispatchAction: props.dispatchParameterAction })}>
          {props.paramSet.props.newButtonLabel}
        </Button>
      )}
      {props.paramSet.paramMaps.map((paramMap, paramMapIndex) => {
        if (paramMap.rangeKey && props.paramSet.paramMaps.filter(paramMap => paramMap.rangeKey).length === 2) {
          // Only render range field once
          if (paramMap.rangePosition === 1) {
            return renderRangeFields(props, paramMap.rangeKey)
          } else {
            return null
          }
        } else {
          return paramMap.component({
            dispatchParameterAction: props.dispatchParameterAction,
            key: `paramSet-${props.paramSetIndex}-paramMap-component-${paramMapIndex}`,
            options: paramMap.options,
            paramMap: paramMap,
            paramMapIndex: paramMapIndex,
            rangeChange: rangeChange,
            type: paramMap.props.type,
          })
        }
      })}
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

MultiTypeFieldGroup.propTypes = {
  dispatchParameterAction: PropTypes.func,
  paramSet: PropTypes.object,
  paramSetIndex: PropTypes.number,
}

export default MultiTypeFieldGroup

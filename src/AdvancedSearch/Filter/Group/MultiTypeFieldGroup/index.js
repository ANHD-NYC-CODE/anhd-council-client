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
          props.paramSet.defaults.find(
            mapping => mapping.rangePosition && mapping.rangePosition !== paramMap.rangePosition
          )
        ),
      })

      props.paramSet.paramMaps
        .sort((a, b) => a.rangePosition - b.rangePosition)
        .forEach(pm => {
          if (pm.rangePosition === 1) {
            pm.update({ e: { name: 'comparison', value: 'gte' } })
          } else if (pm.rangePosition === 2) {
            pm.update({ e: { name: 'comparison', value: 'lte' } })
          }
        })

      props.dispatchAction()
    } else {
      paramMap.update({ dispatchAction: props.dispatchAction, e: e })
    }
  }

  const renderRangeFields = (props, rangeKey) => {
    const paramMapRangeGroup = props.paramSet.paramMaps.filter(paramMap => paramMap.rangeKey === rangeKey)
    if (paramMapRangeGroup.length === 1) {
      return paramMapRangeGroup[0].component({
        key: `paramMap-rangeGroup-${0}`,
        rangeChange: rangeChange,
        dispatchAction: props.dispatchAction,
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
          dispatchAction={props.dispatchAction}
        />
      )
    } else {
      return null
    }
  }

  return (
    <div className="multitype-fieldgroup" key={props.key}>
      {props.paramSet.paramMaps.length ? (
        <Form.Label>{props.paramSet.props.label}</Form.Label>
      ) : (
        <Button onClick={() => props.paramSet.create({ dispatchAction: props.dispatchAction })}>
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
            dispatchAction: props.dispatchAction,
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
        <Button variant="danger" onClick={() => props.paramSet.deleteAll({ dispatchAction: props.dispatchAction })}>
          -
        </Button>
      )}
    </div>
  )
}

MultiTypeFieldGroup.propTypes = {
  dispatchAction: PropTypes.func,
  paramSet: PropTypes.object,
  paramSetIndex: PropTypes.number,
}

export default MultiTypeFieldGroup

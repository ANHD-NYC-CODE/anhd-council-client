import React from 'react'
import PropTypes from 'prop-types'
import { cloneInstance } from 'shared/utilities/classUtils'

import { Button, Form } from 'react-bootstrap'
import RangeFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/RangeFieldSet'

const renderRangeFields = (props, rangeKey) => {
  const rangeChange = (paramMap, e) => {
    // When changing a comparison to range mode
    if (e.rangeKey && e.name === 'comparison' && e.value.toUpperCase().match(/(BETWEEN|RANGE)/)) {
      // Add the opposite paramMap based on 'rangePosition'
      if (paramMap.rangePosition === 1) {
        props.paramSet.createSpecific({
          dispatchAction: props.dispatchAction,
          paramMap: cloneInstance(props.paramSet.defaults.find(mapping => mapping.rangePosition === 2)),
        })
      } else if (paramMap.rangePosition === 2) {
        props.paramSet.createSpecific({
          dispatchAction: props.dispatchAction,
          paramMap: cloneInstance(props.paramSet.defaults.find(mapping => mapping.rangePosition === 1)),
        })
      }
      props.dispatchAction()
    } else {
      paramMap.update({ dispatchAction: props.dispatchAction, e: e })
    }
  }
  const paramMapRangeGroup = props.paramSet.paramMaps.filter(paramMap => paramMap.rangeKey === rangeKey)
  if (paramMapRangeGroup.length === 1) {
    return paramMapRangeGroup[0].component({
      key: `paramMap-rangeGroup-${0}`,
      rangeChange: rangeChange,
      dispatchAction: props.dispatchAction,
      options: paramMapRangeGroup[0].options,
      paramMap: paramMapRangeGroup[0],
      paramMapIndex: 0,
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

const SingleTypeFieldGroup = props => {
  return (
    <div className="multitype-fieldgroup">
      {props.paramSet.paramMaps.length ? (
        <Form.Label>{props.paramSet.props.label}</Form.Label>
      ) : (
        <Button onClick={() => props.paramSet.createOne({ dispatchAction: props.dispatchAction })}>
          {props.paramSet.props.newButtonLabel}
        </Button>
      )}
      {props.paramSet.paramMaps.map((paramMap, paramMapIndex) => {
        if (paramMap.rangeKey) {
          if (paramMap.rangePosition === 1) {
            // Only render 1 range field set per param map of type.
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
            type: paramMap.props.type,
          })
        }
      })}
      {!!props.paramSet.paramMaps.length && (
        <Button
          variant="danger"
          onClick={() => props.paramSet.deleteAll({ dispatchAction: props.dispatchAction })}
        >
          -
        </Button>
      )}
    </div>
  )
}

SingleTypeFieldGroup.propTypes = {
  dispatchAction: PropTypes.func,
  paramSet: PropTypes.object,
  paramSetIndex: PropTypes.number,
}

export default SingleTypeFieldGroup

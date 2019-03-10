import React from 'react'
import PropTypes from 'prop-types'
import { StandardizedInput } from 'shared/classes/StandardizedInput'

import { InputGroup, Button, Form } from 'react-bootstrap'
import RangeFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/RangeFieldSet'

import './style.scss'

const MultiTypeFieldGroup = props => {
  const rangeChange = (paramMap, e) => {
    e = new StandardizedInput(e)
    // When changing a comparison to range mode
    if (e.rangeKey && e.name === 'comparison' && e.value.toUpperCase().match(/(BETWEEN|RANGE)/)) {
      // Add the opposite paramMap based on 'rangePosition'
      props.paramSet.createOppositeRangeMap({ rangePosition: paramMap.rangePosition })

      props.paramSet.paramMaps
        .sort((a, b) => a.rangePosition - b.rangePosition)
        .forEach(pm => {
          // Set param map comparison values back to default
          if (pm.rangePosition === 1) {
            pm.update({
              e: new StandardizedInput({
                name: 'comparison',
                value: props.paramSet.defaults.find(pm2 => pm2.rangePosition === pm.rangePosition).comparison,
              }),
            })
          } else if (pm.rangePosition === 2) {
            pm.update({
              e: new StandardizedInput({
                name: 'comparison',
                value: props.paramSet.defaults.find(pm2 => pm2.rangePosition === pm.rangePosition).comparison,
              }),
            })
          }
        })

      props.dispatchAction()
    } else {
      paramMap.update({ dispatchAction: props.dispatchAction, e: new StandardizedInput(e) })
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
    </div>
  )
}

MultiTypeFieldGroup.propTypes = {
  dispatchAction: PropTypes.func,
  paramSet: PropTypes.object,
  paramSetIndex: PropTypes.number,
}

export default MultiTypeFieldGroup

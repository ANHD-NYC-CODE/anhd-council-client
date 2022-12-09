import React from 'react'
import PropTypes from 'prop-types'
import StandardizedInput from 'shared/classes/StandardizedInput'

import RangeFieldSet from 'AdvancedSearch/FilterComponent/FieldSet/RangeFieldSet'
import FormError from 'shared/components/FormError'

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
          // if (pm.rangePosition === 1) {
          if (pm.comparison == "lt") {
            pm.update({
              e: new StandardizedInput({
                name: 'comparison',
                value: props.paramSet.defaults.find(pm2 => pm2.rangePosition === pm.rangePosition).comparison,
              }),
            })
            // } else if (pm.rangePosition === 2) {
          } else if (pm.comparison == "gt") {
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
      console.log("length equals 1", paramMapRangeGroup.length)
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

      const uniqueKey = props.paramSet._paramMaps.map((rangeParam) => (
        rangeParam._rangePosition
      ))
      console.log("new var is", uniqueKey)

      return (
        // <div key="rangeFieldSet">
        <div className="test" key={uniqueKey}>
          {console.log("the props from multi-type-field are here are ", props)}

          <RangeFieldSet
            paramMapRangeGroup={paramMapRangeGroup}
            paramSet={props.paramSet}
            dispatchAction={props.dispatchAction}
          />
          {paramMapRangeGroup.some(paramMap => !!paramMap.errors) &&
            [].concat(...paramMapRangeGroup.map(paramMap => paramMap.errors)).map((error, index) => {
              return <FormError key={`range-error-${index}`} show={!!error} message={error.message} />
            })}
        </div>
      )
    } else {
      return null
    }
  }


  return (
    <div className="multitype-fieldgroup" key={props.key}>
      {props.paramSet.paramMaps.map((paramMap, paramMapIndex) => {
        { console.log("compariosn ", paramMap.comparison) }
        { console.log("range key ", paramMap.rangeKey) }
        { console.log("parammap render ", paramMap.rangeKey && props.paramSet.paramMaps.filter(paramMap => paramMap.rangeKey)) }
        if (paramMap.rangeKey && props.paramSet.paramMaps.filter(paramMap => paramMap.rangeKey).length === 2) {

          // Only render range field once
          // if (paramMap.rangePosition === 1) {
          if (paramMap.comparison === "gt") {
            return renderRangeFields(props, paramMap.rangeKey)
          } else {
            return null
          }
        }
        else {
          return (
            <div key={`paramSet-${props.paramSetIndex}-paramMap-component-${paramMapIndex}`}>
              {paramMap.component({
                replaceFilter: props.replaceFilter,
                dispatchAction: props.dispatchAction,
                filterIndex: props.filterIndex,
                filter: props.filter,
                options: paramMap.options,
                paramMap: paramMap,
                paramMapIndex: paramMapIndex,
                rangeChange: rangeChange,
                type: paramMap.props.type,
              })}
              <FormError show={!!paramMap.errors.length} message={(paramMap.errors[0] || {}).message} />
            </div>
          )
        }
      })}
    </div>
  )
}

MultiTypeFieldGroup.propTypes = {
  replaceFilter: PropTypes.func,
  dispatchAction: PropTypes.func,
  filterIndex: PropTypes.number,
  filter: PropTypes.object,
  paramSet: PropTypes.object,
  paramSetIndex: PropTypes.number,
}

export default MultiTypeFieldGroup

import React from 'react'
import PropTypes from 'prop-types'
import CustomSelect from 'shared/components/CustomSelect'
import { StandardizedInput } from 'shared/classes/StandardizedInput'

const comparisonReconfigure = (props, e) => {
  if (e.value.toUpperCase().match(/(LTE|END)/)) {
    props.paramSet.deleteSpecific({
      dispatchAction: props.dispatchAction,
      paramMapIndex: props.paramSet.paramMaps.findIndex(
        paramMap => paramMap.rangeKey === e.rangeKey && paramMap.comparison.toUpperCase().match(/(GTE|START)/)
      ),
    })
  } else if (e.value.toUpperCase().match(/(GTE|START)/)) {
    props.paramSet.deleteSpecific({
      dispatchAction: props.dispatchAction,
      paramMapIndex: props.paramSet.paramMaps.findIndex(
        paramMap => paramMap.rangeKey === e.rangeKey && paramMap.comparison.toUpperCase().match(/(LTE|END)/)
      ),
    })
    props.dispatchAction()
  } else {
    return
  }
}

const RangeFieldSet = props => {
  return (
    <div>
      <CustomSelect
        name="comparison"
        options={props.paramMapRangeGroup[0].options}
        onChange={e => comparisonReconfigure(props, e)}
        size="sm"
        value={props.paramMapRangeGroup[0].options.find(option => option.value.toUpperCase().match(/(BETWEEN|RANGE)/))}
      />
      {props.paramMapRangeGroup
        .sort((a, b) => a.rangePosition - b.rangePosition)
        .map((paramMap, paramMapIndex) => {
          return paramMap.baseComponent({
            key: `rangeGroup-paramMap-${paramMapIndex}`,
            onChange: e => paramMap.update({ dispatchAction: props.dispatchAction, e: new StandardizedInput(e) }),
            paramMap: paramMap,
            type: paramMap.props.type,
          })
        })}
    </div>
  )
}

RangeFieldSet.propTypes = {
  dispatchAction: PropTypes.func,
  paramMapRangeGroup: PropTypes.array,
  paramSet: PropTypes.object,
}

export default RangeFieldSet

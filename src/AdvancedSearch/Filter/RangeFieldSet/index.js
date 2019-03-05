import React from 'react'
import PropTypes from 'prop-types'
import CustomSelect from 'shared/components/CustomSelect'

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

const RangeFieldSet = props => {
  return (
    <div>
      <CustomSelect
        name="comparison"
        options={props.paramSet.paramMaps[0].options}
        onChange={e => comparisonReconfigure(props, e)}
        size="sm"
        value={props.paramSet.paramMaps[0].options.find(option => option.value.toUpperCase().match(/(BETWEEN|RANGE)/))}
      />
      {props.paramSet.paramMaps.map((paramMap, paramMapIndex) => {
        return paramMap.baseComponent({
          key: `paramMap-${paramMapIndex}`,
          onChange: e => paramMap.update({ dispatchAction: props.dispatchParameterAction, e }),
          paramMap: paramMap,
          type: paramMap.props.type,
        })
      })}
    </div>
  )
}

RangeFieldSet.propTypes = {
  dispatchParameterAction: PropTypes.func,
  paramSet: PropTypes.object,
}

export default RangeFieldSet

import React from 'react'
import PropTypes from 'prop-types'
import CustomSelect from 'shared/components/CustomSelect'

const ComparisonFieldSet = props => {
  return (
    <div className="comparison-fieldset" key={props.key}>
      <CustomSelect
        name="comparison"
        options={props.options}
        onChange={e =>
          props.paramMap.rangeKey
            ? props.rangeChange(props.paramMap, e)
            : props.paramMap.update({ dispatchAction: props.dispatchParameterAction, e: e })
        }
        size="sm"
        value={props.options.find(option => option.value === props.paramMap.comparison)}
      />
      {props.paramMap.baseComponent({
        dispatchParameterAction: props.dispatchParameterAction,
        paramMap: props.paramMap,
        onChange: e => props.paramMap.update({ dispatchAction: props.dispatchParameterAction, e }),
        type: props.paramMap.props.type,
      })}
    </div>
  )
}

ComparisonFieldSet.propTypes = {
  key: PropTypes.string,
  dispatchParameterAction: PropTypes.func,
  paramMap: PropTypes.object,
  paramMapIndex: PropTypes.number,
  options: PropTypes.array,
  rangeChange: PropTypes.func,
}

export default ComparisonFieldSet

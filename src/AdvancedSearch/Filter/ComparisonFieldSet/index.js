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
          props.onChange
            ? props.onChange(props.paramMap, e)
            : props.paramMap.update({ dispatchAction: props.dispatchParameterAction, e: e })
        }
        size="sm"
        value={props.options.find(option => option.value === props.paramMap.comparison)}
      />
      {props.paramMap.baseComponent({
        key: `paramMap-field-${props.paramMapIndex}`,
        dispatchParameterAction: props.dispatchParameterAction,
        paramMap: props.paramMap,
        onChange: e => props.paramMap.update({ dispatchAction: props.dispatchParameterAction, e }),
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
}

export default ComparisonFieldSet

import React from 'react'
import PropTypes from 'prop-types'
import CustomSelect from 'shared/components/CustomSelect'

const MultiSelectField = props => {
  return (
    <CustomSelect
      className="textmultiselect-field"
      key={props.key}
      name="value"
      options={props.paramMap.options}
      onChange={e => props.paramMap.update({ dispatchAction: props.dispatchParameterAction, e: e })}
      isMulti={true}
      size="multi-sm"
      value={[...props.paramMap.value.split(',').map(v => props.paramMap.options.find(option => option.value === v))]}
    />
  )
}

MultiSelectField.propTypes = {
  key: PropTypes.string,
  paramMap: PropTypes.object,
  dispatchParameterAction: PropTypes.func,
}

export default MultiSelectField

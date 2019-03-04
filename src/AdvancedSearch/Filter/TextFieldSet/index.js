import React from 'react'
import PropTypes from 'prop-types'
import CustomSelect from 'shared/components/CustomSelect'

const IntegerFieldSet = props => {
  return (
    <div className="integer-fieldset" key={`fieldset-${props.paramMapIndex}`}>
      <CustomSelect
        className="textmultiselect-fieldset--select"
        name="value"
        options={props.options}
        onChange={e => props.paramMap.update({ dispatchAction: props.dispatchParameterAction, e: e })}
        isMulti={true}
        size="multi-sm"
        value={[...props.paramMap.value.split(',').map(v => props.options.find(option => option.value === v))]}
      />
    </div>
  )
}

IntegerFieldSet.propTypes = {
  dispatchParameterAction: PropTypes.func,
  options: PropTypes.array,
  paramMap: PropTypes.object,
  paramMapIndex: PropTypes.number,
}

export default IntegerFieldSet

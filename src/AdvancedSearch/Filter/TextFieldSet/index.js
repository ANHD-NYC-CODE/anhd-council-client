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
        onChange={e => props.onChangeParamMap(props.paramMap, e)}
        isMulti={true}
        size="multi-sm"
        value={[...props.paramMap.value.split(',').map(v => props.options.find(option => option.value === v))]}
      />
    </div>
  )
}

IntegerFieldSet.propTypes = {
  paramMap: PropTypes.object,
  paramMapIndex: PropTypes.number,
  onChangeParamMap: PropTypes.func,
  options: PropTypes.array,
}

export default IntegerFieldSet

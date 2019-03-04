import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col } from 'react-bootstrap'
import CustomSelect from 'shared/components/CustomSelect'

const TextMultiSelectField = props => {
  return (
    <div className="textmultiselect-fieldset" key={`fieldset-${props.index}`}>
      <CustomSelect
        className="textmultiselect-fieldset--select"
        name="value"
        options={props.options}
        onChange={props.onChange}
        isMulti={true}
        size="multi-sm"
        value={[...props.paramMapping.value.split(',').map(v => props.options.find(option => option.value === v))]}
      />
    </div>
  )
}

TextMultiSelectField.propTypes = {
  paramMapping: PropTypes.object,
  index: PropTypes.number,
  onChange: PropTypes.func,
  options: PropTypes.array,
}

export default TextMultiSelectField

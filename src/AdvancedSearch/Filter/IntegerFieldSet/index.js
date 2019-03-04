import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col } from 'react-bootstrap'
import CustomSelect from 'shared/components/CustomSelect'

const IntegerFieldSet = props => {
  return (
    <div className="integer-fieldset" key={`fieldset-${props.paramMapIndex}`}>
      <CustomSelect
        name="comparison"
        options={props.options}
        onChange={e => props.onChangeParamMap(props.paramMap, e)}
        size="sm"
        value={props.options.find(option => option.value === props.paramMap.comparison)}
      />

      <Form.Control
        name="value"
        onChange={e => props.onChangeParamMap(props.paramMap, e)}
        size="sm"
        type="number"
        value={props.paramMap.value}
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

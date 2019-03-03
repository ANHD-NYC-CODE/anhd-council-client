import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col } from 'react-bootstrap'
import CustomSelect from 'shared/components/CustomSelect'

const TextMultiSelectField = props => {
  return (
    <Form.Group className="textmultiselect-fieldset" key={`fieldset-${props.index}`} as={Col}>
      <Row>
        <Col>
          <CustomSelect
            className="textmultiselect-fieldset--select"
            name="value"
            options={props.options}
            onChange={props.onChange}
            isMulti={true}
            size="multi-sm"
            value={[...props.paramMapping.value.split(',').map(v => props.options.find(option => option.value === v))]}
          />
        </Col>
      </Row>
    </Form.Group>
  )
}

TextMultiSelectField.propTypes = {
  paramMapping: PropTypes.object,
  index: PropTypes.number,
  onChange: PropTypes.func,
  options: PropTypes.array,
}

export default TextMultiSelectField

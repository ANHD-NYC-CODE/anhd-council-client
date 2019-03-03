import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col } from 'react-bootstrap'
import CustomSelect from 'shared/components/Select'

const TextSelectFieldSet = props => {
  return (
    <Form.Group className="textselect-fieldset" key={`fieldset-${props.index}`} as={Col}>
      <Row>
        <Col>
          <CustomSelect
            name="value"
            options={props.options}
            onChange={props.onChange}
            isMulti={true}
            size="sm"
            value={[
              ...props.paramMapping.value.split(',').map(v => props.options.find(option => option.value.value === v)),
            ]}
          />
        </Col>
      </Row>
    </Form.Group>
  )
}

TextSelectFieldSet.propTypes = {
  paramMapping: PropTypes.object,
  index: PropTypes.number,
  onChange: PropTypes.func,
  options: PropTypes.array,
}

export default TextSelectFieldSet

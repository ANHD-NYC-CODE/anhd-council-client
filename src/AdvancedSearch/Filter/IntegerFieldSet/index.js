import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col } from 'react-bootstrap'
import CustomSelect from 'shared/components/CustomSelect'

const IntegerFieldSet = props => {
  return (
    <Form.Group className="integer-fieldset" key={`fieldset-${props.index}`} as={Col}>
      <Row>
        <Col>
          <CustomSelect
            name="comparison"
            options={props.options}
            onChange={props.onChange}
            size="sm"
            value={props.options.find(option => option.value === props.paramMapping.comparison)}
          />
        </Col>
        <Col>
          <Form.Control
            name="value"
            onChange={e => props.onChange(e.target)}
            size="sm"
            type="number"
            value={props.paramMapping.value}
          />
        </Col>
      </Row>
    </Form.Group>
  )
}

IntegerFieldSet.propTypes = {
  paramMapping: PropTypes.object,
  index: PropTypes.number,
  onChange: PropTypes.func,
  options: PropTypes.array,
}

export default IntegerFieldSet

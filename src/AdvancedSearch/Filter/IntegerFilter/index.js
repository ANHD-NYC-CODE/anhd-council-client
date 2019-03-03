import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col } from 'react-bootstrap'
import CustomSelect from 'shared/components/Select'

const IntegerFilter = props => {
  return (
    <Form.Group className="integer-filter" key={`filterField-${props.index}`} as={Col}>
      <Row>
        <Col>
          <CustomSelect
            name="comparison"
            options={props.options}
            onChange={e => props.onChange(props.index, props.parentObject, e)}
            size="sm"
            value={props.options.find(option => option.value === props.filter.comparison)}
          />
        </Col>
        <Col>
          <Form.Control
            name="value"
            onChange={e => props.onChange(props.index, props.parentObject, e)}
            size="sm"
            type="number"
            value={props.value}
          />
        </Col>
      </Row>
    </Form.Group>
  )
}

IntegerFilter.propTypes = {
  filter: PropTypes.object,
  index: PropTypes.number,
  onChange: PropTypes.func,
  options: PropTypes.array,
  parentObject: PropTypes.object,
}

export default IntegerFilter

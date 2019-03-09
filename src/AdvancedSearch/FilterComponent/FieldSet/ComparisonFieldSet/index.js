import React from 'react'
import PropTypes from 'prop-types'
import CustomSelect from 'shared/components/CustomSelect'
import { StandardizedInput } from 'shared/classes/StandardizedInput'
import { Form, InputGroup, Col, Row } from 'react-bootstrap'
const ComparisonFieldSet = props => {
  return (
    <Form.Row>
      <Col className="comparison-fieldset" key={props.key}>
        <CustomSelect
          name="comparison"
          options={props.options}
          onChange={e =>
            props.paramMap.rangeKey
              ? props.rangeChange(props.paramMap, e)
              : props.paramMap.update({ dispatchAction: props.dispatchAction, e: new StandardizedInput(e) })
          }
          size="sm"
          value={props.options.find(option => option.value === props.paramMap.comparison)}
        />
      </Col>
      <Col>
        {props.paramMap.baseComponent({
          dispatchAction: props.dispatchAction,
          paramMap: props.paramMap,
          onChange: e => props.paramMap.update({ dispatchAction: props.dispatchAction, e: new StandardizedInput(e) }),
          type: props.paramMap.props.type,
        })}
      </Col>
    </Form.Row>
  )
}

ComparisonFieldSet.propTypes = {
  key: PropTypes.string,
  dispatchAction: PropTypes.func,
  paramMap: PropTypes.object,
  paramMapIndex: PropTypes.number,
  options: PropTypes.array,
  rangeChange: PropTypes.func,
}

export default ComparisonFieldSet

import React from 'react'
import PropTypes from 'prop-types'
import CustomSelect from 'shared/components/CustomSelect'
import { StandardizedInput } from 'shared/classes/StandardizedInput'
import { Form, InputGroup, Col, Row } from 'react-bootstrap'
const ComparisonFieldSet = props => {
  return (
    <Form.Row className="comparison-fieldset" key={props.key}>
      <InputGroup as={Col} size="sm">
        {props.paramMap.languageModule.propertyAdjective && (
          <InputGroup.Append>
            <InputGroup.Text>{props.paramMap.languageModule.propertyAdjective}</InputGroup.Text>
          </InputGroup.Append>
        )}
        <Form.Control
          name="comparison"
          as="select"
          data-range-key={props.paramMap.rangeKey}
          onChange={e =>
            props.paramMap.rangeKey
              ? props.rangeChange(props.paramMap, e)
              : props.paramMap.update({ dispatchAction: props.dispatchAction, e: new StandardizedInput(e) })
          }
        >
          {props.options.map((option, index) => {
            return (
              <option
                key={`paramMap-${props.paramMapIndex}-comparison-option-${index}`}
                name={option.name}
                value={option.value}
              >
                {option.label}
              </option>
            )
          })}
        </Form.Control>
        {/*
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
        /> */}
      </InputGroup>
      <InputGroup as={Col} size="sm">
        {props.paramMap.baseComponent({
          dispatchAction: props.dispatchAction,
          paramMap: props.paramMap,
          onChange: e => props.paramMap.update({ dispatchAction: props.dispatchAction, e: new StandardizedInput(e) }),
          type: props.paramMap.props.type,
        })}
        {props.paramMap.languageModule.type === 'AMOUNT' && (
          <InputGroup.Append>
            {props.paramMap.languageModule.valueSuffix && (
              <InputGroup.Text>{props.paramMap.languageModule.valueSuffix}</InputGroup.Text>
            )}
            <InputGroup.Text>
              {props.paramMap.languageModule.grammaticalNoun(props.paramMap.languageModule.noun, props.paramMap.value)}
            </InputGroup.Text>
          </InputGroup.Append>
        )}
      </InputGroup>
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

import React from 'react'
import PropTypes from 'prop-types'
import StandardizedInput from 'shared/classes/StandardizedInput'
import { Form, InputGroup } from 'react-bootstrap'
import NewFilterSelect from 'AdvancedSearch/FilterComponent/NewFilterSelect'
import classnames from 'classnames'
const PrimaryComparisonFieldSet = props => {
  return (
    <div className="fieldset comparison-fieldset" key={props.key}>
      <InputGroup>
        <Form.Control
          name="comparison"
          as="select"
          className={classnames({ valued: !!props.paramMap.comparison })}
          data-range-key={props.paramMap.rangeKey}
          onChange={e =>
            props.paramMap.rangeKey
              ? props.rangeChange(props.paramMap, e)
              : props.paramMap.update({ dispatchAction: props.dispatchAction, e: new StandardizedInput(e) })
          }
          value={props.paramMap.comparison}
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
      </InputGroup>
      <InputGroup>
        {props.paramMap.valuePrefix && (
          <InputGroup.Prepend className="input-group__label">
            <InputGroup.Text>{props.paramMap.valuePrefix}</InputGroup.Text>
          </InputGroup.Prepend>
        )}
        {props.paramMap.baseComponent({
          dispatchAction: props.dispatchAction,
          paramMap: props.paramMap,
          onChange: e => props.paramMap.update({ dispatchAction: props.dispatchAction, e: new StandardizedInput(e) }),
        })}
        <InputGroup.Append className="input-group__label">
          {props.paramMap.valueSuffix && <InputGroup.Text>{props.paramMap.valueSuffix}</InputGroup.Text>}
          {props.paramMap.paramNoun && <InputGroup.Text>{props.paramMap.paramNoun}</InputGroup.Text>}
        </InputGroup.Append>
      </InputGroup>

      <InputGroup>
        <NewFilterSelect
          filter={props.filter}
          filterIndex={props.filterIndex}
          onChange={props.replaceFilter}
          value={props.filter.resourceModel.resourceConstant}
        />
      </InputGroup>
    </div>
  )
}

PrimaryComparisonFieldSet.propTypes = {
  replaceFilter: PropTypes.func,
  dispatchAction: PropTypes.func,
  filterIndex: PropTypes.number,
  filter: PropTypes.object,
  key: PropTypes.string,
  options: PropTypes.array,
  paramMap: PropTypes.object,
  paramMapIndex: PropTypes.number,
  rangeChange: PropTypes.func,
}

export default PrimaryComparisonFieldSet

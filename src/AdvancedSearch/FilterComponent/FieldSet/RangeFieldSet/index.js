import React from 'react'
import PropTypes from 'prop-types'
import StandardizedInput from 'shared/classes/StandardizedInput'
import { Form, Col, InputGroup } from 'react-bootstrap'
import classnames from 'classnames'

const comparisonReconfigure = (props, e) => {
  e = new StandardizedInput(e)
  if (e.value.toUpperCase().match(/(LTE|END)/)) {
    props.paramSet.deleteSpecific({
      dispatchAction: props.dispatchAction,
      paramMapIndex: props.paramSet.paramMaps.findIndex(
        paramMap => paramMap.rangeKey === e.rangeKey && paramMap.comparison.toUpperCase().match(/(GTE|START)/)
      ),
    })
  } else if (e.value.toUpperCase().match(/(GTE|START)/)) {
    props.paramSet.deleteSpecific({
      dispatchAction: props.dispatchAction,
      paramMapIndex: props.paramSet.paramMaps.findIndex(
        paramMap => paramMap.rangeKey === e.rangeKey && paramMap.comparison.toUpperCase().match(/(LTE|END)/)
      ),
    })
    props.dispatchAction()
  } else {
    return
  }
}

const hasValuePrefix = props => {
  return !!props.paramMapRangeGroup[0].valuePrefix
}

const RangeFieldSet = props => {
  return (
    <Form.Row>
      <InputGroup as={Col} xs={12} sm={12} md={hasValuePrefix(props) ? 12 : 2}>
        <InputGroup.Prepend>
          {hasValuePrefix(props) && <InputGroup.Text>{props.paramMapRangeGroup[0].valuePrefix}</InputGroup.Text>}
        </InputGroup.Prepend>
        <Form.Control
          name="comparison"
          as="select"
          className={classnames({ valued: true })}
          data-range-key={props.paramMapRangeGroup[0].rangeKey}
          onChange={e => comparisonReconfigure(props, e)}
          value={
            props.paramMapRangeGroup[0].options.find(option => option.value.toUpperCase().match(/(BETWEEN|RANGE)/))
              .value
          }
        >
          {props.paramMapRangeGroup[0].options.map((option, index) => {
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
      {props.paramMapRangeGroup
        .sort((a, b) => a.rangePosition - b.rangePosition)
        .map((paramMap, paramMapIndex) => {
          return (
            <InputGroup
              as={Col}
              xs={12}
              sm={12}
              md={hasValuePrefix(props) ? 6 : 5}
              key={`paramMapRangeGroup-col-${paramMapIndex}`}
            >
              <InputGroup.Prepend>
                <InputGroup.Text>{paramMap.rangePosition == 1 ? 'From' : 'To'}</InputGroup.Text>
              </InputGroup.Prepend>
              {paramMap.baseComponent({
                key: `rangeGroup-paramMap-${paramMapIndex}`,
                onChange: e => paramMap.update({ dispatchAction: props.dispatchAction, e: new StandardizedInput(e) }),
                paramMap: paramMap,
                type: paramMap.props.type,
              })}
            </InputGroup>
          )
        })}
    </Form.Row>
  )
}

RangeFieldSet.propTypes = {
  dispatchAction: PropTypes.func,
  paramMapRangeGroup: PropTypes.array,
  paramSet: PropTypes.object,
}

export default RangeFieldSet

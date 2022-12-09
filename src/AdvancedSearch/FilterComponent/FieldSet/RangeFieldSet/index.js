import React from 'react'
import PropTypes from 'prop-types'
import StandardizedInput from 'shared/classes/StandardizedInput'
import { Form, InputGroup } from 'react-bootstrap'
import classnames from 'classnames'

import './style.scss'

const comparisonReconfigure = (props, e) => {

  console.log("e.value is ", e.value)

  if (e.value.toUpperCase().match(/(LTE|END)/)) {
    props.paramSet.deleteSpecific({
      dispatchAction: props.dispatchAction,
      paramMapIndex: props.paramSet.paramMaps.findIndex(
        paramMap => paramMap.rangeKey === e.rangeKey && paramMap.comparison.toUpperCase().match(/(GTE|START)/)
      ),
    })

  } else if (e.value.toUpperCase().match(/(LT)/)) {
    props.paramSet.deleteAll({
      dispatchAction: props.dispatchAction,
    })

  } else if (e.value.toUpperCase().match(/(GT)/)) {
    props.paramSet.deleteAll({
      dispatchAction: props.dispatchAction,
    })

  }
  else if (e.value.toUpperCase().match(/(GTE|START)/)) {
    props.paramSet.deleteSpecific({
      dispatchAction: props.dispatchAction,
      paramMapIndex: props.paramSet.paramMaps.findIndex(
        paramMap => paramMap.rangeKey === e.rangeKey && paramMap.comparison.toUpperCase().match(/(LTE|END)/)
      ),
    })
    props.dispatchAction()
  }

  else {
    return
  }
}

const hasPrefix = props => {
  return !!props.paramMapRangeGroup[0].valuePrefix || !!props.paramMapRangeGroup[0].comparisonPrefix
}

const RangeFieldSet = props => {
  return (
    <div className="range-fieldset">
      <InputGroup className="fieldset range-fieldset">
        {!!hasPrefix(props) && (
          <InputGroup.Prepend className="input-group__label">
            {console.log("input group text", props.paramMapRangeGroup[0].comparisonPrefix)}
            <InputGroup.Text>{props.paramMapRangeGroup[0].comparisonPrefix}</InputGroup.Text>
          </InputGroup.Prepend>
        )}

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
                className="class-test"
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
              className={`paramMapRangeGroup-col-${paramMapIndex}`}
              key={`paramMapRangeGroup-col-${paramMapIndex}`}>
              {paramMap.comparison != 1 && (
                <InputGroup.Prepend className="input-group__label">
                  <InputGroup.Text>and</InputGroup.Text>
                </InputGroup.Prepend>
              )}

              {paramMap.baseComponent({
                key: `rangeGroup-paramMap-${paramMapIndex}`,
                dispatchAction: props.dispatchAction,
                onChange: e => paramMap.update({ dispatchAction: props.dispatchAction, e: new StandardizedInput(e) }),
                paramMap: paramMap,
              })}
            </InputGroup>
          )
        })}
    </div>
  )
}

RangeFieldSet.propTypes = {
  dispatchAction: PropTypes.func,
  paramMapRangeGroup: PropTypes.array,
  paramSet: PropTypes.object,
}

export default RangeFieldSet

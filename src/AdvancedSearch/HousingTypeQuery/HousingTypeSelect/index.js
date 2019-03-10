import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import * as ht from 'shared/constants/housingTypes'

const HousingTypeSelect = props => {
  return (
    <Form.Control
      as="select"
      name="comparison"
      onChange={e => props.onChange(e, props.housingTypeIndex)}
      placeholder="Search housing type"
      size="sm"
      value={props.value}
    >
      {Object.keys(ht).map((key, index) => {
        return (
          <option key={`housingtype-option-${index}`} value={ht[key].constant}>
            {ht[key].name}
          </option>
        )
      })}
    </Form.Control>
  )
}

HousingTypeSelect.propTypes = {
  housingTypeIndex: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default HousingTypeSelect

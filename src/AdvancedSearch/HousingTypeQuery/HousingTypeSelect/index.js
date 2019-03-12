import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import * as ht from 'shared/models/housingTypes'
import ConfigContext from 'Config/ConfigContext'

const HousingTypeSelect = props => {
  return (
    <ConfigContext.Consumer>
      {config => (
        <Form.Control
          as="select"
          name="comparison"
          onChange={e => props.onChange(e, props.housingTypeIndex)}
          placeholder="Search housing type"
          size="sm"
          value={props.value}
        >
          {config.housingTypeModels.map((housingType, index) => {
            return (
              <option key={`housingtype-option-${index}`} value={housingType.id}>
                {housingType.apiMap.name}
              </option>
            )
          })}
        </Form.Control>
      )}
    </ConfigContext.Consumer>
  )
}

HousingTypeSelect.propTypes = {
  housingTypeIndex: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default HousingTypeSelect

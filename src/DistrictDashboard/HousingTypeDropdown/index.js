import React from 'react'
import PropTypes from 'prop-types'

import { Dropdown, NavItem } from 'react-bootstrap'

const HousingTypeDropdown = props => {
  const handleSubmit = value => {
    props.onSubmit(value)
  }

  return (
    <Dropdown tabindex={0} as={NavItem} className="housing-type-dropdown">
      <Dropdown.Toggle as={NavItem}>{props.label}</Dropdown.Toggle>

      <Dropdown.Menu>
        {props.options.map((option, index) => {
          return (
            <Dropdown.Item key={`housing-dropdown--${index}`} onClick={() => handleSubmit(option.value)}>
              {option.label}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}

HousingTypeDropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  onSubmit: PropTypes.func,
}
HousingTypeDropdown.defaultProps = {
  options: [],
}

export default HousingTypeDropdown

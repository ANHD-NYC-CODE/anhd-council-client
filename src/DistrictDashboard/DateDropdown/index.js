import React from 'react'
import PropTypes from 'prop-types'

import { Dropdown, NavItem } from 'react-bootstrap'

const DateDropdown = props => {
  const handleSubmit = value => {
    props.onSubmit(value)
  }

  return (
    <Dropdown tabindex={0} as={NavItem} className="date-dropdown">
      <Dropdown.Toggle as={NavItem}>{props.label}</Dropdown.Toggle>

      <Dropdown.Menu>
        {props.options.map((option, index) => {
          return (
            <Dropdown.Item key={`date-dropdown--${index}`} onClick={() => handleSubmit(option.value)}>
              {option.label}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}

DateDropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onSubmit: PropTypes.func,
}
DateDropdown.defaultProps = {
  options: [],
}

export default DateDropdown

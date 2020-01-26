import React from 'react'
import PropTypes from 'prop-types'

import { Dropdown, NavItem } from 'react-bootstrap'

import './style.scss'

const SentenceDropdown = props => {
  const handleSubmit = value => {
    props.onSubmit(value)
  }

  return (
    <Dropdown tabIndex={0} as={NavItem} className="sentence-dropdown">
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

SentenceDropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onSubmit: PropTypes.func,
}
SentenceDropdown.defaultProps = {
  options: [],
}

export default SentenceDropdown

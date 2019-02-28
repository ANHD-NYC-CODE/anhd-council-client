import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const customStyle = size => {
  switch (size) {
    case 'sm':
      return {
        control: base => ({
          ...base,
          height: 38,
          'min-height': 38,
        }),
        container: base => ({
          ...base,
          'min-height': 38,
          height: 38,
        }),
        valueContainer: base => ({
          ...base,
          'min-height': 38,
          height: 38,
        }),
      }
  }
}

const CustomSelect = props => {
  return <Select {...props} styles={customStyle(props.size)} />
}

CustomSelect.propTypes = {
  size: PropTypes.string,
}

export default CustomSelect

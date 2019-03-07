import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const customStyle = size => {
  switch (size) {
    case 'sm':
      return {
        control: base => ({
          ...base,
          'min-height': '1px',
          height: '38px',
        }),
        dropdownIndicator: base => ({
          ...base,
          paddingTop: 0,
          paddingBottom: 0,
        }),
        clearIndicator: base => ({
          ...base,
          paddingTop: 0,
          paddingBottom: 0,
        }),
        container: base => ({
          ...base,
          'min-height': '1px',
          height: '38px',
        }),
        valueContainer: base => ({
          ...base,
          'min-height': '1px',
          height: '38px',
        }),
      }
    case 'multi-sm':
      return {
        control: base => ({
          ...base,
          'min-height': '1px',
        }),
        dropdownIndicator: base => ({
          ...base,
          paddingTop: 0,
          paddingBottom: 0,
        }),
        clearIndicator: base => ({
          ...base,
          paddingTop: 0,
          paddingBottom: 0,
        }),
        container: base => ({
          ...base,
          'min-height': '1px',
          paddingTop: 0,
          paddingBottom: 0,
          width: '100%',
        }),
        valueContainer: base => ({
          ...base,
          'min-height': '1px',
          paddingTop: 0,
          paddingBottom: 0,
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

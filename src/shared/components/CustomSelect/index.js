import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const customStyle = size => {
  switch (size) {
    case 'sm':
      return {
        control: base => ({
          ...base,
          minHeight: '1px',
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
          minHeight: '1px',
          height: '38px',
        }),
        valueContainer: base => ({
          ...base,
          minHeight: '1px',
          height: '38px',
        }),
      }
    case 'multi-sm':
      return {
        control: base => ({
          ...base,
          minHeight: '1px',
          border: 'none',
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
        input: base => ({ ...base, border: 'none' }),
        container: base => ({
          ...base,
          minHeight: '1px',
          paddingTop: 0,
          paddingBottom: 0,
          minWidth: '240px',
        }),
        valueContainer: base => ({
          ...base,
          border: 'none',
          minHeight: '1px',
          paddingTop: 0,
          paddingBottom: 0,
        }),
      }
  }
}

const CustomSelect = props => {
  return (
    <Select
      autosize={true}
      {...props}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      className={props.className}
      styles={customStyle(props.size)}
      style={{ height: 'inherit' }}
    />
  )
}

CustomSelect.propTypes = {
  size: PropTypes.string,
}

export default CustomSelect

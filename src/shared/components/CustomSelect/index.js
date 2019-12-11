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
          height: '32px',
          boxShadow: 'none',
          outline: 'none',
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
          marginTop: '0px',
          minHeight: '1px',
          height: '32px',
        }),
        menu: base => ({
          ...base,
          marginTop: '0px',
          zIndex: '10',
        }),
        menuList: base => ({
          ...base,
          marginTop: '0px',
        }),
        valueContainer: base => ({
          ...base,
          marginTop: '0px',
          minHeight: '1px',
          height: '32px',
        }),
      }
    case 'multi-sm':
      return {
        control: base => ({
          ...base,
          minHeight: '1px',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
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
    case 'lg':
      return {
        control: base => ({
          ...base,
          minHeight: '1px',
          height: '60px',
          boxShadow: 'none',
          outline: 'none',
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
          marginTop: '0px',
          minHeight: '1px',
          height: '60px',
        }),
        menu: base => ({
          ...base,
          marginTop: '0px',
          zIndex: '10',
        }),
        menuList: base => ({
          ...base,
          marginTop: '0px',
        }),
        valueContainer: base => ({
          ...base,
          marginTop: '0px',
          minHeight: '1px',
          height: '60px',
        }),
      }
    default:
      return {
        control: base => ({
          ...base,
          minHeight: '1px',
          boxShadow: 'none',
          outline: 'none',
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
          marginTop: '0px',
          minHeight: '1px',
        }),
        menu: base => ({
          ...base,
          marginTop: '0px',
          zIndex: '10',
        }),
        menuList: base => ({
          ...base,
          marginTop: '0px',
        }),
        valueContainer: base => ({
          ...base,
          marginTop: '0px',
          minHeight: '1px',
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

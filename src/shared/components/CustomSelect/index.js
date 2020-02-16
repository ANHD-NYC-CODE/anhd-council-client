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
    case 'xl-form-control':
      return {
        control: base => ({
          ...base,
          minHeight: '1px',
          height: '58px',
          boxShadow: 'none',
          outline: 'none',
          border: 'none',
          borderBottom: '4px dotted #b9b8b8',
          borderRadius: 'none',
          fontSize: '1.2rem',
          lineHeight: '2.0',
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
          height: '48px',
          fontSize: '1.2rem',
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
          height: '48px',
        }),
      }
    case 'navbar-select':
      return {
        control: base => ({
          ...base,
          minHeight: '1px',
          height: '48px',
          boxShadow: 'none',
          outline: 'none',
          border: 'none',
          borderRadius: 'none',
          fontSize: '1.25rem',
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
          height: '48px',
        }),
        menu: base => ({
          ...base,
          marginTop: '0px',
          zIndex: '10',
          fontSize: '1.25rem',
        }),
        menuList: base => ({
          ...base,
          marginTop: '0px',
        }),
        valueContainer: base => ({
          ...base,
          marginTop: '0px',
          minHeight: '1px',
          height: '48px',
        }),
      }
    case 'main-geography-select':
      return {
        control: base => ({
          ...base,
          minHeight: '1px',
          height: '38px',
          border: '1px solid #b9b8b8',
          boxShadow: 'none',
          fontSize: '14px',
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
          height: '38px',
        }),
        menu: base => ({
          ...base,
          marginTop: '0px',
          zIndex: '10',
          fontSize: '14px',
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

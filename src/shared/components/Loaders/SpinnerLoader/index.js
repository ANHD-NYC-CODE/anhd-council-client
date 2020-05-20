import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
const SpinnerLoader = props => {
  return (
    <div className={props.className}>
      <div className="spinner-loader" style={{ width: props.size, height: props.size }}>
        <div style={{ width: props.size, height: props.size }} />
        <div style={{ width: props.size, height: props.size }} />
        <div style={{ width: props.size, height: props.size }} />
        <div style={{ width: props.size, height: props.size }} />
      </div>
    </div>
  )
}

SpinnerLoader.defaultProps = {
  className: 'spinner-loader__container',
  size: '50px',
}

SpinnerLoader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
}

export default SpinnerLoader

import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
const SpinnerLoader = props => {
  return (
    <div className="spinner-loader__container">
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
  size: '50px',
}

SpinnerLoader.propTypes = {
  size: PropTypes.string,
}

export default SpinnerLoader

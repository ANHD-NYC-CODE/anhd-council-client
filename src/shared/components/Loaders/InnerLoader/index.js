import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
const InnerLoader = props => {
  return (
    <div className={`inner-loader ${props.className}`} style={{ height: props.height }}>
      <div className="location_indicator" />
    </div>
  )
}

InnerLoader.defaultProps = {
  height: '200px',
}

InnerLoader.propTypes = {
  backgroundColor: PropTypes.string,
  height: PropTypes.string,
}

export default InnerLoader

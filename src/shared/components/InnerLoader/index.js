import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
const InnerLoader = props => {
  return (
    <div className="inner-loader">
      <div className="location_indicator" />
    </div>
  )
}

InnerLoader.propTypes = {}

export default InnerLoader

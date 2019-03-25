import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
const CardLoader = props => {
  return (
    <div className="card-loader">
      <div className="layer" />
      <div className="layer" />
      <div className="layer" />
      <div className="layer" />
      <div className="layer" />
      <div className="layer" />
      <div className="layer" />
    </div>
  )
}

CardLoader.propTypes = {}

export default CardLoader

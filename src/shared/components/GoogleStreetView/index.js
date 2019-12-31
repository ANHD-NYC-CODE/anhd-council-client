import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactStreetview from 'react-streetview'

const GoogleStreetView = props => {
  const googleMapsApiKey = 'AIzaSyAgoXvSQyaDsVu36APBBUfwI8xGw0n38x0'

  // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
  const streetViewPanoramaOptions = {
    position: { lat: parseFloat(props.lat), lng: parseFloat(props.lng) },
    pov: { heading: 100, pitch: 0 },
    zoom: 1,
  }

  return (
    <div className="google-street-view">
      <ReactStreetview apiKey={googleMapsApiKey} id={props.id} streetViewPanoramaOptions={streetViewPanoramaOptions} />
    </div>
  )
}

GoogleStreetView.propTypes = {
  lat: PropTypes.string,
  lng: PropTypes.string,
  id: PropTypes.string,
}
GoogleStreetView.defaultProps = { lat: '40.7', lng: '-74', id: 'streetMap' }

export default GoogleStreetView

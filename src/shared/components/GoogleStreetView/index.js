import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactStreetview from 'react-streetview'

const GoogleStreetView = props => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

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

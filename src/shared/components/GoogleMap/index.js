import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

export class GoogleMap extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Map
        className={this.props.className}
        google={this.props.google}
        id={this.props.id}
        initialCenter={{
          lat: this.props.lat,
          lng: this.props.lng,
        }}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        zoom={15}
      />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(GoogleMap)

GoogleMap.propTypes = {
  lat: PropTypes.string,
  lng: PropTypes.string,
  id: PropTypes.string,
}

GoogleMap.defaultProps = {
  lat: '40.7',
  lng: '-74',
  id: 'googleMap',
}

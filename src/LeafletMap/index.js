import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'

import './style.scss'

const center = [40.71, -73.98]

export default class LeafletMap extends Component {
  render() {
    return (
      <div id="map">
        <Map
          doubleClickZoom={false}
          id="leaflet-map"
          minZoom={13}
          maxZoom={20}
          ref={this.props.mapRef}
          zoomControl={false}
          className="map"
          center={center}
          zoom={13}
        >
          <TileLayer
            attribution="mapbox"
            url="https://api.mapbox.com/styles/v1/starcat/cjrik99zl9yae2so1gjksdn9x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3RhcmNhdCIsImEiOiJjamlpYmlsc28wbjlmM3FwbXdwaXozcWEzIn0.kLmWiUbmdqNLA1atmnTXXA"
          />
        </Map>
      </div>
    )
  }
}

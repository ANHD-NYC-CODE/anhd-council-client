import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import './style.scss'

const center = [40.71, -73.98]

export default class LeafletMap extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    console.log(e)
  }

  render() {
    return (
      <div id="map">
        <Map
          onClick={this.handleClick}
          doubleClickZoom={false}
          id="leaflet-map"
          minZoom={10}
          maxZoom={20}
          ref={this.props.mapRef}
          zoomControl={false}
          className="map"
          center={center}
          zoom={13}
        >
          <TileLayer
            onClick={this.handleClick}
            attribution="mapbox"
            url="https://api.mapbox.com/styles/v1/anhdnyc/cjt4ehsie05421fr1zwehf5nh/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5oZG55YyIsImEiOiJjanQ0ZWRqaDcxMmRxNDlsbHV1OXN0aGx6In0.i07oerfvXtcRfm3npws7mA"
          />
        </Map>
      </div>
    )
  }
}

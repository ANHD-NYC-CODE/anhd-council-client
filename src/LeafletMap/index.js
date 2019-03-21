import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import './style.scss'
import ConfigContext from 'Config/ConfigContext'
import GeographyGeoJson from 'LeafletMap/GeographyGeoJson'
const center = [40.71, -73.98]

export default class LeafletMap extends Component {
  constructor(props) {
    super(props)
    this.mapContainerRef = React.createRef()
    this.mapRef = React.createRef()
    this.geoJsonRef = React.createRef()
    this.state = {
      height: 0,
    }

    this.updateDimensions = this.updateDimensions.bind(this)
  }

  componentDidUpdate() {
    if (this.mapRef.current) {
      this.mapRef.current.leafletElement.invalidateSize()
    }

    // Center over selected geography
    if (this.mapRef.current && this.geoJsonRef.current) {
      this.mapRef.current.leafletElement.fitBounds(this.geoJsonRef.current.leafletElement.getBounds())
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
    this.updateDimensions()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions() {
    if (this.mapContainerRef.current && this.mapRef.current) {
      this.mapRef.current.leafletElement.invalidateSize()
      this.setState({ height: this.mapContainerRef.current.offsetWidth })
    }
  }

  render() {
    return (
      <div id="map" ref={this.mapContainerRef} style={{ height: this.state.height }}>
        <Map
          center={center}
          className="map"
          doubleClickZoom={false}
          id="leaflet-map"
          minZoom={10}
          maxZoom={20}
          onClick={this.handleClick}
          ref={this.mapRef}
          zoom={11}
          zoomControl={true}
        >
          <TileLayer
            onClick={this.handleClick}
            attribution="mapbox"
            url="https://api.mapbox.com/styles/v1/anhdnyc/cjtgo9wv009uw1fo0ubm7elun/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5oZG55YyIsImEiOiJjanQ0ZWRqaDcxMmRxNDlsbHV1OXN0aGx6In0.i07oerfvXtcRfm3npws7mA"
          />

          {this.props.geographyType === 'COMMUNITY' && (
            <TileLayer
              onClick={this.handleClick}
              attribution="mapbox"
              url="https://api.mapbox.com/styles/v1/anhdnyc/cjtgnuw5v04ad1fs950fzmkn1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5oZG55YyIsImEiOiJjanQ0ZWRqaDcxMmRxNDlsbHV1OXN0aGx6In0.i07oerfvXtcRfm3npws7mA"
            />
          )}
          {this.props.geographyType === 'COUNCIL' && (
            <TileLayer
              onClick={this.handleClick}
              attribution="mapbox"
              url="https://api.mapbox.com/styles/v1/anhdnyc/cjtgmvhfl6nw01fs8sqjifqni/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5oZG55YyIsImEiOiJjanQ0ZWRqaDcxMmRxNDlsbHV1OXN0aGx6In0.i07oerfvXtcRfm3npws7mA"
            />
          )}
          {this.props.geographyId && (
            <ConfigContext.Consumer>
              {config => {
                const geographies =
                  this.props.geographyType === 'COUNCIL' ? config.councilDistricts : config.communityDistricts
                return (
                  <GeographyGeoJson
                    geographies={geographies}
                    selectedId={this.props.geographyId}
                    selectedType={this.props.geographyType}
                  />
                )
              }}
            </ConfigContext.Consumer>
          )}
        </Map>
      </div>
    )
  }
}

LeafletMap.propTypes = {
  geographyId: PropTypes.string,
  geographyType: PropTypes.string,
}

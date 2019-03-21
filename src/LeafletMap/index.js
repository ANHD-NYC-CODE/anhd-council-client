import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map, TileLayer } from 'react-leaflet'
import './style.scss'
import GeographyGeoJson from 'LeafletMap/GeographyGeoJson'
import GeographyMarkerLabels from 'LeafletMap/GeographyMarkerLabels'
import L from 'leaflet'
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
    this.centerMapOnGeography = this.centerMapOnGeography.bind(this)
  }

  componentDidUpdate() {
    if (this.mapRef.current) {
      this.mapRef.current.leafletElement.invalidateSize()
    }

    // Center over selected geography
    this.centerMapOnGeography()
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
    this.updateDimensions()
    this.centerMapOnGeography()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  centerMapOnGeography() {
    if (this.mapRef.current && this.props.selectedGeographyData) {
      this.mapRef.current.leafletElement.fitBounds(new L.geoJSON(this.props.selectedGeographyData.geometry).getBounds())
    }
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
          ref={this.mapRef}
          zoom={11}
          zoomControl={true}
        >
          <TileLayer
            attribution="mapbox"
            url="https://api.mapbox.com/styles/v1/anhdnyc/cjtgo9wv009uw1fo0ubm7elun/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5oZG55YyIsImEiOiJjanQ0ZWRqaDcxMmRxNDlsbHV1OXN0aGx6In0.i07oerfvXtcRfm3npws7mA"
          />
          {this.props.geographyType === 'COMMUNITY' && (
            <TileLayer
              attribution="mapbox"
              url="https://api.mapbox.com/styles/v1/anhdnyc/cjtgnuw5v04ad1fs950fzmkn1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5oZG55YyIsImEiOiJjanQ0ZWRqaDcxMmRxNDlsbHV1OXN0aGx6In0.i07oerfvXtcRfm3npws7mA"
            />
          )}
          {this.props.geographyType === 'COUNCIL' && (
            <TileLayer
              attribution="mapbox"
              url="https://api.mapbox.com/styles/v1/anhdnyc/cjtgmvhfl6nw01fs8sqjifqni/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5oZG55YyIsImEiOiJjanQ0ZWRqaDcxMmRxNDlsbHV1OXN0aGx6In0.i07oerfvXtcRfm3npws7mA"
            />
          )}
          {this.props.geographyId && (
            <div>
              <GeographyGeoJson
                geographies={
                  this.props.geographyType === 'COUNCIL' ? this.props.councilDistricts : this.props.communityDistricts
                }
                selectedId={this.props.geographyId}
                selectedType={this.props.geographyType}
                clickedGeographyId={this.props.selectedGeographyData.properties.id}
                onClick={this.props.handleGeoJsonClick}
              />
              <GeographyMarkerLabels
                geographyType={this.props.geographyType}
                geographies={
                  this.props.geographyType === 'COUNCIL' ? this.props.councilDistricts : this.props.communityDistricts
                }
              />
              ) }
            </div>
          )}
          } )}
        </Map>
      </div>
    )
  }
}

LeafletMap.defaultProps = {
  councilDistricts: [],
  communityDistricts: [],
}

LeafletMap.propTypes = {
  communityDistricts: PropTypes.array,
  councilDistricts: PropTypes.array,
  geographyId: PropTypes.string,
  geographyType: PropTypes.string,
  selectedGeographyData: PropTypes.object,
  handleGeoJsonClick: PropTypes.func,
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map, TileLayer, FeatureGroup, GeoJSON } from 'react-leaflet'
import './style.scss'
import ConfigContext from 'Config/ConfigContext'
const center = [40.71, -73.98]

export default class LeafletMap extends Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
    this.state = {
      height: 0,
    }

    this.updateDimensions = this.updateDimensions.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions() {
    if (this.mapRef.current) {
      this.setState({ height: this.mapRef.current.offsetWidth })
    }
  }

  handleClick(e) {
    console.log(e)
  }

  render() {
    return (
      <div id="map" ref={this.mapRef} style={{ height: this.state.height }}>
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
          zoom={10}
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
                const selectedGeography =
                  this.props.geographyType === 'COUNCIL'
                    ? config.councilDistricts.find(d => d.id == this.props.geographyId)
                    : config.communityDistricts.find(d => d.id == this.props.geographyId)

                const geoJson = {
                  type: 'FeatureCollection',
                  features: [
                    {
                      type: 'Feature',
                      id: 1,
                      geometry: selectedGeography.geometry,
                    },
                  ],
                }
                console.log(geoJson)
                const getStyle = () => {
                  return {
                    color: 'cyan',
                    weight: 10,
                    opacity: 1,
                  }
                }
                return <GeoJSON style={getStyle()} data={geoJson} />
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

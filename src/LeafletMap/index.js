import React, { Component } from 'react'
import PropTypes from 'prop-types'

import L from 'leaflet'
import { geographySelectionToString } from 'shared/utilities/languageUtils'

import { Map, TileLayer, Popup } from 'react-leaflet'
import { Jumbotron, Button, Alert } from 'react-bootstrap'
import GeographyGeoJson from 'LeafletMap/GeographyGeoJson'
import GeographyMarkerLabels from 'LeafletMap/GeographyMarkerLabels'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBug } from '@fortawesome/free-solid-svg-icons'
import PropertyIcons from 'LeafletMap/PropertyIcons'
import './style.scss'
export default class LeafletMap extends Component {
  constructor(props) {
    super(props)
    this.mapContainerRef = React.createRef()
    this.mapRef = React.createRef()
    this.geoJsonRef = React.createRef()
    this.state = {
      height: 0,
      hasError: false,
      alertMessage: undefined,
    }

    this.updateDimensions = this.updateDimensions.bind(this)
    this.centerMapOnGeography = this.centerMapOnGeography.bind(this)
    this.getGeographyBounds = this.getGeographyBounds.bind(this)
    this.getGeographyCenter = this.getGeographyCenter.bind(this)
    this.setAlertMessage = this.setAlertMessage.bind(this)
  }

  componentDidUpdate() {
    if (this.mapRef.current) {
      this.mapRef.current.leafletElement.invalidateSize()
    }

    // Center over selected geography
    if (this.props.communityDistricts.length || this.props.councilDistricts.length) {
      this.centerMapOnGeography()
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
    this.updateDimensions()
    this.centerMapOnGeography()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    return null
  }
  setAlertMessage(message) {
    this.setState({ alertMessage: message })
  }

  centerMapOnGeography() {
    if (this.mapRef.current) {
      const changingOrCurrentType =
        this.props.appState.changingGeographyType || this.props.appState.currentGeographyType
      const changingOrCurrentId = this.props.appState.changingGeographyId || this.props.appState.currentGeographyId
      if (!(changingOrCurrentType && changingOrCurrentId)) return
      const bounds = this.getGeographyBounds(changingOrCurrentType, changingOrCurrentId)

      if (bounds) {
        this.mapRef.current.leafletElement.fitBounds(bounds)
      }
    }
  }

  getGeographyBounds(type, id) {
    if (!this.props.councilDistricts.length || !this.props.communityDistricts.length) return null
    const geographyDataset = this.props.selectGeographyData(type)
    const selectedGeography = geographyDataset.find(geography => geography.id === parseInt(id))
    if (selectedGeography) return new L.geoJSON(selectedGeography.data.geometry).getBounds()
  }

  getGeographyCenter(type, id) {
    const bounds = this.getGeographyBounds(type, id)
    if (bounds) return bounds.getCenter()
    else return this.props.center
  }

  updateDimensions() {
    if (this.mapContainerRef.current && this.mapRef.current) {
      this.mapRef.current.leafletElement.invalidateSize()
      this.setState({ height: this.mapContainerRef.current.offsetWidth })
    }
  }

  render() {
    if (this.state.hasError)
      return (
        <Jumbotron className="map-error">
          <h4>
            <FontAwesomeIcon icon={faBug} />
          </h4>
          Sorry, a map error occured. Please reload the page or <a href="mailto:anhd.tech@gmail.com">contact support</a>{' '}
          if this continues to occur.
        </Jumbotron>
      )
    return (
      <div id="map" ref={this.mapContainerRef} style={{ height: this.state.height }}>
        {this.state.alertMessage && (
          <Alert dismissable variant="danger">
            {this.state.alertMessage}
          </Alert>
        )}
        <Map
          boxZoom={this.props.interactable}
          center={this.props.center}
          className="map"
          doubleClickZoom={this.props.interactable}
          dragging={this.props.interactable}
          id="leaflet-map"
          keyboard={this.props.interactable}
          minZoom={10}
          maxZoom={20}
          ref={this.mapRef}
          scrollWheelZoom={this.props.interactable}
          tap={this.props.interactable}
          touchZoom={this.props.interactable}
          zoom={this.props.zoom}
          zoomControl={this.props.interactable}
        >
          <TileLayer
            attribution="mapbox"
            url="https://api.mapbox.com/styles/v1/anhdnyc/cjtgo9wv009uw1fo0ubm7elun/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5oZG55YyIsImEiOiJjanQ0ZWRqaDcxMmRxNDlsbHV1OXN0aGx6In0.i07oerfvXtcRfm3npws7mA"
          />
          {this.props.appState.currentGeographyType === 'COMMUNITY' && (
            <TileLayer
              attribution="mapbox"
              url="https://api.mapbox.com/styles/v1/anhdnyc/cjtgnuw5v04ad1fs950fzmkn1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5oZG55YyIsImEiOiJjanQ0ZWRqaDcxMmRxNDlsbHV1OXN0aGx6In0.i07oerfvXtcRfm3npws7mA"
            />
          )}
          {this.props.appState.currentGeographyType === 'COUNCIL' && (
            <TileLayer
              attribution="mapbox"
              url="https://api.mapbox.com/styles/v1/anhdnyc/cjtgmvhfl6nw01fs8sqjifqni/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5oZG55YyIsImEiOiJjanQ0ZWRqaDcxMmRxNDlsbHV1OXN0aGx6In0.i07oerfvXtcRfm3npws7mA"
            />
          )}
          {!!this.props.communityDistricts.length &&
            !!this.props.councilDistricts.length &&
            this.props.appState.currentGeographyType && (
              <div>
                <GeographyGeoJson
                  geographies={this.props.selectGeographyData(
                    this.props.appState.changingGeographyType || this.props.appState.currentGeographyType
                  )}
                  currentGeographyId={this.props.appState.currentGeographyId}
                  currentGeographyType={this.props.appState.currentGeographyType}
                  changingGeographyId={this.props.appState.changingGeographyId}
                  changingGeographyType={this.props.appState.changingGeographyType}
                  onClick={this.props.handleChangeGeographyId}
                />
                <GeographyMarkerLabels
                  currentGeographyType={this.props.appState.currentGeographyType}
                  geographies={this.props.selectGeographyData(
                    this.props.appState.changingGeographyType || this.props.appState.currentGeographyType
                  )}
                />
              </div>
            )}
          {!!this.props.communityDistricts.length &&
            !!this.props.councilDistricts.length &&
            this.props.appState.changingGeographyType &&
            (this.props.appState.currentGeographyId !== this.props.appState.changingGeographyId &&
              this.props.appState.changingGeographyId > 0) && (
              <Popup
                key={`${Math.random() * 100000}`}
                position={
                  this.getGeographyCenter(
                    this.props.appState.changingGeographyType,
                    this.props.appState.changingGeographyId
                  ) || {}
                }
              >
                <p>
                  {geographySelectionToString({
                    type: this.props.appState.changingGeographyType,
                    id: this.props.appState.changingGeographyId,
                  })}
                </p>
                <Button
                  onClick={() =>
                    this.props.handleChangeGeography({ geographyId: this.props.appState.changingGeographyId })
                  }
                >
                  Visit
                </Button>
              </Popup>
            )}
          <PropertyIcons
            iconConfig={this.props.iconConfig}
            setAlertMessage={this.setAlertMessage}
            selectedRequest={this.props.selectedRequest}
            visible={!(this.props.appState.changingGeographyType && this.props.appState.changingGeographyId)}
          />
          }
        </Map>
      </div>
    )
  }
}

LeafletMap.defaultProps = {
  center: [40.71, -73.98],
  councilDistricts: [],
  communityDistricts: [],
  iconConfig: 'MULTIPLE',
  interactable: true,
  zoom: 11,
}

LeafletMap.propTypes = {
  communityDistricts: PropTypes.array,
  councilDistricts: PropTypes.array,
  changingGeographyType: PropTypes.string,
  changingGeographyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentGeographyType: PropTypes.string,
  currentGeographyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconConfig: PropTypes.string,
  selectedRequest: PropTypes.object,
  interactable: PropTypes.bool,
}

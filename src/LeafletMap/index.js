import React from 'react'
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
export default class LeafletMap extends React.PureComponent {
  constructor(props) {
    super(props)
    this.mapContainerRef = React.createRef()
    this.mapRef = React.createRef()
    this.geoJsonRef = React.createRef()
    this.state = {
      height: this.props.height,
      hasError: false,
      alertMessage: undefined,
      overrideWarning: false,
    }
    this.updateDimensions = this.updateDimensions.bind(this)
    this.centerMapOnGeography = this.centerMapOnGeography.bind(this)
    this.getGeographyBounds = this.getGeographyBounds.bind(this)
    this.getGeographyCenter = this.getGeographyCenter.bind(this)
    this.setAlertMessage = this.setAlertMessage.bind(this)
  }

  componentDidUpdate() {
    // Center over selected geography
    if (this.props.communityDistricts.length || this.props.councilDistricts.length) {
      this.centerMapOnGeography()
    }

    if (this.mapRef.current) {
      this.mapRef.current.leafletElement.invalidateSize()
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
      const changingOrCurrentType = this.props.appState.changingGeographyType || this.props.currentGeographyType
      const changingOrCurrentId = this.props.appState.changingGeographyId || this.props.appState.currentGeographyId
      if (!(changingOrCurrentType && changingOrCurrentId)) return
      const bounds = this.getGeographyBounds(changingOrCurrentType, changingOrCurrentId)

      if (bounds) {
        this.mapRef.current.leafletElement.fitBounds(bounds, { padding: [-100, 0] })
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
    if (this.props.height) return
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
      <div
        id="map"
        ref={this.mapContainerRef}
        style={{ height: this.props.height || this.state.height, width: this.props.width || '100%' }}
      >
        {this.state.alertMessage && (
          <Alert variant="warning">
            <span>{this.state.alertMessage}</span>
            <Button
              block
              variant="primary"
              size="sm"
              onClick={() =>
                this.setState({
                  overrideWarning: true,
                })
              }
            >
              Proceed
            </Button>
          </Alert>
        )}
        <Map
          boxZoom={this.props.interactive}
          center={this.props.center}
          className="map"
          doubleClickZoom={this.props.interactive}
          dragging={this.props.interactive}
          id="leaflet-map"
          keyboard={this.props.interactive}
          minZoom={10}
          maxZoom={20}
          ref={this.mapRef}
          scrollWheelZoom={this.props.interactive}
          tap={this.props.interactive}
          touchZoom={this.props.interactive}
          zoom={this.props.zoom}
          zoomControl={this.props.interactive}
        >
          <TileLayer
            attribution="mapbox"
            url="https://api.mapbox.com/styles/v1/anhdnyc/cjtgo9wv009uw1fo0ubm7elun/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5oZG55YyIsImEiOiJjanQ0ZWRqaDcxMmRxNDlsbHV1OXN0aGx6In0.i07oerfvXtcRfm3npws7mA"
          />
          {this.props.currentGeographyType === 'COMMUNITY' && (
            <TileLayer
              attribution="mapbox"
              url="https://api.mapbox.com/styles/v1/anhdnyc/cjtgnuw5v04ad1fs950fzmkn1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5oZG55YyIsImEiOiJjanQ0ZWRqaDcxMmRxNDlsbHV1OXN0aGx6In0.i07oerfvXtcRfm3npws7mA"
            />
          )}
          {this.props.currentGeographyType === 'COUNCIL' && (
            <TileLayer
              attribution="mapbox"
              url="https://api.mapbox.com/styles/v1/anhdnyc/cjtgmvhfl6nw01fs8sqjifqni/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5oZG55YyIsImEiOiJjanQ0ZWRqaDcxMmRxNDlsbHV1OXN0aGx6In0.i07oerfvXtcRfm3npws7mA"
            />
          )}
          {!!this.props.communityDistricts.length &&
            !!this.props.councilDistricts.length &&
            this.props.currentGeographyType && (
              <div>
                <GeographyGeoJson
                  geographies={this.props.selectGeographyData(
                    this.props.appState.changingGeographyType || this.props.currentGeographyType
                  )}
                  currentGeographyId={this.props.appState.currentGeographyId}
                  currentGeographyType={this.props.currentGeographyType}
                  changingGeographyId={this.props.appState.changingGeographyId}
                  changingGeographyType={this.props.appState.changingGeographyType}
                  onClick={this.props.handleChangeGeographyId}
                />
                <GeographyMarkerLabels
                  currentGeographyType={this.props.currentGeographyType}
                  geographies={this.props.selectGeographyData(
                    this.props.appState.changingGeographyType || this.props.currentGeographyType
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
            overrideWarning={this.state.overrideWarning}
            results={this.props.results}
            iconConfig={this.props.iconConfig}
            setAlertMessage={this.setAlertMessage}
            switchView={this.props.switchView}
            displayedResultsFilter={this.props.displayedResultsFilter}
            visible={!(this.props.appState.changingGeographyType && this.props.appState.changingGeographyId)}
          />
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
  interactive: true,
  results: [],
  height: 0,
  displayedResultsFilter: {
    internalFilter: results => results,
    paramMaps: [],
  },
  zoom: 11,
}

LeafletMap.propTypes = {
  appState: PropTypes.object,
  communityDistricts: PropTypes.array,
  councilDistricts: PropTypes.array,
  iconConfig: PropTypes.string,
  displayedResultsFilter: PropTypes.object,
  results: PropTypes.object,
  interactive: PropTypes.bool,
}

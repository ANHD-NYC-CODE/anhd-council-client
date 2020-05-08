import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'shared/constants'
import * as b from 'shared/constants/geographies'
import L from 'leaflet'
import { geographySelectionToString } from 'shared/utilities/languageUtils'
import { setDashboardMapZoom } from 'Store/DashboardState/actions'

import { Map, TileLayer, Popup } from 'react-leaflet'
import { Jumbotron, Button, Alert } from 'react-bootstrap'
import MapAlertModal from 'LeafletMap/MapAlertModal'
import GeographyGeoJson from 'LeafletMap/GeographyGeoJson'
import GeographyMarkerLabels from 'LeafletMap/GeographyMarkerLabels'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBug } from '@fortawesome/free-solid-svg-icons'
import PropertyIcons from 'LeafletMap/PropertyIcons'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'

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
      overrideWarning: false,
    }
    this.updateDimensions = this.updateDimensions.bind(this)
    this.centerMapOnGeography = this.centerMapOnGeography.bind(this)
    this.getGeographyBounds = this.getGeographyBounds.bind(this)
    this.getGeographyCenter = this.getGeographyCenter.bind(this)
    this.onMapZoom = this.onMapZoom.bind(this)
    this.allGeographiesLoaded = this.allGeographiesLoaded.bind(this)
    this.handleMapClick = this.handleMapClick.bind(this)
  }

  componentDidUpdate() {
    if (this.mapRef.current) {
      this.mapRef.current.leafletElement.invalidateSize()
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
    this.updateDimensions()
    this.centerMapOnGeography()
    this.mapRef.current.leafletElement.setZoom(this.props.zoom)
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

  handleMapClick(e) {
    if (this.props.closeGeographyPopup) {
      this.props.closeGeographyPopup()
    }
  }

  centerMapOnGeography() {
    if (this.mapRef.current) {
      const changingOrCurrentType = this.props.changingGeographyType || this.props.currentGeographyType
      const changingOrCurrentId = this.props.changingGeographyId || this.props.currentGeographyId
      if (!(changingOrCurrentType && changingOrCurrentId)) return
      const bounds = this.getGeographyBounds(changingOrCurrentType, changingOrCurrentId)

      if (bounds) {
        this.mapRef.current.leafletElement.fitBounds(bounds, { padding: [-100, 0] })
        // this.mapRef.current.leafletElement.setZoom(this.props.zoom)
      }
    }
  }

  getGeographyBounds(type, id) {
    if (type === b.BOROUGH_GEOGRAPHY.constant) return null
    if (type === b.CITY_GEOGRAPHY.constant) return null
    if (!this.allGeographiesLoaded()) return null
    const geographyDataset = this.props.selectGeographyData(type)
    const selectedGeography = geographyDataset.find(geography => String(geography.id) === String(id))
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

  onMapZoom() {
    if (this.props.dispatch) {
      this.props.dispatch(setDashboardMapZoom(this.mapRef.current.leafletElement.getZoom()))
    }
  }

  allGeographiesLoaded() {
    return (
      !!this.props.communityDistricts.length &&
      !!this.props.councilDistricts.length &&
      !!this.props.stateAssemblies &&
      !!this.props.stateSenates &&
      !!this.props.zipCodes
    )
  }

  render() {
    if (this.state.hasError)
      return (
        <Jumbotron className="map-error">
          <h4>
            <FontAwesomeIcon icon={faBug} />
          </h4>
          Sorry, a map error occured. Please reload the page or{' '}
          <a href={`mailto:${c.CONTACT_EMAIL}`}>contact support</a> if this continues to occur.
        </Jumbotron>
      )
    return (
      <div
        id="map"
        ref={this.mapContainerRef}
        className={this.props.className}
        style={{ height: this.props.height || this.state.height, width: this.props.width || '100%' }}
      >
        {!this.state.overrideWarning && this.props.results.length > c.MAP_MARKER_LIMIT && (
          <MapAlertModal
            alertMessage={
              <div>
                <p>
                  More than {c.MAP_MARKER_LIMIT} results will slow down this page. Apply a Housing Type and/or one or
                  more Datasets to narrow down results or click below to proceed. If the page freezes, refresh your
                  browser to reset.
                </p>
              </div>
            }
            alertVariant="light"
            alertCta="Display Anyway"
            action={() =>
              this.setState({
                overrideWarning: true,
              })
            }
          />
        )}
        <Map
          data-test-id="map"
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
          onClick={this.handleMapClick}
          scrollWheelZoom={this.props.interactive}
          tap={this.props.interactive}
          touchZoom={this.props.interactive}
          onZoom={this.onMapZoom}
          zoom={this.props.zoom}
          zoomControl={this.props.interactive}
        >
          {this.props.loading && (
            <div className="map-loader">
              <SpinnerLoader size="100px" />
            </div>
          )}

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
          {this.props.currentGeographyType === 'STATE_ASSEMBLY' && (
            <TileLayer
              attribution="mapbox"
              url="https://api.mapbox.com/styles/v1/anhdnyc/ck30ai0u70fol1co74j7lql1g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5oZG55YyIsImEiOiJjanQ0ZWRqaDcxMmRxNDlsbHV1OXN0aGx6In0.i07oerfvXtcRfm3npws7mA"
            />
          )}
          {this.props.currentGeographyType === 'STATE_SENATE' && (
            <TileLayer
              attribution="mapbox"
              url="https://api.mapbox.com/styles/v1/anhdnyc/ck30asbr30tk91cmmortl5u4e/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5oZG55YyIsImEiOiJjanQ0ZWRqaDcxMmRxNDlsbHV1OXN0aGx6In0.i07oerfvXtcRfm3npws7mA"
            />
          )}
          {this.props.currentGeographyType === 'ZIPCODE' && (
            <TileLayer
              attribution="mapbox"
              url="https://api.mapbox.com/styles/v1/anhdnyc/ck3093t330s3e1cnvcair3d0n/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5oZG55YyIsImEiOiJjanQ0ZWRqaDcxMmRxNDlsbHV1OXN0aGx6In0.i07oerfvXtcRfm3npws7mA"
            />
          )}
          <TileLayer
            attribution="mapbox"
            url="https://api.mapbox.com/styles/v1/lblok/cjk4889sb29b12splkdw0pzop/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGJsb2siLCJhIjoiY2o3djQ2ODd4MnVjMjJwbjBxZWZtZDB2ZiJ9.4gctlFUX_n0BzOAwbuL2aw"
            // url="https://api.mapbox.com/styles/v1/anhdnyc/cjtgo9wv009uw1fo0ubm7elun/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5oZG55YyIsImEiOiJjanQ0ZWRqaDcxMmRxNDlsbHV1OXN0aGx6In0.i07oerfvXtcRfm3npws7mA"
          />
          {this.allGeographiesLoaded() && this.props.currentGeographyType && (
            <div>
              <GeographyGeoJson
                geoJsonRef={this.geoJsonRef}
                geographies={this.props.selectGeographyData(
                  this.props.changingGeographyType || this.props.currentGeographyType
                )}
                currentGeographyId={this.props.currentGeographyId}
                currentGeographyType={this.props.currentGeographyType}
                changingGeographyId={this.props.changingGeographyId}
                changingGeographyType={this.props.changingGeographyType}
                onClick={this.props.handleChangeGeographyId}
              />
              <GeographyMarkerLabels
                currentGeographyType={this.props.currentGeographyType}
                geographies={this.props.selectGeographyData(
                  this.props.changingGeographyType || this.props.currentGeographyType
                )}
              />
            </div>
          )}
          {this.allGeographiesLoaded() &&
            this.props.changingGeographyType &&
            (this.props.currentGeographyId !== this.props.changingGeographyId &&
              this.props.changingGeographyId > 0) && (
              <Popup
                key={`${this.changingGeographyType}-${this.changingGeographyId}`}
                onClose={this.props.closeGeographyPopup}
                closeOnClick={false}
                position={
                  this.getGeographyCenter(this.props.changingGeographyType, this.props.changingGeographyId) || {}
                }
              >
                <p>
                  {geographySelectionToString({
                    type: this.props.changingGeographyType,
                    id: this.props.changingGeographyId,
                  })}
                </p>
                <Button
                  onClick={() => this.props.handleChangeGeography({ geographyId: this.props.changingGeographyId })}
                >
                  Visit
                </Button>
              </Popup>
            )}
          <PropertyIcons
            dispatch={this.props.dispatch}
            page={this.props.page}
            overrideWarning={this.state.overrideWarning}
            results={this.props.results}
            iconConfig={this.props.iconConfig}
            visible={!(this.props.changingGeographyType && this.props.changingGeographyId)}
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
  stateAssemblies: [],
  stateSenates: [],
  zipCodes: [],
  iconConfig: 'MULTIPLE',
  interactive: true,
  loading: false,
  results: [],
  height: 0,
  zoom: 12,
}

LeafletMap.propTypes = {
  className: PropTypes.string,
  communityDistricts: PropTypes.array,
  councilDistricts: PropTypes.array,
  stateAssemblies: PropTypes.array,
  stateSenates: PropTypes.array,
  zipCodes: PropTypes.array,
  closeGeographyPopup: PropTypes.func,
  dispatch: PropTypes.func,
  iconConfig: PropTypes.string,
  results: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  interactive: PropTypes.bool,
  loading: PropTypes.bool,
  page: PropTypes.string,
}

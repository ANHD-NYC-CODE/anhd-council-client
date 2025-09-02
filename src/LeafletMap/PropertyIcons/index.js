import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'shared/constants'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import L from 'leaflet'

import PropertyIcon from 'LeafletMap/PropertyIcon'

class PropertyIcons extends React.Component {
  constructor(props) {
    super(props)
    this.markers = []
    this.sharedIcon = null
    this.createMarkersTimeout = null
    this.isProcessing = false
    this.state = {
      isCreatingMarkers: false
    }
  }

  getLatLng(result) {
    if (result.latitude && result.longitude) {
      return [result.latitude, result.longitude]
    }
  }

  componentDidMount() {
    if (this.props.iconConfig === 'MULTIPLE' && this.props.visible && this.props.results.length > 0) {
      this.createMarkers()
    }
  }

  componentDidUpdate(prevProps) {
    console.log('PropertyIcons componentDidUpdate:', {
      iconConfig: this.props.iconConfig,
      visible: this.props.visible,
      resultsLength: this.props.results ? this.props.results.length : 0,
      hasClusterGroup: !!this.props.clusterGroup,
      resultsChanged: prevProps.results !== this.props.results,
      visibleChanged: prevProps.visible !== this.props.visible,
      clusterGroupChanged: prevProps.clusterGroup !== this.props.clusterGroup
    });

    if (this.props.iconConfig === 'MULTIPLE' && this.props.visible &&
      (prevProps.results !== this.props.results ||
        prevProps.visible !== this.props.visible ||
        prevProps.clusterGroup !== this.props.clusterGroup)) {
      console.log('PropertyIcons: Triggering createMarkers');
      // Cancel any pending marker creation
      if (this.createMarkersTimeout) {
        clearTimeout(this.createMarkersTimeout)
      }
      this.createMarkersTimeout = setTimeout(() => {
        // Create clustered markers for any results (clustering threshold is handled by minClusterSize)
        this.createMarkers()
      }, 200) // Increased debounce time
    }
  }

  componentWillUnmount() {
    this.clearMarkers()
    if (this.createMarkersTimeout) {
      clearTimeout(this.createMarkersTimeout)
    }
  }

  clearMarkers() {
    if (this.props.clusterGroup && this.markers.length > 0) {
      // Batch remove markers for better performance
      this.props.clusterGroup.removeLayers(this.markers)
      this.markers = []
    }
  }

  createMarkers() {
    if (this.isProcessing) return // Prevent concurrent processing

    this.isProcessing = true
    this.setState({ isCreatingMarkers: true })

    // Clear existing markers first
    this.clearMarkers()

    if (!this.props.results || !Array.isArray(this.props.results)) {
      this.setState({ isCreatingMarkers: false })
      this.isProcessing = false
      return
    }

    // Wait for cluster group to be available
    if (!this.props.clusterGroup) {
      // Retry after a short delay
      setTimeout(() => {
        this.isProcessing = false
        this.setState({ isCreatingMarkers: false })
        if (this.props.clusterGroup) {
          this.createMarkers()
        }
      }, 100)
      return
    }

    // Create shared icon once for better performance
    if (!this.sharedIcon) {
      this.sharedIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="property-marker" style="
          width: 16px;
          height: 16px;
          background-color: #007bff;
          border: 2px solid white;
          border-radius: 50%;
          cursor: pointer;
        "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      })
    }

    // Progressive loading for large datasets
    const totalResults = this.props.results.length
    const batchSize = 500 // Process 500 markers at a time
    let currentIndex = 0

    const processBatch = () => {
      if (currentIndex >= totalResults) {
        this.setState({ isCreatingMarkers: false })
        this.isProcessing = false
        return
      }

      const endIndex = Math.min(currentIndex + batchSize, totalResults)
      const batchResults = this.props.results.slice(currentIndex, endIndex)
      const markersToAdd = []

      batchResults.forEach((result) => {
        const latLng = this.getLatLng(result)
        if (latLng) {
          // Create minimal marker for better performance
          const marker = L.marker(latLng, {
            icon: this.sharedIcon,
            title: result.address || 'Property' // Simple tooltip instead of popup
          })

          // Add click handler
          marker.on('click', () => {
            if (this.props.handlePropertyAction) {
              this.props.handlePropertyAction(result)
            }
          })

          this.markers.push(marker)
          markersToAdd.push(marker)
        }
      })

      // Add batch to cluster group
      if (markersToAdd.length > 0) {
        this.props.clusterGroup.addLayers(markersToAdd)
      }

      currentIndex = endIndex

      // Process next batch with a small delay to prevent freezing
      if (currentIndex < totalResults) {
        setTimeout(processBatch, 10)
      } else {
        this.setState({ isCreatingMarkers: false })
        this.isProcessing = false
      }
    }

    // Start processing
    processBatch()
  }

  render() {
    if (!(this.props.visible && (this.props.results.length || Object.keys(this.props.results).length))) return null

    if (this.props.iconConfig === 'MULTIPLE') {
      // For multiple properties, clustering is handled manually
      // Return null since markers are created in componentDidMount/componentDidUpdate
      return null
    } else {
      // Single property - no clustering needed
      return (
        !!this.props.results.length ||
        (!!Object.keys(this.props.results).length && this.getLatLng(this.props.results) ? (
          <PropertyIcon interactive={false} result={this.props.results} position={this.getLatLng(this.props.results)} />
        ) : null)
      )
    }
  }
}

PropertyIcons.defaultProps = {
  results: [],
}

PropertyIcons.propTypes = {
  handlePropertyAction: PropTypes.func,
  dispatch: PropTypes.func,
  results: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  visible: PropTypes.bool,
  page: PropTypes.string,
  clusterGroup: PropTypes.object,
}

export default PropertyIcons

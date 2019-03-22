import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Marker } from 'react-leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactDOMServer from 'react-dom/server'

import { faBuilding, faHome } from '@fortawesome/free-solid-svg-icons'
import L from 'leaflet'
class PropertyIcons extends React.Component {
  constructor(props) {
    super(props)

    this.constructIcon = this.constructIcon.bind(this)
  }

  getIconSize(result) {
    if (result.numfloors > 40) {
      return '5x'
    } else if (result.numfloors > 30) {
      return '4x'
    } else if (result.numfloors > 20) {
      return '3x'
    } else return '2x'
  }
  constructIcon(result) {
    let element
    if (result.numfloors < 4) {
      element = <FontAwesomeIcon icon={faHome} size="2x" />
    } else {
      element = <FontAwesomeIcon icon={faBuilding} size={this.getIconSize(result)} />
    }
    return L.divIcon({
      html: `${ReactDOMServer.renderToString(element)}`,
      iconSize: [0, 0],
      iconAnchor: [10, 0],
      popupAnchor: [0, 0],
      className: 'myDivIcon',
    })
  }

  getLatLng(result) {
    if (result.lat && result.lng) {
      return [result.lat, result.lng]
    }
  }

  render() {
    return this.props.results
      .map((result, index) => {
        if (this.getLatLng(result)) {
          return (
            <Marker
              key={`property-popup-${index}`}
              position={this.getLatLng(result)}
              icon={this.constructIcon(result)}
            />
          )
        } else {
          return null
        }
      })
      .filter(i => i)
  }
}

PropertyIcons.defaultProps = {
  results: [],
}

PropertyIcons.propTypes = {
  dispatch: PropTypes.func,
  results: PropTypes.array,
  selectedRequest: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => {
  return {
    results: state.requests[ownProps.selectedRequest.requestConstant],
  }
}

export default connect(mapStateToProps)(PropertyIcons)

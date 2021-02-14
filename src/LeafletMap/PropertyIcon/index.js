import React from 'react'
import PropTypes from 'prop-types'
import { Marker, Popup, Tooltip } from 'react-leaflet'
import { Button } from 'react-bootstrap'
import { MarkerIcon } from './MarkerIcon'
import { setAppState } from 'Store/AppState/actions'
import { push } from 'connected-react-router'

import './style.scss'

class PropertyIcon extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
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

  handleClick() {
    if (this.props.page === 'DASHBOARD') {
      this.props.dispatch(setAppState({ linkLookupBackToDashboard: true }))
    }
    this.props.dispatch(push(`/property/${this.props.result.bbl}`))
  }

  render() {
    return (
      <div className="property-icon">
        <Marker icon={MarkerIcon} position={this.props.position}>
          {this.props.interactive && (
            <div>
              <Popup>
                <div className="leaflet-popup-title">{this.props.result.address}</div>
                <Button variant="primary" onClick={this.handleClick} size="sm">
                  View Property
                </Button>
              </Popup>
              <Tooltip>{this.props.result.address}</Tooltip>
            </div>
          )}
        </Marker>
      </div>
    )
  }
}

PropertyIcon.propTypes = {
  result: PropTypes.object,
  position: PropTypes.array,
  dispatch: PropTypes.func,
}

export default PropertyIcon

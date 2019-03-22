import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PropertyIcon from 'LeafletMap/PropertyIcon'

class PropertyIcons extends React.Component {
  constructor(props) {
    super(props)

    this.handleAlert = this.handleAlert.bind(this)
    this.handleAlert()
  }

  componentDidUpdate() {
    this.handleAlert()
  }

  handleAlert() {
    if (this.props.results.length > 1000) {
      this.props.setAlertMessage('Can not render more than 1000 map icons because most devices can not handle this.')
    } else {
      this.props.setAlertMessage('')
    }
  }

  getLatLng(result) {
    if (result.lat && result.lng) {
      return [result.lat, result.lng]
    }
  }

  render() {
    if (!this.props.visible || !this.props.selectedRequest || this.props.results.length > 1000) return null
    return this.props.results
      .map((result, index) => {
        if (this.getLatLng(result)) {
          return (
            <PropertyIcon
              key={`property-popup-${index}`}
              result={result}
              handlePropertyAction={this.props.handlePropertyAction}
              position={this.getLatLng(result)}
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
  handlePropertyAction: PropTypes.func,
  dispatch: PropTypes.func,
  results: PropTypes.array,
  selectedRequest: PropTypes.object,
  visible: PropTypes.bool,
}

const mapStateToProps = (state, ownProps) => {
  return {
    results: state.requests[ownProps.selectedRequest.requestConstant],
  }
}

export default connect(mapStateToProps)(PropertyIcons)

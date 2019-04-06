import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as c from 'shared/constants'

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
    if (!this.props.overrideWarning && this.props.results.length > c.MAP_MARKER_LIMIT) {
      // this.props.switchView()
      this.props.setAlertMessage(`Warning - more than ${c.MAP_MARKER_LIMIT} map icons may slow down this page.`)
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
    if (!(this.props.visible && this.props.displayedRequest && this.props.results)) return null
    if (this.props.iconConfig === 'MULTIPLE') {
      if (!this.props.overrideWarning && this.props.results.length > c.MAP_MARKER_LIMIT) return null
      return this.props.results
        .map((result, index) => {
          if (this.getLatLng(result)) {
            return (
              <PropertyIcon
                key={`property-popup-${index}`}
                result={result}
                interactive={true}
                handlePropertyAction={this.props.handlePropertyAction}
                position={this.getLatLng(result)}
              />
            )
          } else {
            return null
          }
        })
        .filter(i => i)
    } else {
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
  displayedRequest: PropTypes.object,
  displayedResultsFilter: PropTypes.object,
  visible: PropTypes.bool,
}

const mapStateToProps = (state, ownProps) => {
  const results = state.requests[(ownProps.displayedRequest || {}).requestConstant] || []
  return {
    results: ownProps.displayedResultsFilter.internalFilter(results, ownProps.displayedResultsFilter.paramMaps),
  }
}

export default connect(mapStateToProps)(PropertyIcons)

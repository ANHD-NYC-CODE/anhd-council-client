import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'shared/constants'

import PropertyIcon from 'LeafletMap/PropertyIcon'

class PropertyIcons extends React.Component {
  constructor(props) {
    super(props)
  }

  getLatLng(result) {
    if (result.latitude && result.longitude) {
      return [result.latitude, result.longitude]
    }
  }

  render() {
    if (!(this.props.visible && (this.props.results.length || Object.keys(this.props.results).length))) return null
    if (this.props.iconConfig === 'MULTIPLE') {
      if (!this.props.overrideWarning && this.props.results.length > c.MAP_MARKER_LIMIT) return null
      return this.props.results
        .map((result, index) => {
          if (this.getLatLng(result)) {
            return (
              <PropertyIcon
                key={`property-popup-${index}`}
                page={this.props.page}
                result={result}
                interactive={true}
                handlePropertyAction={this.props.handlePropertyAction}
                position={this.getLatLng(result)}
                dispatch={this.props.dispatch}
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
  visible: PropTypes.bool,
  page: PropTypes.string,
}

export default PropertyIcons

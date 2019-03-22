import React from 'react'
import PropTypes from 'prop-types'
import { Marker, Popup, Tooltip } from 'react-leaflet'
import BaseLink from 'shared/components/BaseLink'
import { Card, Button } from 'react-bootstrap'

class PropertyIcon extends React.Component {
  constructor(props) {
    super(props)
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

  render() {
    return (
      <div className="property-icon">
        <Marker position={this.props.position}>
          <Tooltip>{this.props.result.address}</Tooltip>
          <Popup>
            <Card style={{ border: 'none' }}>
              <Card.Body>
                <Card.Title>{this.props.result.address}</Card.Title>
                <Card.Text>
                  <Button
                    as={BaseLink}
                    variant="primary"
                    href={`/property/${this.props.result.bbl}`}
                    text="View Property"
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Popup>
        </Marker>
      </div>
    )
  }
}

PropertyIcon.propTypes = {
  result: PropTypes.object,
  position: PropTypes.array,
}

export default PropertyIcon

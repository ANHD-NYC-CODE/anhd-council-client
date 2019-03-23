import React from 'react'
import PropTypes from 'prop-types'
import { Row, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import ConfigContext from 'Config/ConfigContext'
import LeafletMap from 'LeafletMap'
const PrintAlertMap = props => {
  return (
    <div className="print-alert-map">
      <Row>
        <Button onClick={() => props.layout.togglePrint()}>
          <FontAwesomeIcon icon={faPrint} />
          <span> Exit Print</span>
        </Button>
      </Row>
      <Row>
        <ConfigContext.Consumer>
          {config => {
            return (
              <LeafletMap
                councilDistricts={config.councilDistricts}
                communityDistricts={config.communityDistricts}
                currentGeographyType={this.props.currentGeographyType}
                currentGeographyId={this.props.currentGeographyId}
                changingGeographyId={this.props.changingGeographyId}
                changingGeographyType={this.props.changingGeographyType}
                handleChangeGeography={this.props.handleChangeGeography}
                handleChangeGeographyId={this.props.handleChangeGeographyId}
                iconConfig="MULTIPLE"
                selectedRequest={this.props.selectedRequest}
                selectGeographyData={config.selectGeographyData}
              />
            )
          }}
        </ConfigContext.Consumer>
      </Row>
    </div>
  )
}

PrintAlertMap.propTypes = {
  layout: PropTypes.object,
}

export default PrintAlertMap

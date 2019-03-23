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
                appState={props.appState}
                councilDistricts={config.councilDistricts}
                communityDistricts={config.communityDistricts}
                iconConfig="MULTIPLE"
                interactable={false}
                selectedRequest={props.selectedRequest}
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
  appState: PropTypes.object,
  layout: PropTypes.object,
  selectedRequest: PropTypes.object,
}

export default PrintAlertMap

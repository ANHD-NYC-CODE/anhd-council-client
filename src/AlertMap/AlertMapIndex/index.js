import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap'
import GeographySelect from 'shared/components/GeographySelect'
import LeafletMap from 'LeafletMap'
import ConfigContext from 'Config/ConfigContext'

const AlertMapIndex = props => {
  return (
    <div className="alert-map-index">
      <Row>
        <GeographySelect
          currentGeographyType={props.appState.currentGeographyType}
          currentGeographyId={props.appState.currentGeographyId}
          dispatch={props.dispatch}
          changing={props.appState.changingGeography}
          changingGeographyType={props.appState.changingGeographyType}
          changingGeographyId={props.appState.changingGeographyId}
          cancelChangeGeography={props.cancelChangeGeography}
          handleChangeGeographyType={props.handleChangeGeographyType}
          handleChangeGeography={props.handleChangeGeography}
          showSubmit={
            props.appState.changingGeography &&
            props.appState.changingGeographyType &&
            props.appState.changingGeographyId > 0
          }
        />
      </Row>
      <Row>
        <Col xs={12} sm={6} md={4} />
        <Col xs={12} sm={6} md={8} />
      </Row>
      <Row>
        <Col xs={12} lg={3} />
        <Col xs={12} lg={6}>
          <ConfigContext.Consumer>
            {config => {
              return (
                <LeafletMap
                  appState={props.appState}
                  currentGeographyType={props.appState.changingGeographyType}
                  councilDistricts={config.councilDistricts}
                  communityDistricts={config.communityDistricts}
                  handleChangeGeography={props.handleChangeGeography}
                  handleChangeGeographyId={props.handleChangeGeographyId}
                  selectGeographyData={config.selectGeographyData}
                />
              )
            }}
          </ConfigContext.Consumer>
        </Col>
        <Col sm={12} lg={3} />
      </Row>
    </div>
  )
}

AlertMapIndex.propTypes = {
  changeGeographyAndId: PropTypes.func,
  dispatch: PropTypes.func,
}

export default AlertMapIndex

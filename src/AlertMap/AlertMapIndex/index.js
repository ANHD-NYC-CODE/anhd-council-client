import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap'
import GeographySelect from 'shared/components/GeographySelect'
import LeafletMap from 'LeafletMap'
import ConfigContext from 'Config/ConfigContext'
import IntroductionBlock from 'shared/components/IntroductionBlock'
const AlertMapIndex = props => {
  return (
    <div className="alert-map-index">
      <Row>
        <Col className="touch-left padding-xs-sm-0" xs={12} lg={5}>
          <IntroductionBlock />
        </Col>
        <Col className="px-md-4 py-3 py-lg-6" xs={12} lg={7}>
          <Row className="mb-4">
            <Col>
              <p className="text-muted font-weight-bold">Select a district to begin.</p>
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
            </Col>
          </Row>
          <Row>
            <Col>
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
          </Row>
        </Col>
      </Row>
    </div>
  )
}

AlertMapIndex.propTypes = {
  changeGeographyAndId: PropTypes.func,
  dispatch: PropTypes.func,
}

export default AlertMapIndex

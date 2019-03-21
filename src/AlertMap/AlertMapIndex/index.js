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
          dispatch={props.dispatch}
          handleChangeGeography={props.handleChangeGeography}
          handleChangeGeographyType={props.handleChangeGeographyType}
          cancelChangeGeography={props.cancelChangeGeography}
          changing={props.changingGeography}
          changingGeographyType={props.changingGeographyType}
          changingGeographyId={props.changingGeographyId}
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
                  councilDistricts={config.councilDistricts}
                  communityDistricts={config.communityDistricts}
                  currentGeographyType={props.changingGeographyType}
                  currentGeographyId={props.changingGeographyId}
                  handleChangeGeographyId={props.handleChangeGeographyId}
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

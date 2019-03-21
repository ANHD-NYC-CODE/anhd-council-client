import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { getRequestType, getManyRequestTypes } from 'Store/AppState/selectors'

import GeographySelect from 'shared/components/GeographySelect'
import { Card, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import BaseLink from 'shared/components/BaseLink'
import LeafletMap from 'LeafletMap'
import RequestWrapper from 'shared/components/RequestWrapper'
import RequestSummary from 'shared/components/RequestSummary'
import SummaryResultCard from 'shared/components/SummaryResultCard'
import HousingTypeSummaryResultCard from 'AlertMap/HousingTypeSummaryResultCard'
import ConfigContext from 'Config/ConfigContext'

import GeographyProfile from 'AlertMap/GeographyProfile'
import { alertMapFilterdates } from 'shared/utilities/componentUtils'

class AlertMapShow extends React.Component {
  constructor(props) {
    super(props)
    this.switchTable = this.switchTable.bind(this)
    this.toggleView = this.toggleView.bind(this)

    this.state = {
      view: 1,
      selectedRequest: getRequestType(props.requests, 'ADVANCED_SEARCH').length
        ? getRequestType(this.props.requests, 'ADVANCED_SEARCH')[0]
        : getRequestType(this.props.requests, 'MAP_FILTER')[0],
    }
  }

  toggleView(value) {
    this.setState({
      view: value,
    })
  }

  switchTable(request) {
    this.setState({
      selectedRequest: request,
    })
  }

  render() {
    const geographyRequests = getManyRequestTypes(this.props.requests, ['MAP_FILTER', 'ADVANCED_SEARCH'])

    const housingTypeRequests = getRequestType(this.props.requests, 'GEOGRAPHY_HOUSING_TYPE')
    return (
      <div>
        <Row>
          <GeographySelect
            currentGeographyType={this.props.currentGeographyType}
            currentGeographyId={this.props.currentGeographyId}
            dispatch={this.props.dispatch}
            changing={this.props.changingGeography}
            changingGeographyType={this.props.changingGeographyType}
            changingGeographyId={this.props.changingGeographyId}
            cancelChangeGeography={this.props.cancelChangeGeography}
            handleChangeGeographyType={this.props.handleChangeGeographyType}
            handleChangeGeography={this.props.handleChangeGeography}
          />
        </Row>
        <Row>
          <Col xs={12} sm={6} md={4}>
            <ToggleButtonGroup
              name="dateRange"
              type="radio"
              value={this.props.mapFilterDate}
              onChange={this.props.toggleDateRange}
            >
              <ToggleButton value={alertMapFilterdates()[2]}>{`Last 3 Years (${moment(alertMapFilterdates()[2]).format(
                'YYYY'
              )})`}</ToggleButton>
              <ToggleButton value={alertMapFilterdates()[1]}>{`Last Year (${moment(alertMapFilterdates()[1]).format(
                'YYYY'
              )})`}</ToggleButton>
              <ToggleButton value={alertMapFilterdates()[0]}>{`Last Month (${moment(alertMapFilterdates()[0]).format(
                'MM/YYYY'
              )})`}</ToggleButton>
            </ToggleButtonGroup>
          </Col>
          <Col xs={12} sm={6} md={8}>
            <Row>
              {geographyRequests.map((request, index) => {
                return (
                  <Col xs={12} sm={6} lg={4} key={`rs-col-${index}`} className="geography-request-summary__container">
                    <RequestSummary
                      key={`request-summary-${this.props.requests.indexOf(request)}`}
                      request={request}
                      onClick={r => this.switchTable(r)}
                      resultsComponent={SummaryResultCard}
                      selected={this.state.selectedRequest === request}
                    />
                  </Col>
                )
              })}
              {!geographyRequests.some(r => r.type === 'ADVANCED_SEARCH') && (
                <Col xs={12} sm={6} lg={4}>
                  <Card>
                    <Card.Body>
                      <BaseLink href="/search" text="+ Add Custom Filter" />
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={3}>
            {housingTypeRequests.map((request, index) => {
              return (
                <Col xs={12} sm={6} lg={4} key={`rs-col-${index}`} className="housingtype-request-summary__container">
                  <RequestSummary
                    key={`request-summary-${this.props.requests.indexOf(request)}`}
                    request={request}
                    onClick={r => this.switchTable(r)}
                    resultsComponent={HousingTypeSummaryResultCard}
                    selected={this.state.selectedRequest === request}
                  />
                </Col>
              )
            })}
          </Col>
          <Col xs={12} lg={6}>
            <ToggleButtonGroup
              name="view"
              type="radio"
              className="view-toggle"
              value={this.state.view}
              onChange={this.toggleView}
            >
              <ToggleButton value={1}>Map View</ToggleButton>
              <ToggleButton value={2}>Table View</ToggleButton>
            </ToggleButtonGroup>

            {this.state.view === 1 ? (
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
                      handleChangeGeographyId={this.props.handleChangeGeographyId}
                      selectGeographyData={config.selectGeographyData}
                    />
                  )
                }}
              </ConfigContext.Consumer>
            ) : (
              this.props.requests.map((request, index) => {
                return (
                  <RequestWrapper
                    key={`request-wrapper-${this.props.requests.indexOf(request)}`}
                    visible={this.state.selectedRequest === request}
                    request={request}
                  />
                )
              })
            )}
          </Col>
          <Col sm={12} lg={3}>
            <GeographyProfile
              currentGeographyType={this.props.currentGeographyType}
              currentGeographyId={this.props.currentGeographyId}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

AlertMapShow.propTypes = {
  changeGeographyAndId: PropTypes.func,
  dispatch: PropTypes.func,
  currentGeographyType: PropTypes.string,
  currentGeographyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mapFilterDate: PropTypes.string,
  requests: PropTypes.array,
  toggleDateRange: PropTypes.func,
}

export default AlertMapShow

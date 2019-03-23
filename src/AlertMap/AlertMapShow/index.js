import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { getRequestType, getManyRequestTypes } from 'Store/AppState/selectors'
import GeographySelect from 'shared/components/GeographySelect'
import { Card, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import LayoutContext from 'Layout/LayoutContext'

import BaseLink from 'shared/components/BaseLink'
import LeafletMap from 'LeafletMap'
import RequestWrapper from 'shared/components/RequestWrapper'
import RequestSummary from 'shared/components/RequestSummary'
import SummaryResultCard from 'shared/components/SummaryResultCard'
import HousingTypeSummaryResultCard from 'AlertMap/HousingTypeSummaryResultCard'
import ConfigContext from 'Config/ConfigContext'
import PrintButton from 'shared/components/PrintButton'

import { geographySelectionToString } from 'shared/utilities/languageUtils'

import GeographyProfile from 'AlertMap/GeographyProfile'
import { alertMapFilterdates } from 'shared/utilities/componentUtils'
import PrintAlertMap from 'AlertMap/PrintAlertMap'
class AlertMapShow extends React.Component {
  constructor(props) {
    super(props)
    this.switchTable = this.switchTable.bind(this)
    this.toggleView = this.toggleView.bind(this)

    this.state = {
      view: 1,
    }
  }

  componentDidUpdate() {
    if (
      this.props.appState.changingGeographyType === this.props.appState.currentGeographyType &&
      this.props.appState.changingGeographyId === this.props.appState.currentGeographyId
    ) {
      this.props.cancelChangeGeography()
    }
  }

  toggleView(value) {
    this.setState({
      view: value,
    })
  }

  switchTable(request) {
    this.props.switchSelectedRequest(request)
  }

  render() {
    const geographyRequests = getManyRequestTypes(this.props.appState.requests, ['MAP_FILTER', 'ADVANCED_SEARCH'])

    const housingTypeRequests = getRequestType(this.props.appState.requests, 'GEOGRAPHY_HOUSING_TYPE')
    return (
      <LayoutContext.Consumer>
        {layout =>
          layout.print ? (
            <PrintAlertMap
              appState={this.props.appState}
              layout={layout}
              selectedRequest={this.props.selectedRequest}
            />
          ) : (
            <div className="alert-map-show">
              <Row>
                <GeographySelect
                  currentGeographyType={this.props.appState.currentGeographyType}
                  currentGeographyId={this.props.appState.currentGeographyId}
                  dispatch={this.props.dispatch}
                  changing={this.props.appState.changingGeography}
                  changingGeographyType={this.props.appState.changingGeographyType}
                  changingGeographyId={this.props.appState.changingGeographyId}
                  cancelChangeGeography={this.props.cancelChangeGeography}
                  handleChangeGeographyType={this.props.handleChangeGeographyType}
                  handleChangeGeography={this.props.handleChangeGeography}
                  showSubmit={
                    this.props.appState.changingGeography &&
                    this.props.appState.changingGeographyType &&
                    this.props.appState.changingGeographyId > 0
                  }
                />

                <PrintButton
                  title={`${geographySelectionToString({
                    type: this.props.appState.currentGeographyType,
                    id: this.props.appState.currentGeographyId,
                  })} summary`}
                />
              </Row>
              <Row>
                <Col xs={12} sm={6} md={4}>
                  <ToggleButtonGroup
                    name="dateRange"
                    type="radio"
                    value={this.props.appState.mapFilterDate}
                    onChange={this.props.toggleDateRange}
                  >
                    <ToggleButton value={alertMapFilterdates()[2]}>{`Last 3 Years (${moment(
                      alertMapFilterdates()[2]
                    ).format('YYYY')})`}</ToggleButton>
                    <ToggleButton value={alertMapFilterdates()[1]}>{`Last Year (${moment(
                      alertMapFilterdates()[1]
                    ).format('YYYY')})`}</ToggleButton>
                    <ToggleButton value={alertMapFilterdates()[0]}>{`Last Month (${moment(
                      alertMapFilterdates()[0]
                    ).format('MM/YYYY')})`}</ToggleButton>
                  </ToggleButtonGroup>
                </Col>
                <Col xs={12} sm={6} md={8}>
                  <Row>
                    {geographyRequests.map((request, index) => {
                      return (
                        <Col
                          xs={12}
                          sm={6}
                          lg={4}
                          key={`rs-col-${index}`}
                          className="geography-request-summary__container"
                        >
                          <RequestSummary
                            key={`request-summary-${this.props.appState.requests.indexOf(request)}`}
                            request={request}
                            onClick={r => this.switchTable(r)}
                            resultsComponent={SummaryResultCard}
                            selected={this.props.selectedRequest === request}
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
                      <Col
                        xs={12}
                        sm={6}
                        lg={4}
                        key={`rs-col-${index}`}
                        className="housingtype-request-summary__container"
                      >
                        <RequestSummary
                          key={`request-summary-${this.props.appState.requests.indexOf(request)}`}
                          request={request}
                          onClick={r => this.switchTable(r)}
                          resultsComponent={HousingTypeSummaryResultCard}
                          selected={this.props.selectedRequest === request}
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
                            appState={this.props.appState}
                            councilDistricts={config.councilDistricts}
                            communityDistricts={config.communityDistricts}
                            handleChangeGeography={this.props.handleChangeGeography}
                            handleChangeGeographyId={this.props.handleChangeGeographyId}
                            iconConfig="MULTIPLE"
                            selectedRequest={this.props.selectedRequest}
                            selectGeographyData={config.selectGeographyData}
                          />
                        )
                      }}
                    </ConfigContext.Consumer>
                  ) : (
                    geographyRequests.concat(housingTypeRequests).map((request, index) => {
                      return (
                        <RequestWrapper
                          key={`request-wrapper-${this.props.appState.requests.indexOf(request)}`}
                          visible={this.props.selectedRequest === request}
                          request={request}
                        />
                      )
                    })
                  )}
                </Col>
                <Col sm={12} lg={3}>
                  <GeographyProfile
                    currentGeographyType={this.props.appState.currentGeographyType}
                    currentGeographyId={this.props.appState.currentGeographyId}
                  />
                </Col>
              </Row>
            </div>
          )
        }
      </LayoutContext.Consumer>
    )
  }
}

AlertMapShow.propTypes = {
  appState: PropTypes.object,
  dispatch: PropTypes.func,
  requests: PropTypes.array,
  toggleDateRange: PropTypes.func,
}

export default AlertMapShow

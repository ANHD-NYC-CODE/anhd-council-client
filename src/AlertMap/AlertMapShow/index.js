import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import GeographySelect from 'shared/components/GeographySelect'
import { Card, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import AdvancedSearchSentence from 'AdvancedSearch/Sentence'
import LayoutContext from 'Layout/LayoutContext'

import BaseLink from 'shared/components/BaseLink'
import LeafletMap from 'LeafletMap'
import RequestWrapper from 'shared/components/RequestWrapper'
import RequestSummary from 'shared/components/RequestSummary'
import SummaryResultCard from 'shared/components/SummaryResultCard'
import HousingTypeSummaryResultCard from 'AlertMap/HousingTypeSummaryResultCard'
import ConfigContext from 'Config/ConfigContext'
import PrintButton from 'shared/components/PrintButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

import { geographySelectionToString } from 'shared/utilities/languageUtils'

import GeographyProfile from 'AlertMap/GeographyProfile'
import { alertMapFilterdates } from 'shared/utilities/componentUtils'
import PrintAlertMap from 'AlertMap/PrintAlertMap'

import './style.scss'

class AlertMapShow extends React.PureComponent {
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
              <Row className="geography-select-row py-2">
                <Col md={1} className="geography-select-row__icon d-none d-md-block">
                  <FontAwesomeIcon className="text-white" icon={faMapMarkerAlt} size="2x" />
                </Col>
                <Col xs={12} md={8} lg={7}>
                  <GeographySelect
                    selectClass=""
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
                </Col>
                <Col className="d-none d-md-block" xs={12} md={{ span: 2, offset: 1 }} lg={{ span: 2, offset: 2 }}>
                  <PrintButton
                    textClass="text-muted"
                    title={`${geographySelectionToString({
                      type: this.props.appState.currentGeographyType,
                      id: this.props.appState.currentGeographyId,
                    })} summary`}
                  />
                </Col>
              </Row>
              <Row className="py-2">
                <Col xs={12} sm={6} md={4}>
                  <Row className="mb-2">
                    <Col>
                      <ToggleButtonGroup
                        name="dateRange"
                        type="radio"
                        value={this.props.appState.mapFilterDate}
                        onChange={this.props.toggleDateRange}
                      >
                        <ToggleButton
                          variant="outline-primary"
                          value={alertMapFilterdates()[2]}
                        >{`Last 3 Years (${moment(alertMapFilterdates()[2]).format('YYYY')})`}</ToggleButton>
                        <ToggleButton variant="outline-primary" value={alertMapFilterdates()[1]}>{`Last Year (${moment(
                          alertMapFilterdates()[1]
                        ).format('YYYY')})`}</ToggleButton>
                        <ToggleButton variant="outline-primary" value={alertMapFilterdates()[0]}>{`Last Month (${moment(
                          alertMapFilterdates()[0]
                        ).format('MM/YYYY')})`}</ToggleButton>
                      </ToggleButtonGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {this.props.selectedRequest.type === 'ADVANCED_SEARCH' && (
                        <AdvancedSearchSentence advancedSearch={this.props.advancedSearch} />
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} sm={6} md={8}>
                  <Row>
                    {this.props.geographyRequests.map((request, index) => {
                      return (
                        <Col
                          xs={12}
                          md={6}
                          xl={4}
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
                    {!this.props.geographyRequests.some(r => r.type === 'ADVANCED_SEARCH') && (
                      <Col className="geography-request-summary__container" xs={12} md={6} xl={4}>
                        <Col className="pr-0" xs={11}>
                          <Card className="border-0">
                            <Card.Body>
                              <BaseLink href="/search" text="+ Add Custom Filter" />
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col xs={1} className="pl-0 pr-1" />
                      </Col>
                    )}
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs={12} lg={3}>
                  {this.props.housingTypeRequests.map((request, index) => {
                    return (
                      <Col
                        xs={12}
                        sm={6}
                        lg={12}
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
                            currentGeographyType={this.props.appState.currentGeographyType}
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
                    this.props.geographyRequests.concat(this.props.housingTypeRequests).map((request, index) => {
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

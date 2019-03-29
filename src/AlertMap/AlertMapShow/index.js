import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import GeographySelect from 'shared/components/GeographySelect'
import { Card, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import AdvancedSearchSentence from 'AdvancedSearch/Sentence'
import LayoutContext from 'Layout/LayoutContext'

import BaseLink from 'shared/components/BaseLink'
import LeafletMap from 'LeafletMap'
import RequestTableWrapper from 'shared/components/RequestTableWrapper'
import RequestSummaryWrapper from 'shared/components/RequestSummaryWrapper'
import SummaryResultCard from 'shared/components/ResultCard/SummaryResultCard'
import FilteredResultCard from 'shared/components/ResultCard/FilteredResultCard'

import HousingTypeResultCard from 'shared/components/ResultCard/HousingTypeResultCard'
import ConfigContext from 'Config/ConfigContext'
import PrintButton from 'shared/components/PrintButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'
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
    this.props.switchSelectedRequest(this.props.appState.requests.indexOf(request))
    this.props.cancelChangeGeography()
  }

  render() {
    return (
      <LayoutContext.Consumer>
        {layout =>
          layout.print ? (
            <PrintAlertMap
              appState={this.props.appState}
              layout={layout}
              selectedRequestIndex={this.props.selectedRequestIndex}
            />
          ) : (
            <div className="alert-map-show">
              <Row className="geography-select-row py-4 py-md-2">
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
              <Row className="py-2 mb-4 mb-lg-0">
                <Col xs={12} lg={4}>
                  <Row className="mt-2 mb-4 mt-lg-0 mb-lg-2">
                    <Col>
                      <ToggleButtonGroup
                        name="dateRange"
                        type="radio"
                        value={this.props.appState.mapFilterDate}
                        onChange={this.props.toggleDateRange}
                      >
                        <ToggleButton
                          variant="outline-primary"
                          className="p-1 toggle-link"
                          value={alertMapFilterdates()[2]}
                        >{`Last 3 Years (${moment(alertMapFilterdates()[2]).format('YYYY')})`}</ToggleButton>
                        <ToggleButton
                          className="p-1 toggle-link"
                          variant="outline-primary"
                          value={alertMapFilterdates()[1]}
                        >{`Last Year (${moment(alertMapFilterdates()[1]).format('YYYY')})`}</ToggleButton>
                        <ToggleButton
                          className="p-1 toggle-link"
                          variant="outline-primary"
                          value={alertMapFilterdates()[0]}
                        >{`Last Month (${moment(alertMapFilterdates()[0]).format('MM/YYYY')})`}</ToggleButton>
                      </ToggleButtonGroup>
                    </Col>
                  </Row>
                  {this.props.appState.requests[this.props.selectedRequestIndex].type === 'ADVANCED_SEARCH' && (
                    <div className="py-2 mb-4 mb-lg-0">
                      <Col>
                        <h5>Custom Search:</h5>
                        <AdvancedSearchSentence advancedSearch={this.props.advancedSearch} />
                      </Col>
                    </div>
                  )}
                </Col>
                <Col xs={12} lg={8}>
                  <Row>
                    {this.props.geographyRequests.map((request, index) => {
                      return (
                        <Col
                          xs={12}
                          sm={6}
                          xl={4}
                          key={`rs-col-${index}`}
                          className="geography-request-summary__container"
                        >
                          <RequestSummaryWrapper
                            key={`request-summary-${this.props.appState.requests.indexOf(request)}`}
                            request={request}
                            onClick={r => this.switchTable(r)}
                            resultsComponent={SummaryResultCard}
                            selected={this.props.selectedRequestIndex === this.props.appState.requests.indexOf(request)}
                          />
                        </Col>
                      )
                    })}
                    {!this.props.geographyRequests.some(r => r.type === 'ADVANCED_SEARCH') && (
                      <Col className="geography-request-summary__container d-flex" xs={12} sm={6} xl={4}>
                        <Col className="align-self-center pl-0 pl-lg-2 pr-0" xs={11}>
                          <BaseLink href="/search">
                            <Card className="border-0">
                              <Card.Body>+ Add Custom Filter</Card.Body>
                            </Card>
                          </BaseLink>
                        </Col>
                        <Col xs={1} className="pl-0 pr-1" />
                      </Col>
                    )}
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs={12} lg={3}>
                  <Row className="py-2 mb-4 mb-lg-0">
                    <Col xs={12} sm={6} lg={12} className="housingtype-request-summary__container">
                      <RequestSummaryWrapper
                        key={`request-summary2-${this.props.appState.requests.indexOf(
                          this.props.propertySummaryRequest
                        )}`}
                        request={this.props.propertySummaryRequest}
                        totalRequest={this.props.housingTypeRequests.find(
                          r => r.requestConstant === 'GEOGRAPHY_HOUSING_TYPE_ALL'
                        )}
                        onClick={r => this.switchTable(r)}
                        label="Small Homes"
                        filter={results => results.filter(result => result.unitsres > 0 && result.unitsres <= 6)}
                        resultsComponent={HousingTypeResultCard}
                        selected={
                          this.props.selectedRequestIndex ===
                          this.props.appState.requests.indexOf(this.props.propertySummaryRequest)
                        }
                      />
                    </Col>
                    {this.props.housingTypeRequests.map((request, index) => {
                      return (
                        <Col
                          xs={12}
                          sm={6}
                          lg={12}
                          key={`rs-col-${index}`}
                          className="housingtype-request-summary__container"
                        >
                          <RequestSummaryWrapper
                            key={`request-summary-${this.props.appState.requests.indexOf(request)}`}
                            request={request}
                            totalRequest={this.props.housingTypeRequests.find(
                              r => r.requestConstant === 'GEOGRAPHY_HOUSING_TYPE_ALL'
                            )}
                            onClick={r => this.switchTable(r)}
                            resultsComponent={HousingTypeResultCard}
                            selected={this.props.selectedRequestIndex === this.props.appState.requests.indexOf(request)}
                          />
                        </Col>
                      )
                    })}
                  </Row>
                </Col>
                <Col xs={12} lg={6}>
                  <Row className="mb-2 mb-lg-0">
                    <Col className="d-flex justify-content-end">
                      <ToggleButtonGroup
                        name="view"
                        type="radio"
                        className="view-toggle"
                        value={this.state.view}
                        onChange={this.toggleView}
                      >
                        <ToggleButton className="toggle-link" value={1}>
                          Map View
                        </ToggleButton>
                        <ToggleButton className="toggle-link" value={2}>
                          Table View
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Col>
                  </Row>
                  <Row className="py-2 mb-4 mb-lg-0">
                    <Col>
                      <div className={classnames({ 'd-none': this.state.view !== 1 })}>
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
                                selectedRequestIndex={this.props.selectedRequestIndex}
                                selectGeographyData={config.selectGeographyData}
                              />
                            )
                          }}
                        </ConfigContext.Consumer>
                      </div>
                      <div className={classnames({ 'd-none': this.state.view === 1 })}>
                        {this.props.geographyRequests.concat(this.props.housingTypeRequests).map((request, index) => {
                          return (
                            <RequestTableWrapper
                              key={`request-wrapper-${this.props.appState.requests.indexOf(request)}`}
                              visible={
                                this.props.selectedRequestIndex === this.props.appState.requests.indexOf(request)
                              }
                              request={request}
                            />
                          )
                        })}
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col sm={12} lg={3}>
                  <Row className="py-2 mb-4 mb-lg-0">
                    <Col>
                      <GeographyProfile
                        currentGeographyType={this.props.appState.currentGeographyType}
                        currentGeographyId={this.props.appState.currentGeographyId}
                      />
                    </Col>
                  </Row>
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
  propertySummaryRequest: PropTypes.object,
}

export default AlertMapShow

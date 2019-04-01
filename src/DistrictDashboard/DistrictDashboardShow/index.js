import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import GeographySelect from 'shared/components/GeographySelect'
import { Card, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import AdvancedSearchSentence from 'AdvancedSearch/Sentence'
import LayoutContext from 'Layout/LayoutContext'
import HousingTypeSection from 'DistrictDashboard/DistrictDashboardShow/HousingTypeSection'
import BaseLink from 'shared/components/BaseLink'
import LeafletMap from 'LeafletMap'
import RequestTableWrapper from 'shared/components/RequestTableWrapper'
import RequestSummaryWrapper from 'shared/components/RequestSummaryWrapper'
import SummaryResultCard from 'shared/components/ResultCard/SummaryResultCard'

import PrintButton from 'shared/components/PrintButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'
import { geographySelectionToString } from 'shared/utilities/languageUtils'

import GeographyProfile from 'DistrictDashboard/GeographyProfile'
import { districtDashboardFilterdates } from 'shared/utilities/componentUtils'
import PrintDistrictDashboard from 'DistrictDashboard/PrintDistrictDashboard'

import './style.scss'

class DistrictDashboardShow extends React.PureComponent {
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

  switchTable(request, filter) {
    this.props.switchSelectedRequest(request, filter)
    this.props.cancelChangeGeography()
  }

  render() {
    return (
      <LayoutContext.Consumer>
        {layout =>
          layout.print ? (
            <PrintDistrictDashboard
              appState={this.props.appState}
              layout={layout}
              config={this.props.config}
              propertySummaryRequest={this.props.propertySummaryRequest}
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
                          value={districtDashboardFilterdates()[2]}
                        >{`Last 3 Years (${moment(districtDashboardFilterdates()[2]).format('YYYY')})`}</ToggleButton>
                        <ToggleButton
                          className="p-1 toggle-link"
                          variant="outline-primary"
                          value={districtDashboardFilterdates()[1]}
                        >{`Last Year (${moment(districtDashboardFilterdates()[1]).format('YYYY')})`}</ToggleButton>
                        <ToggleButton
                          className="p-1 toggle-link"
                          variant="outline-primary"
                          value={districtDashboardFilterdates()[0]}
                        >{`Last Month (${moment(districtDashboardFilterdates()[0]).format('MM/YYYY')})`}</ToggleButton>
                      </ToggleButtonGroup>
                    </Col>
                  </Row>
                  {(this.props.selectedRequest || {}).type === 'ADVANCED_SEARCH' && (
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
                            label={request.summaryCardLabel}
                            onClick={this.switchTable}
                            resultsComponent={SummaryResultCard}
                            selected={this.props.selectedRequest === request}
                          />
                        </Col>
                      )
                    })}
                    {!this.props.geographyRequests.some(r => r.type === 'ADVANCED_SEARCH') && (
                      <Col className="geography-request-summary__container d-flex" xs={12} sm={6} xl={4}>
                        <Col className="align-self-center pl-0 pl-lg-2 pr-0" xs={11}>
                          <BaseLink href="/search">
                            <Card className="border-0">
                              <Card.Body>+ Add Custom Search</Card.Body>
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
                  <Row className="housingtype-section py-2 mb-4 mb-lg-0">
                    <HousingTypeSection
                      appState={this.props.appState}
                      housingTypeRequests={this.props.housingTypeRequests}
                      propertySummaryRequest={this.props.propertySummaryRequest}
                      selectedRequest={this.props.selectedRequest}
                      switchTable={this.switchTable}
                      selectedResultsFilter={this.props.selectedResultsFilter}
                    />
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
                        <LeafletMap
                          appState={this.props.appState}
                          councilDistricts={this.props.config.councilDistricts}
                          communityDistricts={this.props.config.communityDistricts}
                          currentGeographyType={this.props.appState.currentGeographyType}
                          handleChangeGeography={this.props.handleChangeGeography}
                          handleChangeGeographyId={this.props.handleChangeGeographyId}
                          iconConfig="MULTIPLE"
                          displayedRequest={this.props.selectedRequest}
                          displayedResultsFilter={this.props.selectedResultsFilter}
                          selectGeographyData={this.props.config.selectGeographyData}
                        />
                        ) }}
                      </div>
                      <div className={classnames({ 'd-none': this.state.view === 1 })}>
                        {this.props.geographyRequests.concat(this.props.housingTypeRequests).map((request, index) => {
                          return (
                            <RequestTableWrapper
                              key={`request-wrapper-${this.props.appState.requests.indexOf(request)}`}
                              visible={this.props.selectedRequest === request}
                              request={request}
                              selectedResultsFilter={this.props.selectedResultsFilter}
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

DistrictDashboardShow.propTypes = {
  appState: PropTypes.object,
  config: PropTypes.object,
  dispatch: PropTypes.func,
  requests: PropTypes.array,
  toggleDateRange: PropTypes.func,
  propertySummaryRequest: PropTypes.object,
}

export default DistrictDashboardShow

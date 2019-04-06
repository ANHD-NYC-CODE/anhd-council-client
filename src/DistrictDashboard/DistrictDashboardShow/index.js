import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import GeographySelect from 'shared/components/GeographySelect'
import { Form, Button, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import AdvancedSearchSentence from 'AdvancedSearch/Sentence'
import LayoutContext from 'Layout/LayoutContext'
import HousingTypeSection from 'DistrictDashboard/DistrictDashboardShow/HousingTypeSection'
import DistrictResultsTitle from 'DistrictDashboard/DistrictDashboardShow/DistrictResultsTitle'
import LeafletMap from 'LeafletMap'
import RequestTableWrapper from 'shared/components/RequestTableWrapper'
import CsvButton from 'shared/components/buttons/CsvButton'
import DistrictSummarySection from 'DistrictDashboard/DistrictDashboardShow/DistrictSummarySection'
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
    this.setViewTable = this.setViewTable.bind(this)
    this.switchTable = this.switchTable.bind(this)
    this.toggleView = this.toggleView.bind(this)
    this.applyCombinedFilters = this.applyCombinedFilters.bind(this)
    this.state = {
      view: 1,
      combinedFilters: false,
    }

    this.getGeographySummaryResultsFilter = this.getGeographySummaryResultsFilter.bind(this)
    this.getDisplayedResultsFilter = this.getDisplayedResultsFilter.bind(this)
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

  setViewTable() {
    this.setState({
      view: 2,
    })
  }

  applyCombinedFilters(e) {
    this.setState({
      combinedFilters: !this.state.combinedFilters,
    })

    if (e.target.checked) {
      const defaultRequest =
        this.props.appState.selectedRequest === this.props.propertySummaryRequest
          ? this.props.geographyRequests[0]
          : this.props.appState.selectedRequest

      const defaultFilter =
        this.props.appState.selectedResultsFilter || this.props.config.resourceModels['PROPERTY'].ownResultFilters[0]
      this.switchTable(defaultRequest, defaultFilter)
    } else {
      this.switchTable(this.props.appState.selectedRequest, undefined)
    }
  }

  switchTable(request, filter) {
    let appliedRequest
    if (request) {
      appliedRequest = request
    } else {
      appliedRequest = this.props.appState.selectedRequest
    }
    this.props.switchSelectedRequest(appliedRequest, filter)
    this.props.cancelChangeGeography()
  }

  getGeographySummaryResultsFilter() {
    return this.state.combinedFilters ? this.props.selectedResultsFilter : undefined
  }

  getDisplayedResultsFilter() {
    if ((this.props.selectedRequest || {}).type === 'ADVANCED_SEARCH') return undefined
    if (this.state.combinedFilters || (this.props.selectedRequest || {}).type === 'GEOGRAPHY_HOUSING_TYPE') {
      return this.props.selectedResultsFilter
    } else {
      return undefined
    }
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
            <div className="district-dashboard-show">
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
                <Col className="d-none d-md-block" xs={12} md={{ span: 1, offset: 2 }} lg={{ span: 1, offset: 2 }}>
                  <PrintButton
                    textClass="text-light"
                    title={`${geographySelectionToString({
                      type: this.props.appState.currentGeographyType,
                      id: this.props.appState.currentGeographyId,
                    })} summary`}
                  />
                </Col>
                <Col className="d-none d-md-block" xs={12} md={{ span: 1, offset: 0 }} lg={{ span: 1, offset: 0 }}>
                  <CsvButton
                    className="text-light"
                    dispatch={this.props.dispatch}
                    request={this.props.appState.selectedRequest}
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
                  <Row className="py-2 mb-4 mb-lg-0">
                    {(this.props.selectedRequest || {}).type === 'ADVANCED_SEARCH' ? (
                      <Col>
                        <h5 className="text-primary font-weight-bold">Custom Search:</h5>
                        <AdvancedSearchSentence advancedSearch={this.props.advancedSearch} />
                      </Col>
                    ) : null}
                  </Row>
                </Col>
                <Col xs={12} lg={8}>
                  <Row className="mb-1">
                    <Col xs={12}>
                      <h5 className="text-muted font-weight-bold text-uppercase">Filter by dataset</h5>
                    </Col>
                  </Row>
                  <DistrictSummarySection
                    appState={this.props.appState}
                    combinedFilters={this.state.combinedFilters}
                    dispatch={this.props.dispatch}
                    switchTable={this.switchTable}
                    selectedRequest={this.props.selectedRequest}
                    geographyRequests={this.props.geographyRequests}
                    selectedResultsFilter={this.getGeographySummaryResultsFilter()}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} lg={4} xl={3}>
                  <Row>
                    <Col xs={12}>
                      <h5 className="text-muted font-weight-bold text-uppercase">Filter by housing type</h5>
                    </Col>
                  </Row>

                  <Row className="housingtype-section py-2 mb-4 mb-lg-0">
                    <HousingTypeSection
                      appState={this.props.appState}
                      combinedFilters={this.state.combinedFilters}
                      housingTypeRequests={this.props.housingTypeRequests}
                      propertySummaryRequest={this.props.propertySummaryRequest}
                      selectedRequest={this.props.selectedRequest}
                      switchTable={this.switchTable}
                      selectedResultsFilter={this.props.selectedResultsFilter}
                    />
                  </Row>
                </Col>
                <Col xs={12} lg={5} xl={6}>
                  <Row className="mb-2 mb-lg-0 district-dashboard-show__results-container">
                    <Col xs={12} xl={7}>
                      <DistrictResultsTitle
                        displayedRequest={
                          this.props.selectedRequest !== this.props.propertySummaryRequest
                            ? this.props.selectedRequest
                            : undefined
                        }
                        displayedResultsFilter={this.props.selectedResultsFilter}
                      />
                    </Col>
                    <Col className="d-flex view-toggle__container" xs={12} xl={5}>
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
                  <Row>
                    <Col xs={12}>
                      <Form.Check
                        className="combineFilters__checkbox"
                        custom
                        type={'checkbox'}
                        id={'combineFilters'}
                        label={'Combine Dataset Filters with Housing Type Filters'}
                        checked={this.state.combinedFilters}
                        onChange={e => {
                          this.applyCombinedFilters(e)
                        }}
                      />
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
                          displayedResultsFilter={this.getDisplayedResultsFilter()}
                          selectGeographyData={this.props.config.selectGeographyData}
                          switchView={this.setViewTable}
                        />
                      </div>
                      <div className={classnames({ 'd-none': this.state.view === 1 })}>
                        {this.props.geographyRequests.concat(this.props.housingTypeRequests).map((request, index) => {
                          return (
                            <RequestTableWrapper
                              key={`request-wrapper-${this.props.appState.requests.indexOf(request)}`}
                              visible={this.props.selectedRequest === request}
                              request={request}
                              selectedResultsFilter={this.getDisplayedResultsFilter()}
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

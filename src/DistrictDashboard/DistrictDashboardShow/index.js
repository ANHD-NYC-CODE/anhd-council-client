import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import * as c from 'shared/constants'
import GeographySelect from 'shared/components/GeographySelect'
import { Card, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import BaseLink from 'shared/components/BaseLink'
import { constructCsvFileName } from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'
import AdvancedSearchSentence from 'AdvancedSearch/Sentence'
import LayoutContext from 'Layout/LayoutContext'
import HousingTypeSection from 'DistrictDashboard/DistrictDashboardShow/HousingTypeSection'
import DistrictResultsTitle from 'DistrictDashboard/DistrictDashboardShow/DistrictResultsTitle'
import LeafletMap from 'LeafletMap'
import DistrictSummarySection from 'DistrictDashboard/DistrictDashboardShow/DistrictSummarySection'
import PrintButton from 'shared/components/PrintButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'
import { geographySelectionToString, shortAmountComparisonString } from 'shared/utilities/languageUtils'
import GeographyProfile from 'DistrictDashboard/GeographyProfile'
import PrintDistrictDashboard from 'DistrictDashboard/PrintDistrictDashboard'
import BaseTable from 'shared/components/BaseTable'
import { setAppState } from 'Store/AppState/actions'

import RequestSummaryWrapper from 'shared/components/RequestSummaryWrapper'

import SummaryResultCard from 'shared/components/ResultCard/SummaryResultCard'

import './style.scss'

class DistrictDashboardShow extends React.Component {
  constructor(props) {
    super(props)
    this.setTableView = this.setTableView.bind(this)
    this.state = {
      tableView: false,
    }

    this.getResultRecords = this.getResultRecords.bind(this)
    this.constructBaseCsvFileName = this.constructBaseCsvFileName.bind(this)
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

  setTableView(value) {
    this.setState({
      tableView: value,
    })
  }

  constructBaseCsvFileName() {
    // TODO: add date, housing filter, dataset filters
    const housingFilter = this.props.appState.housingTypeFilter
    const geographyType = this.props.appState.currentGeographyType
    const geographyId = this.props.appState.currentGeographyId
    const selectedFilters = this.props.appState.selectedFilters
    const mapFilterDate = () => {
      switch (this.props.appState.mapFilterDate) {
        case c.DISTRICT_REQUEST_DATE_ONE:
          return moment(c.DISTRICT_RESULTS_DATE_ONE).format('MM/DD/YYYY')
        case c.DISTRICT_REQUEST_DATE_TWO:
          return moment(c.DISTRICT_RESULTS_DATE_TWO).format('MM/DD/YYYY')
        case c.DISTRICT_REQUEST_DATE_THREE:
          return moment(c.DISTRICT_RESULTS_DATE_THREE).format('MM/DD/YYYY')
      }
    }

    if (this.props.appState.districtShowCustomView) {
      return constructCsvFileName(this.props.advancedSearch)
    } else {
      return `${
        housingFilter ? housingFilter.label : 'residential'
      }_properties__${geographyType}${geographyId}__${selectedFilters
        .map(filter => `${filter.fieldName}_${shortAmountComparisonString(filter.comparison, filter.value)}`)
        .join('_or_')}${mapFilterDate()}-${moment(moment.now()).format('MM/DD/YYYY')}`
    }
  }

  getGeographySummaryResultsFilter() {
    return this.props.housingTypeResultFilter
  }

  getDisplayedResultsFilter() {
    return this.props.housingTypeResultFilter
  }

  getResultRecords() {
    const housingTypeFilter =
      !this.props.appState.districtShowCustomView && this.props.appState.housingTypeResultFilter
        ? results =>
            this.props.appState.housingTypeResultFilter.internalFilter(
              results,
              this.props.appState.housingTypeResultFilter.paramMaps
            )
        : results => results

    let propertyResults = this.props.totalPropertyResults

    if (this.props.appState.districtShowCustomView) {
      propertyResults = this.props.requests['ADVANCED_SEARCH'] || []
    } else if (this.props.appState.selectedFilters.length) {
      propertyResults = propertyResults.filter(result =>
        this.props.appState.selectedFilters.some(selectedFilter => selectedFilter.evaluate(result))
      )
    }

    return housingTypeFilter(propertyResults)
  }

  render() {
    const resultRecords = this.getResultRecords()
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
                    submitButtonVariant="outline-primary"
                  />
                </Col>
                <Col className="d-none d-md-block" xs={12} md={{ span: 1, offset: 2 }} lg={{ span: 1, offset: 2 }}>
                  {c.ENABLE_PRINT && (
                    <PrintButton
                      textClass="text-light"
                      title={`${geographySelectionToString({
                        type: this.props.appState.currentGeographyType,
                        id: this.props.appState.currentGeographyId,
                      })} summary`}
                    />
                  )}
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
                          value={c.DISTRICT_REQUEST_DATE_THREE}
                        >{`Last 3 Years (${moment(c.DISTRICT_RESULTS_DATE_THREE).format('MM/DD/YYYY')})`}</ToggleButton>
                        <ToggleButton
                          className="p-1 toggle-link"
                          variant="outline-primary"
                          value={c.DISTRICT_REQUEST_DATE_TWO}
                        >{`Last Year (${moment(c.DISTRICT_RESULTS_DATE_TWO).format('MM/DD/YYYY')})`}</ToggleButton>
                        <ToggleButton
                          className="p-1 toggle-link"
                          variant="outline-primary"
                          value={c.DISTRICT_REQUEST_DATE_ONE}
                        >{`Last 30 Days (${moment(c.DISTRICT_RESULTS_DATE_ONE).format('MM/DD/YYYY')})`}</ToggleButton>
                      </ToggleButtonGroup>
                    </Col>
                  </Row>
                  <Row>
                    {// Custom Search
                    this.props.geographyRequests
                      .filter(r => r.type === 'ADVANCED_SEARCH')
                      .map(request => {
                        return (
                          <Col xs={12} key={'rs-col-custom-search'} className="geography-request-summary__container">
                            <RequestSummaryWrapper
                              key={'request-summary-custom-search'}
                              summaryBackgroundColorClass={c.CUSTOM_CARD_BACKGROUND_COLOR_CLASS}
                              request={request}
                              resultsFilter={undefined}
                              label={'Custom Search'}
                              onClick={() =>
                                this.props.dispatch(
                                  setAppState({ districtShowCustomView: !this.props.appState.districtShowCustomView })
                                )
                              }
                              resultsComponent={SummaryResultCard}
                              selected={this.props.appState.districtShowCustomView}
                            />
                          </Col>
                        )
                      })}
                    {!this.props.geographyRequests.some(r => r.type === 'ADVANCED_SEARCH') && (
                      <Col className="geography-request-summary__container d-flex" xs={12}>
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
                  <Row className="py-2 mb-4 mb-lg-0">
                    {this.props.appState.districtShowCustomView ? (
                      <Col>
                        <h5 className="text-primary font-weight-bold">Description:</h5>
                        <AdvancedSearchSentence advancedSearch={this.props.advancedSearch} />
                      </Col>
                    ) : null}
                  </Row>
                </Col>
                <Col xs={12} lg={8}>
                  <Row className="mb-1">
                    <Col xs={12}>
                      <h5 className="text-muted font-weight-bold text-uppercase">Filter by dataset(s)</h5>
                    </Col>
                  </Row>
                  <DistrictSummarySection
                    appState={this.props.appState}
                    customView={this.props.appState.districtShowCustomView}
                    dispatch={this.props.dispatch}
                    geographyRequests={this.props.geographyRequests}
                    housingTypeResultFilter={this.getGeographySummaryResultsFilter()}
                    loading={this.props.loading}
                    resendPropertyRequest={this.props.resendPropertyRequest}
                    totalPropertyResults={this.props.totalPropertyResults}
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
                      customView={this.props.appState.districtShowCustomView}
                      dispatch={this.props.dispatch}
                      propertySummaryRequest={this.props.propertySummaryRequest}
                      switchSelectedFilter={this.props.switchSelectedFilter}
                      housingTypeResultFilter={this.props.housingTypeResultFilter}
                    />
                  </Row>
                </Col>
                <Col xs={12} lg={5} xl={6}>
                  <Row className="mb-2 mb-lg-0 district-dashboard-show__results-container">
                    <Col xs={12} xl={7}>
                      <DistrictResultsTitle
                        records={resultRecords}
                        displayedRequest={
                          this.props.selectedRequest !== this.props.propertySummaryRequest
                            ? this.props.selectedRequest
                            : undefined
                        }
                        displayedResultsFilter={
                          this.props.appState.selectedRequests.some(r => r.type === 'ADVANCED_SEARCH')
                            ? undefined
                            : this.props.housingTypeResultFilter
                        }
                      />
                    </Col>
                    <Col className="d-flex view-toggle__container" xs={12} xl={5}>
                      <ToggleButtonGroup
                        name="view"
                        type="radio"
                        className="view-toggle"
                        value={this.state.tableView}
                        onChange={this.setTableView}
                      >
                        <ToggleButton className="toggle-link" value={false}>
                          Map View
                        </ToggleButton>
                        <ToggleButton className="toggle-link" value={true}>
                          Table View
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Col>
                  </Row>

                  <Row className="py-2 mb-4 mb-lg-0">
                    <Col>
                      <div className={classnames({ 'd-none': this.state.tableView })}>
                        <LeafletMap
                          appState={this.props.appState}
                          councilDistricts={this.props.config.councilDistricts}
                          communityDistricts={this.props.config.communityDistricts}
                          currentGeographyType={this.props.appState.currentGeographyType}
                          handleChangeGeography={this.props.handleChangeGeography}
                          handleChangeGeographyId={this.props.handleChangeGeographyId}
                          iconConfig="MULTIPLE"
                          loading={this.props.loading}
                          results={resultRecords}
                          displayedResultsFilter={
                            this.props.appState.selectedRequests.some(r => r.type === 'ADVANCED_SEARCH')
                              ? undefined
                              : this.getDisplayedResultsFilter()
                          }
                          selectGeographyData={this.props.config.selectGeographyData}
                          switchView={() => this.setViewTable(1)}
                        />
                      </div>
                      <div className={classnames({ 'd-none': !this.state.tableView })}>
                        <BaseTable
                          csvBaseFileName={this.constructBaseCsvFileName()}
                          key={`table-${this.props.appState.mapFilterDate}`}
                          annotationStart={
                            this.props.appState.districtShowCustomView ? '' : this.props.appState.mapFilterDate
                          }
                          datasetModelName={this.props.propertySummaryRequest.tableConfig.datasetModelName}
                          dispatch={this.props.dispatch}
                          error={this.props.error}
                          errorAction={(this.props.error || {}).status === 504 ? this.retryRequest : null}
                          expandable={false}
                          loading={this.props.loading}
                          records={resultRecords}
                          showUpdate={false}
                          tableConfig={this.props.propertySummaryRequest.tableConfig}
                        />
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

DistrictDashboardShow.defaultProps = {
  loading: false,
  totalPropertyResults: [],
}

DistrictDashboardShow.propTypes = {
  appState: PropTypes.object,
  config: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  requests: PropTypes.array,
  toggleDateRange: PropTypes.func,
  propertySummaryRequest: PropTypes.object,
  totalPropertyResults: PropTypes.array,
}

export default DistrictDashboardShow

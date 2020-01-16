import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import * as c from 'shared/constants'
import GeographySelect from 'shared/components/GeographySelect'
import { Form, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import BaseLink from 'shared/components/BaseLink'
import { constructCsvFileName } from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'
import AdvancedSearchSentence from 'AdvancedSearch/Sentence'
import HousingTypeSection from 'DistrictDashboard/DistrictDashboardShow/HousingTypeSection'
import DashboardResultsEditor from 'DistrictDashboard/DistrictDashboardShow/DashboardResultsEditor'
import LeafletMap from 'LeafletMap'
import DistrictFilterSection from 'DistrictDashboard/DistrictDashboardShow/DistrictFilterSection'
import DashboardResultsHeader from 'DistrictDashboard/DistrictDashboardShow/DashboardResultsHeader'
import ConfigContext from 'Config/ConfigContext'

import classnames from 'classnames'
import { shortAmountComparisonString } from 'shared/utilities/languageUtils'
import GeographyProfile from 'DistrictDashboard/GeographyProfile'
import BaseTable from 'shared/components/BaseTable'

import { setDashboardCustomView, setDashboardTableView } from 'Store/DashboardState/actions'

import RequestSummaryWrapper from 'shared/components/RequestSummaryWrapper'

import SummaryResultCard from 'shared/components/ResultCard/SummaryResultCard'

import './style.scss'

class DistrictDashboardShow extends React.Component {
  constructor(props) {
    super(props)
    this.setTableView = this.setTableView.bind(this)

    this.constructBaseCsvFileName = this.constructBaseCsvFileName.bind(this)
    this.getGeographySummaryResultsFilter = this.getGeographySummaryResultsFilter.bind(this)
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
    this.props.dispatch(setDashboardTableView(value))
  }

  constructBaseCsvFileName() {
    const housingFilter = this.props.appState.housingTypeFilter
    const geographyType = this.props.appState.currentGeographyType
    const geographyId = this.props.appState.currentGeographyId
    const selectedFilters = this.props.dashboardState.selectedFilters
    const mapFilterDate = () => {
      switch (this.props.dashboardState.mapFilterDate) {
        case c.DISTRICT_REQUEST_DATE_ONE:
          return moment(c.DISTRICT_RESULTS_DATE_ONE).format('MM/DD/YYYY')
        case c.DISTRICT_REQUEST_DATE_TWO:
          return moment(c.DISTRICT_RESULTS_DATE_TWO).format('MM/DD/YYYY')
        case c.DISTRICT_REQUEST_DATE_THREE:
          return moment(c.DISTRICT_RESULTS_DATE_THREE).format('MM/DD/YYYY')
      }
    }

    if (this.props.dashboardState.districtShowCustomView) {
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

  render() {
    const resultRecords = this.props.dashboardState.resultRecords
    return (
      <div className="district-dashboard-show">
        <div className="district-dashboard-show__search-section layout-width-wrapper district-dashboard-container">
          {// Custom Search
          this.props.geographyRequests
            .filter(r => r.type === c.ADVANCED_SEARCH)
            .map(request => {
              return (
                <RequestSummaryWrapper
                  key={'request-summary-custom-search'}
                  summaryBackgroundColorClass={c.CUSTOM_CARD_BACKGROUND_COLOR_CLASS}
                  request={request}
                  resultsFilter={undefined}
                  label={'Custom Search'}
                  onClick={() =>
                    this.props.dispatch(setDashboardCustomView(!this.props.dashboardState.districtShowCustomView))
                  }
                  results={this.props.dashboardState.customSearchResults}
                  resultsComponent={SummaryResultCard}
                  selected={this.props.dashboardState.districtShowCustomView}
                />
              )
            })}
          {this.props.dashboardState.districtShowCustomView ? (
            <div>
              <h5 className="text-primary font-weight-bold">Description:</h5>
              <AdvancedSearchSentence advancedSearch={this.props.advancedSearch} />
            </div>
          ) : null}
        </div>
        <div className="district-dashboard-show__content layout-width-wrapper district-dashboard-container">
          <div className="district-dashboard-show__sidebar">
            <div className="district-dashboard-show__date-section">
              <Form>
                <p className="district-dashboard-show__date-section__label" r>
                  VIEW DATA FROM:
                </p>
                <Form.Check
                  className="district-dashboard-show__date-section__check"
                  tabIndex={0}
                  custom
                  type="radio"
                  id="date-radio--30-days"
                  disabled={this.props.dashboardState.districtShowCustomView || this.props.loading}
                  variant="outline-primary"
                  label={`Last 30 Days (${moment(c.DISTRICT_RESULTS_DATE_ONE).format('MM/DD/YYYY')})`}
                  onChange={() => this.props.toggleDateRange(c.DISTRICT_REQUEST_DATE_ONE)}
                  checked={this.props.dashboardState.mapFilterDate === c.DISTRICT_REQUEST_DATE_ONE}
                />
                <Form.Check
                  className="district-dashboard-show__date-section__check"
                  tabIndex={0}
                  custom
                  type="radio"
                  id="date-radio--1-year"
                  disabled={this.props.dashboardState.districtShowCustomView || this.props.loading}
                  variant="outline-primary"
                  label={`Last Year (${moment(c.DISTRICT_RESULTS_DATE_TWO).format('MM/DD/YYYY')})`}
                  onChange={() => this.props.toggleDateRange(c.DISTRICT_REQUEST_DATE_TWO)}
                  checked={this.props.dashboardState.mapFilterDate === c.DISTRICT_REQUEST_DATE_TWO}
                />
                <Form.Check
                  className="district-dashboard-show__date-section__check"
                  tabIndex={0}
                  custom
                  type="radio"
                  id="date-radio--3-years"
                  disabled={this.props.dashboardState.districtShowCustomView || this.props.loading}
                  variant="outline-primary"
                  label={`Last 3 Years (${moment(c.DISTRICT_RESULTS_DATE_THREE).format('MM/DD/YYYY')})`}
                  onChange={() => this.props.toggleDateRange(c.DISTRICT_REQUEST_DATE_THREE)}
                  checked={this.props.dashboardState.mapFilterDate === c.DISTRICT_REQUEST_DATE_THREE}
                />
              </Form>
            </div>
            <div className="district-dashboard-show__housing-type-section">
              <HousingTypeSection
                customView={this.props.dashboardState.districtShowCustomView}
                dispatch={this.props.dispatch}
                propertySummaryRequest={this.props.propertySummaryRequest}
                switchSelectedFilter={this.props.switchSelectedFilter}
                housingTypeResults={this.props.dashboardState.housingTypeResults}
                housingTypeResultFilter={this.props.housingTypeResultFilter}
                loading={this.props.loading}
              />
            </div>
            <div className="district-dashboard-show__filter-section">
              <DistrictFilterSection
                appState={this.props.appState}
                dashboardState={this.props.dashboardState}
                customView={this.props.dashboardState.districtShowCustomView}
                dispatch={this.props.dispatch}
                endChangingState={this.props.endChangingState}
                geographyRequests={this.props.geographyRequests}
                housingTypeResultFilter={this.getGeographySummaryResultsFilter()}
                loading={this.props.loading}
                resendPropertyRequest={this.props.resendPropertyRequest}
                totalPropertyResults={this.props.totalPropertyResults}
              />
            </div>
          </div>
          <div className="district-dashboard-show__results-section">
            <div className="geography-select-row">
              <div className="district-dashboard-show__top-row__inner">
                <GeographySelect
                  selectClass="main-geography-select"
                  inputSize="md"
                  submitButtonVariant="dark"
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
                {!this.props.geographyRequests.some(r => r.type === c.ADVANCED_SEARCH) && (
                  <div className="custom-search-link">
                    Access more options with a{' '}
                    <BaseLink className="text-link" href="/search">
                      Custom Search
                    </BaseLink>
                  </div>
                )}
              </div>
            </div>
            <div className="district-dashboard-show__results-header">
              <ConfigContext.Consumer>
                {config => {
                  const propertyResource = Object.values(config.resourceModels).find(
                    model => model.resourceConstant === 'PROPERTY'
                  )
                  const residentialFilter = propertyResource.ownResultFilters.find(
                    f => f.id === c.HOUSING_TYPE_RESIDENTIAL
                  )
                  return (
                    <DashboardResultsHeader
                      label={this.props.dashboardState.housingTypeResultFilter.label}
                      percentageOfWhole={this.props.dashboardState.housingTypeResultFilter !== residentialFilter}
                      results={
                        this.props.dashboardState.housingTypeResults[this.props.dashboardState.housingTypeResultsIndex]
                      }
                      totalResults={this.props.dashboardState.totalPropertyResults}
                    />
                  )
                }}
              </ConfigContext.Consumer>
              <DashboardResultsEditor dispatch={this.props.dispatch} />
              <ButtonToolbar className="d-flex view-toggle__container">
                <ToggleButtonGroup
                  name="view"
                  type="radio"
                  value={this.props.dashboardState.dashboardTableView}
                  onChange={this.setTableView}
                >
                  <ToggleButton
                    tabIndex="0"
                    className="view-toggle"
                    variant={this.props.dashboardState.dashboardTableView ? 'light' : 'dark'}
                    value={false}
                  >
                    Map
                  </ToggleButton>
                  <ToggleButton
                    tabIndex="0"
                    className="view-toggle"
                    variant={this.props.dashboardState.dashboardTableView ? 'dark' : 'light'}
                    value={true}
                  >
                    List
                  </ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
            </div>
            <div className="district-dashboard-show__results-container">
              <div
                className={classnames('district-dashboard-show__map', {
                  'd-none': this.props.dashboardState.dashboardTableView,
                })}
              >
                {
                  // Regens map when geo type or ID changes, or if map/table toggled
                }
                <LeafletMap
                  key={`${this.props.appState.currentGeographyType}-${this.props.appState.currentGeographyId}-${
                    this.props.dashboardState.dashboardTableView
                  }`}
                  appState={this.props.appState}
                  councilDistricts={this.props.config.councilDistricts}
                  communityDistricts={this.props.config.communityDistricts}
                  stateAssemblies={this.props.config.stateAssemblies}
                  stateSenates={this.props.config.stateSenates}
                  zipCodes={this.props.config.zipCodes}
                  currentGeographyType={this.props.appState.currentGeographyType}
                  closeGeographyPopup={this.props.endChangingState}
                  dispatch={this.props.dispatch}
                  handleChangeGeography={this.props.handleChangeGeography}
                  handleChangeGeographyId={this.props.handleChangeGeographyId}
                  iconConfig="MULTIPLE"
                  loading={this.props.loading}
                  results={resultRecords}
                  selectGeographyData={this.props.config.selectGeographyData}
                  switchView={() => this.setViewTable(1)}
                  zoom={this.props.dashboardState.dashboardMapZoom}
                />
              </div>
              <div
                className={classnames('district-dashboard-show__table', {
                  'd-none': !this.props.dashboardState.dashboardTableView,
                })}
              >
                <BaseTable
                  key={`table-${this.props.dashboardState.mapFilterDate}`}
                  csvBaseFileName={this.constructBaseCsvFileName()}
                  globalTableState={this.props.dashboardState.dashboardTableState}
                  annotationStart={
                    this.props.dashboardState.districtShowCustomView ? '' : this.props.dashboardState.mapFilterDate
                  }
                  datasetModelName={this.props.propertySummaryRequest.resourceModel.resourceConstant}
                  dispatch={this.props.dispatch}
                  error={this.props.error}
                  errorAction={(this.props.error || {}).status === 504 ? this.retryRequest : null}
                  expandable={false}
                  loading={this.props.loading}
                  recordsSize={resultRecords.length}
                  records={resultRecords}
                  showUpdate={false}
                  tableConfig={this.props.propertySummaryRequest.tableConfig}
                />
              </div>
            </div>
            <div>
              <GeographyProfile
                currentGeographyType={this.props.appState.currentGeographyType}
                currentGeographyId={this.props.appState.currentGeographyId}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DistrictDashboardShow.defaultProps = {
  loading: false,
  totalPropertyResults: [],
}

DistrictDashboardShow.propTypes = {
  appState: PropTypes.object,
  dashboardState: PropTypes.object,
  config: PropTypes.object,
  dispatch: PropTypes.func,
  endChangingState: PropTypes.func,
  loading: PropTypes.bool,
  requests: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  toggleDateRange: PropTypes.func,
  propertySummaryRequest: PropTypes.object,
  totalPropertyResults: PropTypes.array,
}

export default DistrictDashboardShow

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import * as c from 'shared/constants'
import GeographySelect from 'shared/components/GeographySelect'
import { Button, Form, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import BaseLink from 'shared/components/BaseLink'
import HousingTypeSection from 'DistrictDashboard/DistrictDashboardShow/HousingTypeSection'
import DashboardResultsEditor from 'DistrictDashboard/DistrictDashboardShow/DashboardResultsEditor'
import LeafletMap from 'LeafletMap'
import DistrictFilterSection from 'DistrictDashboard/DistrictDashboardShow/DistrictFilterSection'
import DashboardResultsHeader from 'DistrictDashboard/DistrictDashboardShow/DashboardResultsHeader'
import ConfigContext from 'Config/ConfigContext'
import { setAppState } from 'Store/AppState/actions'

import classnames from 'classnames'
import { shortAmountComparisonString, mapFilterDateToLabel } from 'shared/utilities/languageUtils'
import GeographyProfile from 'DistrictDashboard/GeographyProfile'
import BaseTable from 'shared/components/BaseTable'
import InfoModalButton from 'shared/components/InfoModalButton'

import { push } from 'connected-react-router'

import { setDashboardTableView } from 'Store/DashboardState/actions'

import './style.scss'

class DistrictDashboardShow extends React.Component {
  constructor(props) {
    super(props)
    this.setTableView = this.setTableView.bind(this)

    this.constructBaseCsvFileName = this.constructBaseCsvFileName.bind(this)
    this.getGeographySummaryResultsFilter = this.getGeographySummaryResultsFilter.bind(this)
    this.handleClearDashboard = this.handleClearDashboard.bind(this)
  }

  componentDidUpdate() {
    if (
      this.props.appState.changingGeographyType === this.props.appState.currentGeographyType &&
      this.props.appState.changingGeographyId === this.props.appState.currentGeographyId
    ) {
      this.props.cancelChangeGeography()
    }
  }

  handleClearDashboard() {
    this.props.dispatch(
      setAppState({
        currentGeographyType: undefined,
        currentGeographyId: undefined,
        changingGeographyType: undefined,
        changingGeographyId: undefined,
      })
    )
    this.props.dispatch(push('/map'))
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

    return `${
      housingFilter ? housingFilter.label : 'residential'
    }_properties__${geographyType}${geographyId}__${selectedFilters
      .map(filter => `${filter.fieldName}_${shortAmountComparisonString(filter.comparison, filter.value)}`)
      .join('_or_')}${mapFilterDate()}-${moment(moment.now()).format('MM/DD/YYYY')}`
  }

  getGeographySummaryResultsFilter() {
    return this.props.housingTypeResultFilter
  }

  render() {
    const resultRecords = this.props.dashboardState.resultRecords
    return (
      <div className="district-dashboard-show">
        <div className="district-dashboard-show__content layout-width-wrapper district-dashboard-container">
          <div className="district-dashboard-show__sidebar">
            <div className="district-dashboard-show__date-section">
              <Form>
                <div className="district-dashboard-show__date-label-row">
                  <p className="district-dashboard-show__date-section__label">VIEW DATA FROM:</p>
                  <InfoModalButton modalConstant={'DASHBOARD_DATES'} />
                </div>

                <Form.Check
                  className="district-dashboard-show__date-section__check"
                  tabIndex={0}
                  custom
                  data-test-id="dashboard-show-date-radio"
                  type="radio"
                  id="date-radio--30-days"
                  disabled={this.props.loading}
                  variant="outline-primary"
                  label={mapFilterDateToLabel(c.DISTRICT_REQUEST_DATE_ONE)}
                  // label={`Last 30 Days (${moment(c.DISTRICT_RESULTS_DATE_ONE).format('MM/DD/YYYY')})`}
                  onChange={() => this.props.toggleDateRange(c.DISTRICT_REQUEST_DATE_ONE)}
                  checked={this.props.dashboardState.mapFilterDate === c.DISTRICT_REQUEST_DATE_ONE}
                />
                <Form.Check
                  className="district-dashboard-show__date-section__check"
                  tabIndex={0}
                  custom
                  data-test-id="dashboard-show-date-radio"
                  type="radio"
                  id="date-radio--1-year"
                  disabled={this.props.loading}
                  variant="outline-primary"
                  label={mapFilterDateToLabel(c.DISTRICT_REQUEST_DATE_TWO)}
                  // label={`Last Year (${moment(c.DISTRICT_RESULTS_DATE_TWO).format('MM/DD/YYYY')})`}
                  onChange={() => this.props.toggleDateRange(c.DISTRICT_REQUEST_DATE_TWO)}
                  checked={this.props.dashboardState.mapFilterDate === c.DISTRICT_REQUEST_DATE_TWO}
                />
                <Form.Check
                  className="district-dashboard-show__date-section__check"
                  tabIndex={0}
                  custom
                  data-test-id="dashboard-show-date-radio"
                  type="radio"
                  id="date-radio--3-years"
                  disabled={this.props.loading}
                  variant="outline-primary"
                  label={mapFilterDateToLabel(c.DISTRICT_REQUEST_DATE_THREE)}
                  // label={`Last 3 Years (${moment(c.DISTRICT_RESULTS_DATE_THREE).format('MM/DD/YYYY')})`}
                  onChange={() => this.props.toggleDateRange(c.DISTRICT_REQUEST_DATE_THREE)}
                  checked={this.props.dashboardState.mapFilterDate === c.DISTRICT_REQUEST_DATE_THREE}
                />
              </Form>
            </div>
            <div className="district-dashboard-show__housing-type-section">
              <HousingTypeSection
                dispatch={this.props.dispatch}
                propertySummaryRequest={this.props.propertySummaryRequest}
                switchSelectedFilter={this.props.switchSelectedFilter}
                housingTypeResults={this.props.dashboardState.housingTypeResults}
                housingTypeResultFilter={this.props.housingTypeResultFilter}
                housingTypeResultsIndex={this.props.dashboardState.housingTypeResultsIndex}
                totalPropertyResults={this.props.totalPropertyResults}
                loading={this.props.loading}
              />
            </div>
            <div className="district-dashboard-show__filter-section">
              <DistrictFilterSection
                appState={this.props.appState}
                dashboardState={this.props.dashboardState}
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
                <div className="district-dashboard-show__top-row-group">
                  {!this.props.appState.changingGeography && (
                    <Button
                      className="district-dashboard-show__clear"
                      variant="dark"
                      onClick={this.handleClearDashboard}
                    >
                      CLEAR
                    </Button>
                  )}

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
                      label={(this.props.dashboardState.housingTypeResultFilter || {}).label}
                      percentageOfWhole={this.props.dashboardState.housingTypeResultFilter !== residentialFilter}
                      housingResults={
                        this.props.dashboardState.housingTypeResults[this.props.dashboardState.housingTypeResultsIndex]
                      }
                      totalResults={this.props.dashboardState.totalPropertyResults}
                    />
                  )
                }}
              </ConfigContext.Consumer>
              <DashboardResultsEditor
                dispatch={this.props.dispatch}
                filteredResults={this.props.dashboardState.resultRecords}
                housingTypeResultFilter={this.props.dashboardState.housingTypeResultFilter}
                selectedFilters={this.props.dashboardState.selectedFilters}
                mapFilterDate={this.props.dashboardState.mapFilterDate}
                filterCondition={this.props.dashboardState.filterCondition}
              />
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
                    data-test-id="dashboard-map-table-toggle"
                    variant={this.props.dashboardState.dashboardTableView ? 'light' : 'dark'}
                    value={false}
                  >
                    Map
                  </ToggleButton>
                  <ToggleButton
                    tabIndex="0"
                    className="view-toggle"
                    data-test-id="dashboard-map-table-toggle"
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
                  currentGeographyType={this.props.appState.currentGeographyType}
                  currentGeographyId={this.props.appState.currentGeographyId}
                  changingGeographyType={this.props.appState.changingGeographyType}
                  changingGeographyId={this.props.appState.changingGeographyId}
                  councilDistricts={this.props.config.councilDistricts}
                  communityDistricts={this.props.config.communityDistricts}
                  stateAssemblies={this.props.config.stateAssemblies}
                  stateSenates={this.props.config.stateSenates}
                  zipCodes={this.props.config.zipCodes}
                  closeGeographyPopup={this.props.endChangingState}
                  dispatch={this.props.dispatch}
                  handleChangeGeography={this.props.handleChangeGeography}
                  handleChangeGeographyId={this.props.handleChangeGeographyId}
                  iconConfig="MULTIPLE"
                  loading={this.props.loading}
                  results={resultRecords}
                  selectGeographyData={this.props.config.selectGeographyData}
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
                  annotationStart={this.props.dashboardState.mapFilterDate}
                  datasetModelName={this.props.propertySummaryRequest.resourceModel.resourceConstant}
                  dispatch={this.props.dispatch}
                  error={this.props.error}
                  errorAction={(this.props.error || {}).status === 504 ? this.retryRequest : null}
                  expandable={false}
                  loading={this.props.loading}
                  recordsSize={resultRecords.length}
                  records={this.props.loading ? [] : resultRecords}
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

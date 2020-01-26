import React from 'react'
import PropTypes from 'prop-types'
import { GET_ADVANCED_SEARCH } from 'Store/AdvancedSearch/constants'
import * as c from 'shared/constants'
import StandardizedInput from 'shared/classes/StandardizedInput'
import Geography from 'shared/classes/Geography'

import { getSingleRequest } from 'Store/AppState/selectors'
import { constructCsvFileName } from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'

import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { connect } from 'react-redux'
import { Events, animateScroll as scroll, scrollSpy } from 'react-scroll'
import Helmet from 'react-helmet'
import { Button, ButtonToolbar, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import LeafletMap from 'LeafletMap'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import BaseTable from 'shared/components/BaseTable'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'
import { addGeography, updateGeography } from 'Store/AdvancedSearch/actions'
import {
  clearAdvancedSearchRequest,
  setAppState,
  setGeographyAndRequestsAndRedirect,
  setAdvancedSearchRequest,
} from 'Store/AppState/actions'

import AdvancedSearchForm from 'AdvancedSearch/AdvancedSearchForm'
import AdvancedSearchSentenceEditor from 'AdvancedSearch/AdvancedSearchSentenceEditor'
import ConfigContext from 'Config/ConfigContext'

import classnames from 'classnames'

import './style.scss'
export class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)
    const searchGeography = props.advancedSearch.geographies[0]

    this.state = {
      currentGeographyType: searchGeography ? searchGeography.constant : this.props.appState.currentGeographyType,
      currentGeographyId: searchGeography ? searchGeography.id : this.props.appState.currentGeographyId,
      changingGeographyType: undefined,
      changingGeographyId: undefined,
      displayingForm: !this.props.advancedSearch.results.length,
      displayingList: false,
      zoom: 14,
      tableState: {},
    }
    this.loadRequest = this.loadRequest.bind(this)
    this.handleChangeGeographyType = this.handleChangeGeographyType.bind(this)
    this.changeGeography = this.changeGeography.bind(this)
    this.cancelChangeGeography = this.cancelChangeGeography.bind(this)

    if (this.props.appState.changingGeography) {
      this.props.dispatch(
        setAppState({ changingGeography: false, changingGeographyType: undefined, changingGeographyId: undefined })
      )
    }
  }

  componentDidMount() {
    scrollSpy.update()
    scroll.scrollToTop({
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart',
    })
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin')
    Events.scrollEvent.remove('end')
  }

  componentDidUpdate() {
    if (this.props.advancedSearchRequest && !this.props.advancedSearchRequest.called) {
      this.loadRequest(this.props.advancedSearchRequest)
      this.setState({ displayingForm: false })
    }
  }

  loadRequest(request) {
    this.props.dispatch(requestWithAuth(makeRequest(request)))
  }

  handleChangeGeographyType(e) {
    e = new StandardizedInput(e)
    this.setState({
      changingGeographyType: e.value,
      changingGeographyId: -1,
    })
  }

  changeGeography({ e, geographyType, geographyId } = {}) {
    e = new StandardizedInput(e)
    const type = geographyType || this.state.changingGeographyType || this.state.currentGeographyType
    const id = geographyId || e.value
    if (!this.props.advancedSearch.geographies.length) {
      const newGeography = new Geography(type, id)
      this.props.dispatch(addGeography(newGeography))
    } else {
      const geography = this.props.advancedSearch.geographies[0]
      geography[e.key] = e.value
      this.props.dispatch(updateGeography(0, geography))
    }

    this.setState({
      currentGeographyType: type,
      currentGeographyId: id,
    })

    if (!this.props.appState.currentGeographyId) {
      this.props.dispatch(
        setGeographyAndRequestsAndRedirect({
          geographyType: type,
          geographyId: id,
          redirect: false,
          requests: this.props.config.createMapRequests(type, id),
        })
      )
    }
    this.cancelChangeGeography()
  }

  cancelChangeGeography() {
    this.setState({
      changingGeographyType: undefined,
      changingGeographyId: undefined,
    })
  }

  render() {
    const requestCalledAndNotLoading = !!(this.props.advancedSearchRequest || {}).called && !this.props.loading
    const loadingButDisplayingResults = !!this.props.loading && !this.state.displayingForm
    const loadingButDisplayingForm = this.props.loading && this.state.displayingForm
    return (
      <div className="advanced-search layout-width-wrapper">
        <Helmet>
          <title>DAP Portal | Custom Search</title>
        </Helmet>
        <div className="advanced-search__header">
          {this.props.loading && <SpinnerLoader size={'40px'} />}
          {(requestCalledAndNotLoading || loadingButDisplayingResults) && (
            <Button
              className="advanced-search__toggle-button"
              variant="dark"
              onClick={() => this.setState({ displayingForm: !this.state.displayingForm })}
            >
              {this.state.displayingForm ? 'View Results' : 'Edit Custom Search'}
            </Button>
          )}
          {loadingButDisplayingForm && (
            <Button
              className="advanced-search__toggle-button"
              onClick={() => this.props.dispatch(clearAdvancedSearchRequest())}
              variant="danger"
            >
              Cancel
            </Button>
          )}
        </div>
        <div className="advanced-search--content">
          {!this.state.displayingForm && (
            <div className="advanced-search__results">
              <AdvancedSearchSentenceEditor
                advancedSearch={this.props.advancedSearch}
                changeGeography={this.props.changeGeography}
                dispatch={this.props.dispatch}
                results={this.props.advancedSearch.results}
                loading={this.props.loading}
              />
              <div className="advanced-search__results-header">
                <ButtonToolbar className="d-flex view-toggle__container">
                  <ToggleButtonGroup
                    name="view"
                    type="radio"
                    value={this.state.displayingList}
                    onChange={value => this.setState({ displayingList: value })}
                  >
                    <ToggleButton
                      tabIndex="0"
                      className="view-toggle"
                      variant={this.state.displayingList ? 'light' : 'dark'}
                      value={false}
                    >
                      Map
                    </ToggleButton>
                    <ToggleButton
                      tabIndex="0"
                      className="view-toggle"
                      variant={this.state.displayingList ? 'dark' : 'light'}
                      value={true}
                    >
                      List
                    </ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </div>
              <div className="advanced-search__results-container">
                <div
                  className={classnames('advanced-search__map', {
                    'd-none': this.state.displayingList,
                  })}
                >
                  <LeafletMap
                    key={`${this.state.currentGeographyType}-${this.state.currentGeographyId}-${
                      this.state.displayingList
                    }`}
                    appState={this.props.appState}
                    councilDistricts={this.props.config.councilDistricts}
                    communityDistricts={this.props.config.communityDistricts}
                    stateAssemblies={this.props.config.stateAssemblies}
                    stateSenates={this.props.config.stateSenates}
                    zipCodes={this.props.config.zipCodes}
                    currentGeographyType={this.state.currentGeographyType}
                    dispatch={this.props.dispatch}
                    iconConfig="MULTIPLE"
                    loading={this.props.loading}
                    results={this.props.loading ? [] : this.props.advancedSearch.results}
                    selectGeographyData={this.props.config.selectGeographyData}
                    zoom={this.state.zoom}
                  />
                </div>
                <div
                  className={classnames('advanced-search__table', {
                    'd-none': !this.state.displayingList,
                  })}
                >
                  <BaseTable
                    csvBaseFileName={constructCsvFileName(this.props.advancedSearch)}
                    globalTableState={this.state.tableState}
                    datasetModelName={this.props.advancedSearchRequest.resourceModel.resourceConstant}
                    dispatch={this.props.dispatch}
                    error={this.props.error}
                    errorAction={(this.props.error || {}).status === 504 ? this.retryRequest : null}
                    expandable={false}
                    loading={this.props.loading}
                    recordsSize={this.props.advancedSearch.results.length}
                    records={this.props.loading ? [] : this.props.advancedSearch.results}
                    showUpdate={false}
                    tableConfig={this.props.advancedSearchRequest.tableConfig}
                  />
                </div>
              </div>
            </div>
          )}
          {this.state.displayingForm && (
            <div className="advanced-search-form--container">
              <div className="advanced-search__title">Custom Search</div>

              <ConfigContext.Consumer>
                {config => (
                  <AdvancedSearchForm
                    advancedSearch={this.props.advancedSearch}
                    appState={this.props.appState}
                    changeGeography={this.changeGeography}
                    cancelChangeGeography={this.cancelChangeGeography}
                    handleChangeGeographyType={this.handleChangeGeographyType}
                    changingGeographyType={this.state.changingGeographyType}
                    changingGeographyId={this.state.changingGeographyId}
                    geographyType={this.state.currentGeographyType}
                    geographyId={this.state.currentGeographyId}
                    config={config}
                    dispatch={this.props.dispatch}
                    error={this.props.error}
                    loading={this.props.loading}
                    showPopups={this.state.view === 2}
                  />
                )}
              </ConfigContext.Consumer>
            </div>
          )}
        </div>
      </div>
    )
  }
}

AdvancedSearch.propTypes = {
  advancedSearch: PropTypes.object,
  dispatch: PropTypes.func,
}

const loadingSelector = createLoadingSelector([c.ADVANCED_SEARCH])
const errorSelector = createErrorSelector([c.ADVANCED_SEARCH])
const mapStateToProps = state => {
  return {
    appState: state.appState,
    advancedSearch: state.advancedSearch,
    error: errorSelector(state),
    loading: loadingSelector(state),
    advancedSearchRequest: getSingleRequest(state.appState.requests, c.ADVANCED_SEARCH),
  }
}

export default connect(mapStateToProps)(AdvancedSearch)

import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'shared/constants'

import Geography from 'shared/classes/Geography'

import { getSingleRequest } from 'Store/AppState/selectors'
import { constructCsvFileName } from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'
import { fireAdvancedSearchSubmitEvent } from 'Store/Analytics/actions'

import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { connect } from 'react-redux'
import { Events, animateScroll as scroll, scrollSpy } from 'react-scroll'
import * as advancedSearchReducer from 'Store/AdvancedSearch/reducers'

import { Button, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import LeafletMap from 'LeafletMap'
import BaseTable from 'shared/components/BaseTable'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'
import FormError from 'shared/components/FormError'
import { setSearchTableState } from 'Store/AdvancedSearch/actions'

import { push, createMatchSelector } from 'connected-react-router'
import { parseUrlSearchParams } from "AdvancedSearch/utilities/advancedSearchUtils";

import {
  updateCondition,
  replacePropertyFilter,
  updateGeography,
  forceUpdateSearch,
} from 'Store/AdvancedSearch/actions'
import { clearAdvancedSearchRequest, setAppState, setAdvancedSearchRequest } from 'Store/AppState/actions'

import AdvancedSearchForm from 'AdvancedSearch/AdvancedSearchForm'
import AdvancedSearchSentenceEditor from 'AdvancedSearch/AdvancedSearchSentenceEditor'
import { newAdvancedSearchRequest } from 'shared/utilities/configUtils'

import classnames from 'classnames'

import './style.scss'
export class AdvancedSearch extends React.Component {

  constructor(props) {
    super(props);
    const searchParams = Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    );

    this.state = {
      geographyId: props.geographyId,
      geographyType: props.geographyType,
      lastGeographyId: "",
      lastGeographyType: "",
      displayingForm: !this.props.advancedSearch.results.length,
      advancedSearch: this.cloneAdvancedSearchInstance(this.props.advancedSearch),
      displayingList: false,
      zoom: 13,
      error: null,
      formSubmitted: false,
      searchParams
    }

    if (!this.props.appState.advancedSearch) {
      this.parseSearchParams();
    }

    this.cloneAdvancedSearchInstance = this.cloneAdvancedSearchInstance.bind(this);
    this.loadRequest = this.loadRequest.bind(this);
    this.parseSearchParams = this.parseSearchParams.bind(this);
    this.pageForceUpdate = this.pageForceUpdate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.cancelSearch = this.cancelSearch.bind(this);
  }

  parseSearchParams() { 
    const fromSearchParams = parseUrlSearchParams(this.state.searchParams, this.state.advancedSearch);

    if (this.state.geographyId && this.state.geographyType && fromSearchParams) {
      this.state.advancedSearch.geographies = [new Geography(this.state.geographyType, this.state.geographyId)];
      this.setAdvancedSearchRequestInStore();
    }
    else {
      // If something is wrong, redirect to form
      this.props.dispatch(push("/search"));
    }
  }

  setAdvancedSearchRequestInStore() {
    const newAdvancedSearch = this.cloneAdvancedSearchInstance(this.state.advancedSearch)
    this.props.dispatch(updateGeography(0, newAdvancedSearch.geographies[0].clone()))
    this.props.dispatch(replacePropertyFilter(newAdvancedSearch.propertyFilter.clone()))
    this.props.dispatch(updateCondition('0', newAdvancedSearch.conditions['0'].clone()))

    this.props.dispatch(
      setAdvancedSearchRequest({
        advancedSearchRequest: newAdvancedSearchRequest({
          advancedSearch: newAdvancedSearch,
          resourceModels: this.props.config.resourceModels
        }),
        advancedSearch: newAdvancedSearch,
        geographyType: this.state.geographyType,
        geographyId: this.state.geographyId
      })
    )
    
    this.props.dispatch(fireAdvancedSearchSubmitEvent(this.state.advancedSearch))
    this.pageForceUpdate()
  }

  componentDidUpdate() {
    // Form submitted
    if (this.state.formSubmitted) {
      this.state.formSubmitted = false;
      this.parseSearchParams();
    }

    // if timed out request, clear it
    if (this.props.advancedSearchRequest && (this.props.error || {}).status === 408) {
      this.setState({
        error: this.props.error,
      })
      this.cancelSearch(this.props.error)
    }

    // set state error
    if (!this.state.error && this.props.error) {
      this.setState({
        error: this.props.error,
      })
    } else if (this.state.error && this.state.error.status !== 408 && !this.props.error) {
      this.setState({
        error: null,
      })
    }

    // Request set, make the request
    if (this.props.advancedSearchRequest && !this.props.advancedSearchRequest.called && !this.formSubmitted) {
      this.loadRequest(this.props.advancedSearchRequest);
      this.setState({ displayingForm: false, formSubmitted: false});
    }
  }

  onSubmit() {
    this.pageForceUpdate();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const searchParams = Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    );

    let keysNext = Object.keys(searchParams);
    let keysPrev = Object.keys(prevState.searchParams);    

    if (
      (nextProps.advancedSearch.geographies[0] &&
      nextProps.advancedSearch.geographies[0].geographyType.constant !== prevState.geographyType) ||
      nextProps.geographyId !== prevState.geographyId
    ) {
      return {
        geographyId: nextProps.geographyId,
        geographyType: nextProps.geographyType,
        formSubmitted: true,
        searchParams
      }
    }
    else if (keysNext.length !== keysPrev.length)
    {
      return {
        geographyId: nextProps.geographyId,
        geographyType: nextProps.geographyType,
        formSubmitted: true,
        searchParams
      }
    }
    else {
      for (let key of keysNext) {
        if (searchParams[key] !== prevState.searchParams[key]) {
          return {
            geographyId: nextProps.geographyId,
            geographyType: nextProps.geographyType,
            formSubmitted: true,
            searchParams
          }
        }
      }
    }

    return null;
  }
  
  cloneAdvancedSearchInstance(advancedSearchObject) {
    return {
      geographies: advancedSearchObject.geographies.length
        ? [advancedSearchObject.geographies[0].clone()]
        : advancedSearchObject.geographies,
      propertyFilter: advancedSearchObject.propertyFilter ? advancedSearchObject.propertyFilter.clone() : undefined,
      conditions: {
        '0': advancedSearchObject.conditions['0'].clone(),
      },
    }
  }

  cancelSearch(error = {}) {
    this.setState({
      displayingForm: true,
      error: error || this.props.error,
    })
    this.props.dispatch(clearAdvancedSearchRequest())
  }

  componentDidMount() {
    scrollSpy.update()
    scroll.scrollToTop({
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart',
    })

    // set state error
    if (!this.state.error && this.props.error) {
      this.setState({
        error: this.props.error,
      })
    }
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin')
    Events.scrollEvent.remove('end')
  }

  loadRequest(request) {
    this.props.dispatch(requestWithAuth(makeRequest(request)))
  }

  pageForceUpdate() {
    this.props.dispatch(forceUpdateSearch())
  }

  render() {
    const requestCalledAndNotLoading = !!(this.props.advancedSearchRequest || {}).called && !this.props.loading

    return (
      <div className="advanced-search layout-width-wrapper">
        <div className="advanced-search__content">
          {requestCalledAndNotLoading && (
            <div>
              {!this.state.displayingForm && (
                <FormError show={!!this.state.error} message={(this.state.error || {}).message} />
              )}
              <AdvancedSearchSentenceEditor
                advancedSearch={this.props.advancedSearch}
                changeGeography={this.props.changeGeography}
                dispatch={this.props.dispatch}
                results={this.props.advancedSearch.results}
                loading={this.props.loading}
                toggleForm={() => this.setState({ displayingForm: !this.state.displayingForm })}
                displayingForm={this.state.displayingForm}
                requestCalledAndNotLoading={requestCalledAndNotLoading}
                loadingButDisplayingResults={!!this.props.loading && !this.state.displayingForm}
                loadingButDisplayingForm={this.props.loading && this.state.displayingForm}
              />
            </div>
          )}
          {!this.state.displayingForm && (
            <div className="advanced-search__results">
              <div className="advanced-search__results-header">
                <Button className="advanced-search__cancel" onClick={this.cancelSearch} size="sm">
                  Clear
                </Button>
                <ButtonToolbar className="d-flex view-toggle__container">
                  <ToggleButtonGroup
                    name="view"
                    type="radio"
                    value={this.state.displayingList}
                    onChange={value => this.setState({ displayingList: value })}
                  >
                    <ToggleButton
                      tabIndex="0"
                      size="sm"
                      className="view-toggle"
                      variant={this.state.displayingList ? 'light' : 'dark'}
                      value={false}
                    >
                      Map
                    </ToggleButton>
                    <ToggleButton
                      tabIndex="0"
                      size="sm"
                      className="view-toggle"
                      variant={this.state.displayingList ? 'dark' : 'light'}
                      value={true}
                    >
                      Table
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
                    key={`${(this.props.advancedSearch.geographies[0] || {}).constant}-${
                      (this.props.advancedSearch.geographies[0] || {}).id
                    }-${this.state.displayingList}`}
                    currentGeographyType={(this.props.advancedSearch.geographies[0] || {}).constant}
                    currentGeographyId={(this.props.advancedSearch.geographies[0] || {}).id}
                    councilDistricts={this.props.config.councilDistricts}
                    communityDistricts={this.props.config.communityDistricts}
                    stateAssemblies={this.props.config.stateAssemblies}
                    stateSenates={this.props.config.stateSenates}
                    zipCodes={this.props.config.zipCodes}
                    dispatch={this.props.dispatch}
                    iconConfig="MULTIPLE"
                    loading={this.props.loading}
                    results={this.props.loading ? [] : this.props.advancedSearch.results}
                    selectGeographyData={this.props.config.selectGeographyData}
                    zoom={this.state.zoom}
                    height={'100%'}
                  />
                </div>
                <div
                  className={classnames('advanced-search__table', {
                    'd-none': !this.state.displayingList,
                  })}
                >
                  <BaseTable
                    advancedSearchDatasets={this.props.advancedSearch.conditions['0'].getFilterDatasets()}
                    csvBaseFileName={constructCsvFileName(this.props.advancedSearch)}
                    globalTableState={this.props.advancedSearch.searchTableState}
                    datasetModelName={this.props.advancedSearchRequest.resourceModel.resourceConstant}
                    dispatch={this.props.dispatch}
                    error={this.state.error}
                    errorAction={(this.state.error || {}).status === 504 ? this.retryRequest : null}
                    expandable={false}
                    loading={this.props.loading}
                    recordsSize={this.props.advancedSearch.results.length}
                    records={this.props.loading ? [] : this.props.advancedSearch.results}
                    showUpdate={false}
                    tableConfig={this.props.advancedSearchRequest.tableConfig}
                    setTableState={tableState => this.props.dispatch(setSearchTableState(tableState))}
                  />
                </div>
              </div>
            </div>
          )}
          {this.state.displayingForm && (
            <div className="advanced-search-form--container">
              <AdvancedSearchForm
                key={`logged-in: ${this.props.loggedIn}`}
                advancedSearch={this.props.advancedSearch}
                appState={this.props.appState}
                geographyType={this.props.geographyType}
                geographyId={this.props.geographyId}
                config={this.props.config}
                dispatch={this.props.dispatch}
                error={this.state.error}
                loading={this.props.loading}
                loggedIn={this.props.loggedIn}
                showPopups={this.state.view === 2}
                onSubmit={this.onSubmit}
                cancelChangeGeography={this.cancelChangeGeography}
                forceUpdate={this.pageForceUpdate}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

AdvancedSearch.propTypes = {
  advancedSearch: PropTypes.object,
  config: PropTypes.object,
  dispatch: PropTypes.func,
}

AdvancedSearch.defaultProps = {
  advancedSearch: advancedSearchReducer.initialState(),
}

const mapStateToProps = state => {
  const pathMatch = state.router.location.pathname.match(/(council|community|state-assembly|state-senate|zipcode|borough|city)/)
  const path = pathMatch ? pathMatch[0] : undefined
  const matchSelector = createMatchSelector({
    path: `/search/${path}/:id`,
  })
  const match = matchSelector(state);

  const geographyId = match ? match.params.id : undefined;
  const geographyType = path ? path.toUpperCase().replace('-', '_') : undefined;

  const loadingSelector = createLoadingSelector([c.ADVANCED_SEARCH])
  const errorSelector = createErrorSelector([c.ADVANCED_SEARCH])

  return {
    appState: state.appState,
    advancedSearch: state.advancedSearch,
    loggedIn: !!state.auth.user,
    error: errorSelector(state),
    loading: loadingSelector(state),
    advancedSearchRequest: getSingleRequest(state.appState.requests, c.ADVANCED_SEARCH),
    geographyId,
    geographyType
  }
}

export default connect(mapStateToProps)(AdvancedSearch)

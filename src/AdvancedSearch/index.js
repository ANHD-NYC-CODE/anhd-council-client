import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'shared/constants'
import * as b from 'shared/constants/geographies'

import StandardizedInput from 'shared/classes/StandardizedInput'
import Geography from 'shared/classes/Geography'

import { getSingleRequest } from 'Store/AppState/selectors'
import { constructCsvFileName } from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'
import { fireAdvancedSearchSubmitEvent } from 'Store/Analytics/actions'

import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { connect } from 'react-redux'
import { Events, animateScroll as scroll, scrollSpy } from 'react-scroll'
import * as advancedSearchReducer from 'Store/AdvancedSearch/reducers'
import Helmet from 'react-helmet'
import { Button, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import LeafletMap from 'LeafletMap'
import BaseTable from 'shared/components/BaseTable'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'
import FormError from 'shared/components/FormError'
import { setSearchTableState } from 'Store/AdvancedSearch/actions'

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
    super(props)
    const searchGeography = props.advancedSearch.geographies[0]

    this.state = {
      error: null,
      currentGeographyType: searchGeography ? searchGeography.constant : this.props.appState.currentGeographyType,
      currentGeographyId: searchGeography ? searchGeography.id : this.props.appState.currentGeographyId,
      changingGeographyType: undefined,
      changingGeographyId: undefined,
      displayingForm: !this.props.advancedSearch.results.length,
      displayingList: false,
      zoom: 13,

      advancedSearch: this.cloneAdvancedSearchInstance(this.props.advancedSearch),
    }

    this.cloneAdvancedSearchInstance = this.cloneAdvancedSearchInstance.bind(this)
    this.loadRequest = this.loadRequest.bind(this)
    this.handleChangeGeographyType = this.handleChangeGeographyType.bind(this)
    this.changeGeography = this.changeGeography.bind(this)
    this.cancelChangeGeography = this.cancelChangeGeography.bind(this)
    this.pageForceUpdate = this.pageForceUpdate.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
    this.cancelSearch = this.cancelSearch.bind(this)

    if (this.props.appState.changingGeography) {
      this.props.dispatch(
        setAppState({ changingGeography: false, changingGeographyType: undefined, changingGeographyId: undefined })
      )
    }
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

  componentDidMount() {
    scrollSpy.update()
    scroll.scrollToTop({
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart',
    })

    if (!this.state.advancedSearch.geographies[0] && !!this.props.appState.currentGeographyId) {
      this.changeGeography({
        geographyType: this.props.appState.currentGeographyType,
        geographyId: this.props.appState.currentGeographyId,
      })
    }

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

  componentDidUpdate() {
    if (this.props.advancedSearchRequest && !this.props.advancedSearchRequest.called) {
      this.loadRequest(this.props.advancedSearchRequest)
      this.setState({ displayingForm: false })
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

    // if no advancedSearch.propertyFilter was on mount, this component probably hasn't caught up with the store
    // so sync it to store.
    if (!this.state.advancedSearch.propertyFilter) {
      this.syncWithProps()
    }
  }

  syncWithProps() {
    this.setState({
      advancedSearch: this.props.advancedSearch,
    })
  }

  loadRequest(request) {
    this.props.dispatch(requestWithAuth(makeRequest(request)))
  }

  handleChangeGeographyType(e) {
    e = new StandardizedInput(e)
    const type = e.value
    if (type === b.CITY_GEOGRAPHY.constant) {
      // do full update
      const newAdvancedSearch = { ...this.state.advancedSearch }

      if (!this.state.advancedSearch.geographies.length) {
        const newGeography = new Geography(type)

        newAdvancedSearch.geographies = [...newAdvancedSearch.geographies, newGeography]
      } else {
        newAdvancedSearch.geographies[0].constant = type
      }

      this.setState({
        currentGeographyType: type,
        currentGeographyId: -1,
        changingGeographyType: null,
        changingGeographyId: null,
        advancedSearch: newAdvancedSearch,
      })
    } else {
      // only change state
      this.setState({
        changingGeographyType: type,
        changingGeographyId: -1,
      })
    }
  }

  changeGeography({ e, geographyType, geographyId } = {}) {
    e = new StandardizedInput(e)
    const newAdvancedSearch = { ...this.state.advancedSearch }
    const type = geographyType || this.state.changingGeographyType || this.state.currentGeographyType
    const id = geographyId || e.value

    if (!this.state.advancedSearch.geographies.length) {
      const newGeography = new Geography(type, id)

      newAdvancedSearch.geographies = [...newAdvancedSearch.geographies, newGeography]
    } else {
      newAdvancedSearch.geographies[0].constant = type
      newAdvancedSearch.geographies[0].id = id
    }

    this.setState({
      currentGeographyType: type,
      currentGeographyId: id,
      advancedSearch: newAdvancedSearch,
    })

    // Change global geography unless it's the borough one
    // if (!this.props.appState.currentGeographyId && type !== b.BOROUGH_GEOGRAPHY.constant) {
    //   this.props.dispatch(
    //     setGeographyAndRequestsAndRedirect({
    //       geographyType: type,
    //       geographyId: id,
    //       redirect: false,
    //       requests: this.props.config.createMapRequests(type, id),
    //     })
    //   )
    // }
    this.cancelChangeGeography()
  }

  cancelChangeGeography() {
    this.setState({
      changingGeographyType: undefined,
      changingGeographyId: undefined,
    })
  }

  pageForceUpdate() {
    this.props.dispatch(forceUpdateSearch())
  }

  cancelSearch(error = {}) {
    this.setState({
      displayingForm: true,
      error: error || this.props.error,
    })
    this.props.dispatch(clearAdvancedSearchRequest())
  }

  submitSearch() {
    this.setState({
      error: null,
    })
    this.props.dispatch(fireAdvancedSearchSubmitEvent(this.state.advancedSearch))

    const newAdvancedSearch = this.cloneAdvancedSearchInstance(this.state.advancedSearch)
    this.props.dispatch(updateGeography(0, newAdvancedSearch.geographies[0].clone()))
    this.props.dispatch(replacePropertyFilter(newAdvancedSearch.propertyFilter.clone()))
    this.props.dispatch(updateCondition('0', newAdvancedSearch.conditions['0'].clone()))

    this.props.dispatch(
      setAdvancedSearchRequest({
        advancedSearchRequest: newAdvancedSearchRequest({
          advancedSearch: newAdvancedSearch,
          resourceModels: this.props.config.resourceModels,
        }),
      })
    )

    this.pageForceUpdate()
  }

  render() {
    const requestCalledAndNotLoading = !!(this.props.advancedSearchRequest || {}).called && !this.props.loading

    return (
      <div className="advanced-search layout-width-wrapper">
        <Helmet>
          <title>DAP Portal | Custom Search</title>
        </Helmet>
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
                advancedSearch={this.state.advancedSearch}
                appState={this.props.appState}
                changingGeographyType={this.state.changingGeographyType}
                changingGeographyId={this.state.changingGeographyId}
                currentGeographyType={this.state.currentGeographyType}
                currentGeographyId={this.state.currentGeographyId}
                geographyType={this.state.currentGeographyType}
                geographyId={this.state.currentGeographyId}
                config={this.props.config}
                dispatch={this.props.dispatch}
                error={this.state.error}
                loading={this.props.loading}
                loggedIn={this.props.loggedIn}
                showPopups={this.state.view === 2}
                changeGeography={this.changeGeography}
                handleChangeGeographyType={this.handleChangeGeographyType}
                cancelChangeGeography={this.cancelChangeGeography}
                forceUpdate={this.pageForceUpdate}
                onSubmit={this.submitSearch}
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

const loadingSelector = createLoadingSelector([c.ADVANCED_SEARCH])
const errorSelector = createErrorSelector([c.ADVANCED_SEARCH])
const mapStateToProps = state => {
  return {
    appState: state.appState,
    advancedSearch: state.advancedSearch,
    loggedIn: !!state.auth.user,
    error: errorSelector(state),
    loading: loadingSelector(state),
    advancedSearchRequest: getSingleRequest(state.appState.requests, c.ADVANCED_SEARCH),
  }
}

export default connect(mapStateToProps)(AdvancedSearch)

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as c from 'shared/constants'

import { createErrorSelector } from 'Store/Error/selectors'
import { createLoadingSelector } from 'Store/Loading/selectors'

import { GET_DATASETS } from 'Store/Dataset/constants'
import { GET_COUNCILS } from 'Store/Council/constants'
import { GET_COMMUNITIES } from 'Store/Community/constants'
import ConfigContext from 'Config/ConfigContext'
import { getDatasets } from 'Store/Dataset/actions'
import { getCouncils } from 'Store/Council/actions'
import { getCommunities } from 'Store/Community/actions'
import { infoModals } from 'shared/modals/modalsCopy'
import ConfigLoader from 'shared/components/Loaders/ConfigLoader'
import PageError from 'shared/components/PageError'
import Filter from 'shared/classes/Filter'
import { setAppState, removeRequestType } from 'Store/AppState/actions'
import { loadResultFilters } from 'Store/DashboardState/actions'

import {
  newMapRequests,
  newMapResultFilters,
  newLookupRequests,
  newAdvancedSearchRequest,
} from 'shared/utilities/configUtils'
import { setupResourceModels } from 'shared/utilities/configUtils'
import { createAdvancedSearchFilters } from 'shared/utilities/filterUtils'
import { resetAdvancedSearchReducer, replacePropertyFilter } from 'Store/AdvancedSearch/actions'
class Config extends React.PureComponent {
  constructor(props) {
    super(props)
    if (!props.datasets.length) {
      this.props.dispatch(getDatasets())
    }
    if (!props.councilDistricts.length) {
      this.props.dispatch(getCouncils())
    }

    if (!props.communityDistricts.length) {
      this.props.dispatch(getCommunities())
    }

    this.selectGeographyData = this.selectGeographyData.bind(this)
    this.createMapRequests = this.createMapRequests.bind(this)
    this.createMapResultFilters = this.createMapResultFilters
    this.createLookupRequests = this.createLookupRequests.bind(this)
    this.createAdvancedSearchRequest = this.createAdvancedSearchRequest.bind(this)
    this.clearAdvancedSearch = this.clearAdvancedSearch.bind(this)
    this.newPropertyFilter = this.newPropertyFilter.bind(this)
    this.state = {
      geographyType: undefined,
      geographyId: undefined,
      geographyObjects: [],
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (!nextProps.error && !nextProps.loading && !nextProps.error) {
      if (!nextProps.datasets.length) {
        this.props.dispatch(getDatasets())
      }

      if (!nextProps.error && !nextProps.councilDistricts.length) {
        this.props.dispatch(getCouncils())
      }
      if (!nextProps.error && !nextProps.communityDistricts.length) {
        this.props.dispatch(getCommunities())
      }
    }

    if (nextState.geographyType === 'council') {
      this.setState({
        geographyObjects: this.props.councilDistricts,
      })
    } else if (nextState.geographyType === 'cd') {
      this.setState({
        geographyObjects: this.props.communityDistricts,
      })
    }
  }

  componentDidUpdate() {
    if (!this.props.advancedSearch.propertyFilter && !!Object.keys(this.props.resourceModels).length) {
      this.props.dispatch(replacePropertyFilter(this.newPropertyFilter()))
    }
    if (!this.props.appStateResultFilters.length && !!Object.keys(this.props.resourceModels).length) {
      const mapAmountResultFilters = this.createMapResultFilters()

      this.props.dispatch(
        loadResultFilters([...this.props.resourceModels['PROPERTY'].ownResultFilters, ...mapAmountResultFilters])
      )
    }
  }

  newPropertyFilter() {
    return new Filter({
      resourceModel: this.props.resourceModels['PROPERTY'],
      schema: this.props.resourceModels['PROPERTY'].ownResourceFilters,
    })
  }

  clearAdvancedSearch() {
    this.props.dispatch(setAppState({ districtShowCustomView: false }))
    this.props.dispatch(removeRequestType(c.ADVANCED_SEARCH))
    this.props.dispatch(resetAdvancedSearchReducer(this.newPropertyFilter()))
  }

  selectGeographyData(type) {
    switch (type) {
      case 'COUNCIL':
        return this.props.councilDistricts
      case 'COMMUNITY':
        return this.props.communityDistricts
    }
  }

  createMapRequests(geographyType, geographyId) {
    return newMapRequests({ geographyType, geographyId, resourceModels: this.props.resourceModels })
  }

  createMapResultFilters() {
    return newMapResultFilters({ resourceModels: this.props.resourceModels })
  }

  createLookupRequests(bbl, bin) {
    return newLookupRequests({ bbl, bin, resourceModels: this.props.resourceModels })
  }

  createAdvancedSearchRequest(geographyType, geographyId, advancedSearch) {
    return newAdvancedSearchRequest({
      geographyType,
      geographyId,
      advancedSearch,
      resourceModels: this.props.resourceModels,
    })
  }

  render() {
    return this.props.error ? (
      <PageError title="Oops, an error occured" message="Sorry, we couldn't load the page." />
    ) : (
      <ConfigContext.Provider
        value={{
          clearAdvancedSearch: this.clearAdvancedSearch,
          createMapRequests: this.createMapRequests,
          createLookupRequests: this.createLookupRequests,
          createAdvancedSearchRequest: this.createAdvancedSearchRequest,
          datasets: this.props.datasets,
          resourceModels: this.props.resourceModels,
          communityDistricts: this.props.communityDistricts,
          councilDistricts: this.props.councilDistricts,
          selectGeographyData: this.selectGeographyData,
          infoModals: infoModals,
          advancedSearchFilters: createAdvancedSearchFilters({
            resourceModels: this.props.resourceModels,
          }),
        }}
      >
        {this.props.loading ||
        !(
          !!this.props.datasets.length &&
          !!this.props.councilDistricts.length &&
          !!this.props.communityDistricts.length
        ) ? (
          <ConfigLoader monitoredRequests={[GET_DATASETS, GET_COUNCILS, GET_COMMUNITIES]} />
        ) : (
          this.props.children
        )}
      </ConfigContext.Provider>
    )
  }
}

Config.propTypes = {
  datasets: PropTypes.array,
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
}

const errorSelector = createErrorSelector([GET_DATASETS, GET_COUNCILS, GET_COMMUNITIES])
const loadingSelector = createLoadingSelector([GET_DATASETS, GET_COUNCILS, GET_COMMUNITIES])

const mapStateToProps = state => {
  return {
    advancedSearch: state.advancedSearch,
    appStateResultFilters: state.dashboardState.resultFilters,
    datasets: state.dataset.datasets,
    resourceModels: setupResourceModels(state.dataset.datasets),
    councilDistricts: state.council.districts,
    communityDistricts: state.community.boards,
    error: errorSelector(state),
    loading: loadingSelector(state),
  }
}

export default connect(mapStateToProps)(Config)

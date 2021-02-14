import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as c from 'shared/constants'

import { createErrorSelector } from 'Store/Error/selectors'
import { createLoadingSelector } from 'Store/Loading/selectors'

import ConfigContext from 'Config/ConfigContext'
import { getDatasets } from 'Store/Dataset/actions'
import { getCouncils } from 'Store/Council/actions'
import { getCommunities } from 'Store/Community/actions'
import { getStateAssemblies } from 'Store/StateAssembly/actions'
import { getStateSenates } from 'Store/StateSenate/actions'
import { getZipCodes } from 'Store/ZipCode/actions'
import { infoModals } from 'shared/modals/modalsCopy'
import ConfigLoader from 'shared/components/Loaders/ConfigLoader'
import PageError from 'shared/components/PageError'
import Filter from 'shared/classes/Filter'
import { removeRequestType } from 'Store/AppState/actions'
import { loadResultFilters, setDashboardCustomView } from 'Store/DashboardState/actions'

import { newMapRequests, newMapResultFilters, newLookupRequests } from 'shared/utilities/configUtils'
import { setupResourceModels } from 'shared/utilities/configUtils'
import { createAdvancedSearchFilters } from 'shared/utilities/filterUtils'
import { resetAdvancedSearchReducer, replacePropertyFilter } from 'Store/AdvancedSearch/actions'

class Config extends React.PureComponent {
  static get MonitoredRequests() {
    return [
      c.GET_DATASETS,
      c.GET_COUNCILS,
      c.GET_COMMUNITIES,
      c.GET_STATE_ASSEMBLIES,
      c.GET_STATE_SENATES,
      c.GET_ZIPCODES,
    ]
  }

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

    if (!props.stateAssemblies.length) {
      this.props.dispatch(getStateAssemblies())
    }

    if (!props.stateSenates.length) {
      this.props.dispatch(getStateSenates())
    }

    if (!props.zipCodes.length) {
      this.props.dispatch(getZipCodes())
    }

    this.selectGeographyData = this.selectGeographyData.bind(this)
    this.createMapRequests = this.createMapRequests.bind(this)
    this.createMapResultFilters = this.createMapResultFilters
    this.createLookupRequests = this.createLookupRequests.bind(this)
    this.clearAdvancedSearch = this.clearAdvancedSearch.bind(this)
    this.newPropertyFilter = this.newPropertyFilter.bind(this)
    this.state = {
      geographyType: undefined,
      geographyId: undefined,
      geographyObjects: [],
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (!nextProps.error && !nextProps.loading) {
      if (!nextProps.datasets.length) {
        this.props.dispatch(getDatasets())
      }

      if (!nextProps.councilDistricts.length) {
        this.props.dispatch(getCouncils())
      }
      if (!nextProps.communityDistricts.length) {
        this.props.dispatch(getCommunities())
      }
      if (!nextProps.stateAssemblies.length) {
        this.props.dispatch(getStateAssemblies())
      }
      if (!nextProps.stateSenates.length) {
        this.props.dispatch(getStateSenates())
      }
      if (!nextProps.zipCodes.length) {
        this.props.dispatch(getZipCodes())
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

  componentDidMount() {
    this.ensureAdvancedSearchFilter()
    this.ensureResultFilters()
  }

  componentDidUpdate() {
    this.ensureAdvancedSearchFilter()
    this.ensureResultFilters()
  }

  ensureAdvancedSearchFilter() {
    if (!this.props.advancedSearch.propertyFilter && !!Object.keys(this.props.resourceModels).length) {
      this.props.dispatch(replacePropertyFilter(this.newPropertyFilter()))
    }
  }

  ensureResultFilters() {
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
    this.props.dispatch(setDashboardCustomView(false))
    this.props.dispatch(removeRequestType(c.ADVANCED_SEARCH))
    this.props.dispatch(resetAdvancedSearchReducer(this.newPropertyFilter()))
  }

  selectGeographyData(type) {
    switch (type) {
      case 'COUNCIL':
        return this.props.councilDistricts
      case 'COMMUNITY':
        return this.props.communityDistricts
      case 'STATE_ASSEMBLY':
        return this.props.stateAssemblies
      case 'STATE_SENATE':
        return this.props.stateSenates
      case 'ZIPCODE':
        return this.props.zipCodes
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

  render() {
    return this.props.error ? (
      <PageError title="Oops, an error occured" message="Sorry, we couldn't load the page." />
    ) : (
      <ConfigContext.Provider
        value={{
          clearAdvancedSearch: this.clearAdvancedSearch,
          createMapRequests: this.createMapRequests,
          createLookupRequests: this.createLookupRequests,
          datasets: this.props.datasets,
          resourceModels: this.props.resourceModels,
          communityDistricts: this.props.communityDistricts,
          councilDistricts: this.props.councilDistricts,
          stateAssemblies: this.props.stateAssemblies,
          stateSenates: this.props.stateSenates,
          zipCodes: this.props.zipCodes,
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
          !!this.props.communityDistricts.length &&
          !!this.props.stateAssemblies.length &&
          !!this.props.stateSenates.length &&
          !!this.props.zipCodes.length
        ) ? (
          <ConfigLoader monitoredRequests={Config.MonitoredRequests} />
        ) : (
          this.props.children
        )}
      </ConfigContext.Provider>
    )
  }
}

Config.defaultProps = {
  datasets: [],
  councils: [],
  communities: [],
  stateassemblies: [],
  statesenates: [],
  zipcodes: [],
}

Config.propTypes = {
  datasets: PropTypes.array,
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
  councils: PropTypes.array,
  communities: PropTypes.array,
  stateAssemblies: PropTypes.array,
  stateSenates: PropTypes.array,
  zipCodes: PropTypes.array,
}

const errorSelector = createErrorSelector(Config.MonitoredRequests)
const loadingSelector = createLoadingSelector(Config.MonitoredRequests)

const mapStateToProps = state => {
  return {
    advancedSearch: state.advancedSearch,
    appStateResultFilters: state.dashboardState.resultFilters,
    datasets: state.dataset.datasets,
    resourceModels: setupResourceModels(state.dataset.datasets),
    councilDistricts: state.council.districts,
    communityDistricts: state.community.districts,
    stateAssemblies: state.stateAssembly.districts,
    stateSenates: state.stateSenate.districts,
    zipCodes: state.zipCode.districts,
    error: errorSelector(state),
    loading: loadingSelector(state),
  }
}

export default connect(mapStateToProps)(Config)

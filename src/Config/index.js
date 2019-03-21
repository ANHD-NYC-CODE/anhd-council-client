import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createErrorSelector } from 'Store/Error/selectors'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { GET_DATASETS } from 'Store/Dataset/constants'
import { GET_COUNCILS } from 'Store/Council/constants'
import { GET_COMMUNITIES } from 'Store/Community/constants'
import ConfigContext from 'Config/ConfigContext'
import { getDatasets } from 'Store/Dataset/actions'
import { getCouncils } from 'Store/Council/actions'
import { getCommunities } from 'Store/Community/actions'
import Loading from 'shared/components/Loading'
import PageError from 'shared/components/PageError'

class Config extends React.Component {
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
  selectGeographyData(type) {
    switch (type) {
      case 'COUNCIL':
        return this.props.councilDistricts
      case 'COMMUNITY':
        return this.props.communityDistricts
    }
  }

  render() {
    return this.props.error ? (
      <PageError title="Oops, an error occured" message="Sorry, we couldn't load the page." />
    ) : (
      <ConfigContext.Provider
        value={{
          datasets: this.props.datasets,
          datasetModels: this.props.datasetModels,
          housingTypeModels: this.props.housingTypeModels,
          communityDistricts: this.props.communityDistricts,
          councilDistricts: this.props.councilDistricts,
          selectGeographyData: this.selectGeographyData,
        }}
      >
        {this.props.loading ||
        !(
          !!this.props.datasets.length &&
          !!this.props.councilDistricts.length &&
          !!this.props.communityDistricts.length
        ) ? (
          <Loading monitoredRequests={[GET_DATASETS, GET_COUNCILS, GET_COMMUNITIES]} />
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
    datasets: state.dataset.datasets,
    datasetModels: state.dataset.datasetModels,
    housingTypeModels: state.dataset.housingTypeModels,
    councilDistricts: state.council.districts,
    communityDistricts: state.community.boards,
    error: errorSelector(state),
    loading: loadingSelector(state),
  }
}

export default connect(mapStateToProps)(Config)

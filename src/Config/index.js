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
class Config extends React.Component {
  constructor(props) {
    super(props)

    this.props.dispatch(getDatasets())
    if (!props.councils.length) {
      this.props.dispatch(getCouncils())
    }

    if (!props.communities.length) {
      this.props.dispatch(getCommunities())
    }

    this.state = {
      boundaryType: undefined,
      boundaryId: undefined,
      boundaryObjects: [],
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (!nextProps.loading && !nextProps.error) {
      if (!nextProps.datasets.length) {
        this.props.dispatch(getDatasets())
      }

      if (!nextProps.councils.length) {
        this.props.dispatch(getCouncils())
      }
      if (!nextProps.communities.length) {
        this.props.dispatch(getCommunities())
      }
    }

    if (nextState.boundaryType === 'council') {
      this.setState({
        boundaryObjects: this.props.councils,
      })
    } else if (nextState.boundaryType === 'cd') {
      this.setState({
        boundaryObjects: this.props.communities,
      })
    }
  }

  render() {
    console.log(
      this.props.loading ||
        !(!!this.props.datasets.length && !!this.props.councils.length && !!this.props.communities.length)
    )
    return (
      <ConfigContext.Provider
        value={{
          datasets: this.props.datasets,
          datasetModels: this.props.datasetModels,
          housingTypeModels: this.props.housingTypeModels,
        }}
      >
        {this.props.loading ||
        !(!!this.props.datasets.length && !!this.props.councils.length && !!this.props.communities.length) ? (
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
    councils: state.council.districts,
    communities: state.community.boards,
    error: errorSelector(state),
    loading: loadingSelector(state),
  }
}

export default connect(mapStateToProps)(Config)

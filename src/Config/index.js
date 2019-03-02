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

class Config extends React.Component {
  constructor(props) {
    super(props)

    // Refresh the access token on app load
    this.props.dispatch(getDatasets())
    this.props.dispatch(getCouncils())
    this.props.dispatch(getCommunities())
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && !nextProps.error) {
      if (!nextProps.datasets) {
        this.props.dispatch(getDatasets())
      }

      if (!nextProps.councils) {
        this.props.dispatch(getCouncils())
      }

      if (!nextProps.communities) {
        this.props.dispatch(getCommunities())
      }
    }
  }

  render() {
    return (
      <ConfigContext.Provider value={this.props.datasets}>
        {this.props.loading || !(this.props.datasets && this.props.councils && this.props.communities) ? (
          <div>loading!</div>
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
    councils: state.council.districts,
    communities: state.community.boards,
    error: errorSelector(state),
    loading: loadingSelector(state),
  }
}

export default connect(mapStateToProps)(Config)

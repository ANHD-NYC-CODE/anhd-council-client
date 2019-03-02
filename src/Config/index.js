import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createErrorSelector } from 'Store/Error/selectors'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { GET_DATASETS } from 'Store/Dataset/constants'
import ConfigContext from 'Config/ConfigContext'
import { getDatasets } from 'Store/Dataset/actions'

class Config extends React.Component {
  constructor(props) {
    super(props)

    // Refresh the access token on app load
    this.props.dispatch(getDatasets())
  }

  componentWillReceiveProps(nextProps) {
    if (!(nextProps.datasets || nextProps.loading)) {
      this.props.dispatch(getDatasets())
    }
  }

  render() {
    return (
      <ConfigContext.Provider value={this.props.datasets}>
        {this.props.loading ? <div>loading!</div> : this.props.children}
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

const errorSelector = createErrorSelector([GET_DATASETS])
const loadingSelector = createLoadingSelector([GET_DATASETS])

const mapStateToProps = state => {
  return {
    datasets: state.dataset.datasets,
    error: errorSelector(state),
    loading: loadingSelector(state),
  }
}

export default connect(mapStateToProps)(Config)

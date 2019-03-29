import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'

class RequestTableWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.retryRequest = this.retryRequest.bind(this)
    this.processError = this.processError.bind(this)
  }

  processError(error) {
    if ((error || {}).status === 408) {
      error.message = 'The request exceeded 2 minutes and timed out. Trying again may yield a result.'
    }
    return error
  }

  retryRequest() {
    this.props.request.called = false
    this.props.dispatch(requestWithAuth(makeRequest(this.props.request)))
  }

  render() {
    const TableComponent = this.props.request.tableConfig.component
    return this.props.visible ? (
      <div className="request-wrapper">
        <TableComponent
          caption={this.props.selectedResultsFilter.label || this.props.request.label}
          datasetModelName={this.props.request.tableConfig.datasetModelName}
          dispatch={this.props.dispatch}
          error={this.processError(this.props.error)}
          errorAction={(this.props.error || {}).status === 504 ? this.retryRequest : null}
          loading={this.props.loading}
          records={
            this.props.selectedResultsFilter.internalFilter(
              this.props.results,
              this.props.selectedResultsFilter.paramMaps
            ) ||
            this.props.results ||
            []
          }
          request={this.props.request}
          tableConfig={this.props.request.tableConfig}
        />
      </div>
    ) : null
  }
}

RequestTableWrapper.defaultProps = {
  results: [],
  selectedResultsFilter: {
    internalFilter: results => results,
    paramMaps: [],
  },
  visible: false,
}

RequestTableWrapper.propTypes = {
  dispatch: PropTypes.func,
  request: PropTypes.object,
  visible: PropTypes.bool,
}

const mapStateToProps = (state, ownProps) => {
  const loadingSelector = createLoadingSelector([ownProps.request.requestConstant])
  const errorSelector = createErrorSelector([ownProps.request.requestConstant])

  return {
    loading: loadingSelector(state),
    error: errorSelector(state),
    results: state.requests[ownProps.request.requestConstant],
  }
}

export default connect(mapStateToProps)(RequestTableWrapper)

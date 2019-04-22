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
          caption={this.props.caption}
          datasetModelName={this.props.request.tableConfig.datasetModelName}
          dispatch={this.props.dispatch}
          error={this.props.error}
          errorAction={(this.props.error || {}).status === 504 ? this.retryRequest : null}
          expandable={this.props.expandable}
          loading={this.props.loading}
          records={
            this.props.housingTypeResultFilter.internalFilter(
              this.props.results,
              this.props.housingTypeResultFilter.paramMaps
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
  housingTypeResultFilter: {
    internalFilter: results => results,
    paramMaps: [],
  },
  visible: false,
}

RequestTableWrapper.propTypes = {
  caption: PropTypes.string,
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

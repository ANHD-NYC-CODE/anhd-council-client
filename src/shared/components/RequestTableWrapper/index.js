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

    this.constructBaseCsvFileName = this.constructBaseCsvFileName.bind(this)
    this.renderSpecificResults = this.renderSpecificResults.bind(this)
  }

  retryRequest() {
    this.props.request.called = false
    this.props.dispatch(requestWithAuth(makeRequest(this.props.request)))
  }

  constructBaseCsvFileName() {
    // TODO: add date, dataset filters
    // The base name before additional filters added
    let resourceWithId = this.props.request.apiMaps.find(map => map.resourceId)
    let resourceWithIdLabel
    if (resourceWithId) {
      resourceWithIdLabel = `${resourceWithId.constant.toLowerCase()}=${resourceWithId.resourceId}`
    }
    return `${this.props.request.resourceModel.label}${'-' + resourceWithIdLabel}`
  }

  renderSpecificResults(results) {
    switch (this.props.request.resourceModel.resourceConstant) {
      case 'HPD_COMPLAINT':
        return [].concat(
          ...results.map(complaint =>
            complaint.hpdproblems.map(problem => {
              problem.receiveddate = complaint.receiveddate
              problem.apartment = complaint.apartment
              return problem
            })
          )
        )
      default:
        return results
    }
  }

  render() {
    const TableComponent = this.props.request.tableConfig.component
    return this.props.visible ? (
      <div className="request-wrapper">
        <TableComponent
          property={this.props.property}
          caption={this.props.caption}
          classes={this.props.classes}
          csvBaseFileName={this.constructBaseCsvFileName()}
          datasetModelName={this.props.request.resourceModel.label}
          dispatch={this.props.dispatch}
          error={this.props.error}
          errorAction={(this.props.error || {}).status === 504 ? this.retryRequest : null}
          expandable={this.props.expandable}
          loading={this.props.loading}
          records={
            this.props.housingTypeResultFilter.internalFilter(
              this.renderSpecificResults(this.props.results),
              this.props.housingTypeResultFilter.paramMaps
            ) ||
            this.renderSpecificResults(this.props.results) ||
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
  classes: PropTypes.string,
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

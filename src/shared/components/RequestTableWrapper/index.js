import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'
import { constantToModelName } from 'shared/utilities/filterUtils'

class RequestTableWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.retryRequest = this.retryRequest.bind(this)

    this.constructBaseCsvFileName = this.constructBaseCsvFileName.bind(this)
    this.renderSpecificResults = this.renderSpecificResults.bind(this)
    this.getTableSize = this.getTableSize.bind(this)
    this.getRecords = this.getRecords.bind(this)
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

  getRecords() {
    return (
      this.props.housingTypeResultFilter.internalFilter(
        this.renderSpecificResults(this.props.results),
        this.props.housingTypeResultFilter.paramMaps
      ) ||
      this.renderSpecificResults(this.props.results) ||
      []
    )
  }
  getTableSize(results) {
    return results.length
  }

  renderSpecificResults(results) {
    if (this.props.request.resourceModel.tableResultsConstructor) {
      return this.props.request.resourceModel.tableResultsConstructor(results)
    } else {
      return results
    }
  }

  // TODO - Create new table for HPD Complaints / Problems from BaseTable
  // TODO - utilize TableComponent with this new table
  render() {
    const records = this.getRecords()
    const TableComponent = this.props.request.tableConfig.component
    return this.props.visible ? (
      <div className="request-wrapper">
        <TableComponent
          badge={this.props.badge}
          property={this.props.property}
          caption={this.props.caption}
          classes={this.props.classes}
          csvBaseFileName={this.constructBaseCsvFileName()}
          datasetModelName={constantToModelName(this.props.request.resourceModel.resourceConstant)}
          dispatch={this.props.dispatch}
          error={this.props.error}
          errorAction={(this.props.error || {}).status === 504 ? this.retryRequest : null}
          expandable={this.props.expandable}
          loading={this.props.loading}
          showUpdate={this.props.showUpdate}
          recordsSize={this.getTableSize(this.props.results)}
          records={records}
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

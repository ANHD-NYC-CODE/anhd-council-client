import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import InfoModalButton from 'shared/components/InfoModalButton'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'
import RequestErrorCard from 'shared/components/RequestErrorCard'

import { Col, Row } from 'react-bootstrap'
class RequestSummaryWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.retryRequest = this.retryRequest.bind(this)
  }

  handleClick() {
    if (this.props.onClick) this.props.onClick()
  }

  getInfoKey() {
    switch (this.props.request.type) {
      case 'GEOGRAPHY_HOUSING_TYPE':
        return this.props.request.requestConstant
      case 'MAP_FILTER':
        return this.props.request.resourceModel.resourceConstant
      case 'LOOKUP_FILTER':
        return this.props.request.resourceModel.resourceConstant
      default:
        return (this.props.request.paramMaps[0] || {}).resourceConstant
    }
  }

  retryRequest() {
    this.props.request.called = false
    this.props.dispatch(requestWithAuth(makeRequest(this.props.request)))
  }

  render() {
    const results = this.props.resultsFilter.internalFilter(this.props.results, this.props.resultsFilter.paramMaps)

    const totalResults = this.props.totalResultsFilter.internalFilter(
      this.props.results,
      this.props.totalResultsFilter.paramMaps
    )

    return (
      <Row className="request-summary">
        <Col className="pr-md-0" xs={this.props.print ? 12 : 10} md={this.props.print ? 12 : 11}>
          {this.props.error ? (
            <RequestErrorCard
              error={this.props.error}
              errorAction={this.retryRequest}
              requestLabel={this.props.label}
            />
          ) : (
            this.props.resultsComponent({
              summaryBackgroundColorClass: this.props.request.resourceModel.summaryBackgroundColorClass,
              summaryTextColorClass: this.props.request.resourceModel.summaryTextColorClass,
              error: this.props.error,
              errorAction: this.retryRequest,
              label: this.props.label,
              handleClick: this.handleClick,
              selected: this.props.selected,
              unitsLabel: this.props.unitsLabel,
              request: this.props.request,
              resultsFilter: this.props.resultsFilter,
              results: results,
              totalResults: totalResults,
              loading: this.props.loading,
            })
          )}
        </Col>
        {!this.props.print && (
          <Col xs={2} md={1} className="px-1">
            <InfoModalButton modalConstant={this.props.infoKey || this.getInfoKey()} />
          </Col>
        )}
      </Row>
    )
  }
}

RequestSummaryWrapper.defaultProps = {
  loading: false,
  error: undefined,
  results: [],
  print: false,
  resultsFilter: {
    internalFilter: results => results,
    paramMaps: [],
  },
  totalResultsFilter: {
    internalFilter: results => results,
    paramMaps: [],
  },
}

RequestSummaryWrapper.propTypes = {
  filter: PropTypes.func,
  onClick: PropTypes.func,
  resultsComponent: PropTypes.func,
  resultsFilter: PropTypes.object,
  totalResultsFilter: PropTypes.object,
  request: PropTypes.object,
  print: PropTypes.bool,
}

export const mapStateToProps = (state, ownProps) => {
  const loadingSelector = createLoadingSelector([ownProps.request.requestConstant])
  const errorSelector = createErrorSelector([ownProps.request.requestConstant])

  return {
    loading: loadingSelector(state),
    error: errorSelector(state),
    results: state.requests[ownProps.request.requestConstant],
    totalResults: state.requests[(ownProps.totalRequest || {}).requestConstant],
  }
}

export default connect(mapStateToProps)(RequestSummaryWrapper)

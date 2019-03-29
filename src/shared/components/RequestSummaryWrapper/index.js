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
    if (this.props.onClick) this.props.onClick(this.props.request)
  }

  getInfoKey() {
    switch (this.props.request.type) {
      case 'GEOGRAPHY_HOUSING_TYPE':
        return this.props.request.requestConstant
      case 'LOOKUP_FILTER':
        return this.props.request.apiMaps[1].constant
      default:
        return this.props.request.paramMaps[0].resourceConstant
    }
  }

  retryRequest() {
    this.props.request.called = false
    this.props.dispatch(requestWithAuth(makeRequest(this.props.request)))
  }

  render() {
    return (
      <Row className="request-summary">
        <Col className="pr-md-0" xs={10} md={11}>
          {this.props.error ? (
            <RequestErrorCard
              error={this.props.error}
              errorAction={this.retryRequest}
              requestLabel={this.props.request.label}
            />
          ) : (
            this.props.resultsComponent({
              selected: this.props.selected,
              request: this.props.request,
              results: this.props.results,
              totalResults: this.props.totalResults,
              loading: this.props.loading,
              error: this.props.error,
              errorAction: this.retryRequest,
              handleClick: this.handleClick,
            })
          )}
        </Col>
        {!this.props.print && (
          <Col xs={2} md={1} className="px-1">
            <InfoModalButton modalConstant={this.getInfoKey()} />
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
}

RequestSummaryWrapper.propTypes = {
  onClick: PropTypes.func,
  resultsComponent: PropTypes.func,
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

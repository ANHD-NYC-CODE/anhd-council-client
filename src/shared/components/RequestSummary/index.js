import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import InfoModalButton from 'shared/components/InfoModalButton'
import { Col, Row } from 'react-bootstrap'
class RequestSummary extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.request)
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

  render() {
    return (
      <Row className="request-summary">
        <Col className="pr-0" xs={11}>
          {this.props.resultsComponent({
            selected: this.props.selected,
            request: this.props.request,
            results: this.props.results,
            loading: this.props.loading,
            error: this.props.error,
            handleClick: this.handleClick,
          })}
        </Col>
        {!this.props.print && (
          <Col xs={1} className="pl-0 pr-1">
            <InfoModalButton modalConstant={this.getInfoKey()} />
          </Col>
        )}
      </Row>
    )
  }
}

RequestSummary.defaultProps = {
  loading: false,
  error: undefined,
  results: [],
  print: false,
}

RequestSummary.propTypes = {
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
  }
}

export default connect(mapStateToProps)(RequestSummary)

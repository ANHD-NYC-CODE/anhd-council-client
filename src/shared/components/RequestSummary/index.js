import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { Col, Row } from 'react-bootstrap'
class RequestSummary extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.request)
  }

  render() {
    return (
      <Row className="request-summary">
        <Col xs={10}>
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
          <Col xs={2}>
            <FontAwesomeIcon icon={faQuestion} onClick={() => console.log(this.props.request.requestConstant)} />
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

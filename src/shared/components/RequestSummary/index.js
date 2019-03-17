import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import CardLoader from 'shared/components/CardLoader'
import { Card, Button } from 'react-bootstrap'
class RequestSummary extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.props.onClick(e, this.props.request)
  }

  render() {
    return (
      <Card as={Button} variant="light" className=" request-wrapper" onClick={this.handleClick}>
        <Card.Body>
          <Card.Title>{this.props.request.label}</Card.Title>
          {this.props.loading ? <CardLoader /> : <Card.Text>{this.props.results.length}</Card.Text>}
        </Card.Body>
      </Card>
    )
  }
}

RequestSummary.defaultProps = {
  loading: false,
  error: undefined,
  results: [],
}

RequestSummary.propTypes = {
  onClick: PropTypes.func,
  request: PropTypes.object,
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

export default connect(mapStateToProps)(RequestSummary)

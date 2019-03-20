import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'

class RequestSummary extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.request)
  }

  render() {
    return this.props.resultsComponent({
      selected: this.props.selected,
      request: this.props.request,
      results: this.props.results,
      loading: this.props.loading,
      error: this.props.error,
      handleClick: this.handleClick,
    })
  }
}

RequestSummary.defaultProps = {
  loading: false,
  error: undefined,
  results: [],
}

RequestSummary.propTypes = {
  onClick: PropTypes.func,
  resultsComponent: PropTypes.func,
  request: PropTypes.object,
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

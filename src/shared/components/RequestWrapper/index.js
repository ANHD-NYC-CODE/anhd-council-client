import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'
import BaseTable from 'shared/components/BaseTable'

class RequestWrapper extends React.Component {
  constructor(props) {
    super(props)

    props.dispatch(requestWithAuth(makeRequest(props.request)))
  }

  componentWillReceiveProps(nextProps) {
    nextProps.dispatch(requestWithAuth(makeRequest(nextProps.request)))
  }

  render() {
    return (
      <div className="request-wrapper">
        <BaseTable
          dispatch={this.props.dispatch}
          error={this.props.error}
          loading={this.props.loading}
          records={this.props.results || []}
          caption={this.props.request.requestConstant}
        />
      </div>
    )
  }
}

RequestWrapper.propTypes = {
  dispatch: PropTypes.func,
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

export default connect(mapStateToProps)(RequestWrapper)

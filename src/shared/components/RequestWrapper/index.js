import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'
import InnerLoader from 'shared/components/InnerLoader'

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
      <div
        className="request-wrapper"
        style={{
          height: '400px',
          margin: '40px 0',
          overflow: 'hidden',
        }}
      >
        <h6>{this.props.request.requestConstant}</h6>
        {this.props.loading && <InnerLoader />}
        {this.props.error && <div className="text-danger">{this.props.error.message}</div>}
        {JSON.stringify(this.props.results, null, 2)}
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

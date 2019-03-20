import React from 'react'
import PropTypes from 'prop-types'

import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'

import LookupShow from 'Lookup/LookupShow'
import InnerLoader from 'shared/components/InnerLoader'

class LookupRequestsWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.loadRequests = this.loadRequests.bind(this)

    if (props.requests.length) {
      this.loadRequests(props.requests)
    }
  }

  loadRequests(requests = []) {
    requests.forEach(request => {
      this.props.dispatch(requestWithAuth(makeRequest(request)))
    })
  }

  render() {
    return this.props.requests.length ? <LookupShow {...this.props} /> : <InnerLoader />
  }
}

LookupRequestsWrapper.propTypes = {
  requests: PropTypes.array,
}

export default LookupRequestsWrapper

import React from 'react'
import PropTypes from 'prop-types'

import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'
import { getRequestType } from 'Store/AppState/selectors'

import LookupShow from 'Lookup/LookupShow'
import InnerLoader from 'shared/components/Loaders/InnerLoader'

class LookupRequestsWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.loadRequests = this.loadRequests.bind(this)

    if (props.appState.requests.length) {
      this.loadRequests(props.appState.requests)
    }
  }

  loadRequests(requests = []) {
    requests.forEach(request => {
      this.props.dispatch(requestWithAuth(makeRequest(request)))
    })
  }

  render() {
    return this.props.appState.requests.length ? (
      <LookupShow
        appState={this.props.appState}
        lookupRequests={getRequestType(this.props.appState.requests, 'LOOKUP_FILTER')}
        profileRequest={getRequestType(this.props.appState.requests, 'LOOKUP_PROFILE')[0]}
        propertyResult={this.props.propertyResult}
        {...this.props}
        propertyError={this.props.propertyError}
      />
    ) : (
      <InnerLoader />
    )
  }
}

LookupRequestsWrapper.propTypes = {
  appState: PropTypes.object,
}

export default LookupRequestsWrapper

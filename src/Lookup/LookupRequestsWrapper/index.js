import React from 'react'
import PropTypes from 'prop-types'

import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'
import { getRequestType } from 'Store/AppState/selectors'

import LookupShow from 'Lookup/LookupShow'
import InnerLoader from 'shared/components/Loaders/InnerLoader'
import { propTypes } from 'react-bootstrap/esm/Image'

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
        errorstate={this.props.errorState}
        loadingState={this.props.loadingState}
        lookupRequests={getRequestType(this.props.appState.requests, 'LOOKUP_FILTER')}
        loadingRequests={this.props.loading}
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
  dispatch: PropTypes.func,
  loadingState: PropTypes.object,
  propertyResult: PropTypes.object,
  loggedIn: PropTypes.bool,
  userBookmarks: PropTypes.object
}

export default LookupRequestsWrapper

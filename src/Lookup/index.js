import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push, createMatchSelector } from 'connected-react-router'
import { setLookupAndRequestsAndRedirect } from 'Store/AppState/actions'
import { getRequestType } from 'Store/AppState/selectors'
import PageError from 'shared/components/PageError'
import { clearSearch } from 'Store/Search/actions'

import { faMapSigns } from '@fortawesome/free-solid-svg-icons'
import Helmet from 'react-helmet'
import LookupIndex from 'Lookup/LookupIndex'
import LookupRequestsWrapper from 'Lookup/LookupRequestsWrapper'
import InnerLoader from 'shared/components/Loaders/InnerLoader'

class Lookup extends React.Component {
  constructor(props) {
    super(props)
    this.changeLookup = this.changeLookup.bind(this)
    this.trigger404Error = this.trigger404Error.bind(this)
    this.syncLookup = this.syncLookup.bind(this)
    this.needsLookupSync = this.needsLookupSync.bind(this)
    this.getPathMatch = this.getPathMatch.bind(this)

    const match = this.getPathMatch();
    
    this.state = {
      error404: false,
      error404Message: 'Sorry, an error has occured. Page not found!',
      loggedIn: this.props.loggedIn,
      isBookmarked: !!match.params.bbl && !!this.props.userBookmarks[match.params.bbl]
    }

    console.log(this.state.isBookmarked)
    this.syncLookup(props)
  }

  componentDidUpdate(props) {
    this.syncLookup(props)
  }

  getPathMatch() {
    const propertyMatchSelector = createMatchSelector({ path: '/property/:bbl' })

    const propertyBuildingMatchSelector = createMatchSelector({ path: '/property/:bbl/building/:bin' })
    const match =
      propertyBuildingMatchSelector({ router: this.props.router }) ||
      propertyMatchSelector({ router: this.props.router })

    return match
  }

  needsLookupSync(props, match) {
    if (props.router.location.pathname === '/lookup' || !match) return false
    return (
      !(String(match.params.bbl) === String(props.appState.currentProperty)) ||
      !(String(match.params.bin) === String(props.appState.currentBuilding))
    )
  }

  syncLookup(props) {
    const match = this.getPathMatch()
    if (props.router.location.pathname !== '/lookup' && !match) {
      props.dispatch(push('/lookup'))
    } else if (this.needsLookupSync(props, match)) {
      this.changeLookup(match.params.bbl, match.params.bin, true)
    }
  }

  trigger404Error(error404Message) {
    this.setState({ error404: true, error404Message })
    this.changeLookup(undefined, undefined)
  }

  changeLookup(bbl, bin, replaceHistory = false) {
    if (bbl === this.props.appState.currentProperty && bin === this.props.appState.currentBuilding) return
    this.props.dispatch(
      setLookupAndRequestsAndRedirect({
        bbl,
        bin,
        requests: this.props.config.createLookupRequests(bbl, bin),
        replaceHistory,
      })
    )

    this.props.dispatch(clearSearch())
  }

  render() {
    const match = this.getPathMatch()
    if (match && this.needsLookupSync(this.props, match)) return null
    if (this.state.error404)
      return <PageError title="Oops! 404 Page Not Found." message={this.state.error404Message} icon={faMapSigns} />
    if (this.props.bbl && !this.props.appState.currentProperty) return <InnerLoader />
    return (
      <div>
        <Helmet>
          <title>{`DAP Portal | Property Lookup${match && match.params.bbl ? ' - BBL ' + match.params.bbl : ''}${
            match && match.params.bin ? ' - BIN ' + match.params.bin : ''
          }`}</title>
        </Helmet>
        {match && this.props.appState.currentProperty ? (
          <LookupRequestsWrapper
            appState={this.props.appState}
            errorState={this.props.error}
            loadingState={this.props.loading}
            bbl={match.params.bbl}
            bin={match.params.bin}
            key={`${this.props.appState.currentProperty}${this.props.appState.currentBuilding}`}
            changeLookup={this.changeLookup}
            dispatch={this.props.dispatch}
            propertyResult={this.props.propertyResult}
            propertyError={this.props.propertyError}
            trigger404Error={this.trigger404Error}
            requests={this.props.requests}
            loggedIn={this.props.loggedIn}
            isBookmarked={this.state.isBookmarked}
          />
        ) : (
          <LookupIndex appState={this.props.appState} />
        )}
      </div>
    )
  }
}

Lookup.defaultProps = {
  bbl: undefined,
  bin: undefined,
}

Lookup.propTypes = {
  config: PropTypes.object,
  dispatch: PropTypes.func,
}

const mapStateToProps = state => {
  const loggedIn = !!state.auth.user;
  return {
    appState: state.appState,
    error: state.error,
    loading: state.loading,
    propertyResult: state.requests[(getRequestType(state.appState.requests, 'LOOKUP_PROFILE')[0] || {}).requestConstant],
    propertyError: state.error[(getRequestType(state.appState.requests, 'LOOKUP_PROFILE')[0] || {}).requestConstant],
    router: state.router,
    requests: state.requests,
    userBookmarks: loggedIn ? state.myDashboard.userBookmarks : {},
    loggedIn
  }
}

export default connect(mapStateToProps)(Lookup)

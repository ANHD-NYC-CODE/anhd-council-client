import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push, createMatchSelector } from 'connected-react-router'
import { setLookupAndRequestsAndRedirect } from 'Store/AppState/actions'
import { getRequestType } from 'Store/AppState/selectors'

import LookupIndex from 'Lookup/LookupIndex'
import LookupRequestsWrapper from 'Lookup/LookupRequestsWrapper'
import InnerLoader from 'shared/components/InnerLoader'
class Lookup extends React.Component {
  constructor(props) {
    super(props)
    this.changeLookup = this.changeLookup.bind(this)

    if (!props.bbl) {
      props.dispatch(push('/lookup'))
    } else if (!(props.bbl === props.appState.currentProperty) || !(props.bin === props.appState.currentBuilding)) {
      this.changeLookup(props.bbl, props.bin)
    }
  }

  changeLookup(bbl, bin) {
    this.props.dispatch(
      setLookupAndRequestsAndRedirect({
        bbl,
        bin,
      })
    )
  }

  render() {
    if (this.props.bbl && !this.props.appState.currentProperty) return <InnerLoader />
    return this.props.appState.currentProperty ? (
      <LookupRequestsWrapper
        appState={this.props.appState}
        bbl={this.props.bbl}
        bin={this.props.bin}
        key={`${this.props.appState.currentProperty}${this.props.appState.currentBuilding}`}
        changeLookup={this.changeLookup}
        dispatch={this.props.dispatch}
        propertyResult={this.props.propertyResult}
      />
    ) : (
      <LookupIndex />
    )
  }
}

Lookup.defaultProps = {
  bbl: undefined,
  bin: undefined,
}

Lookup.propTypes = {
  dispatch: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => {
  const propertyMatchSelector = createMatchSelector({ path: '/property/:bbl' })
  const propertyBuildingMatchSelector = createMatchSelector({ path: '/property/:bbl/building/:bin' })
  const match = propertyBuildingMatchSelector(state) || propertyMatchSelector(state)
  return {
    bbl: match ? match.params.bbl : undefined,
    bin: match ? match.params.bin : undefined,
    appState: state.appState,
    propertyResult:
      state.requests[(getRequestType(state.appState.requests, 'LOOKUP_PROFILE')[0] || {}).requestConstant],
  }
}

export default connect(mapStateToProps)(Lookup)

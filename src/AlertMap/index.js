import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push, createMatchSelector } from 'connected-react-router'
import { setGeographyAndRequestsAndRedirect } from 'Store/AppState/actions'
import { getManyRequestTypes } from 'Store/AppState/selectors'
import AlertMapIndex from 'AlertMap/AlertMapIndex'
import AlertMapRequestsWrapper from 'AlertMap/AlertMapRequestsWrapper'

class AlertMap extends React.Component {
  constructor(props) {
    super(props)
    this.changeGeographyAndId = this.changeGeographyAndId.bind(this)

    if (!(props.geographyType && props.geographyId)) {
      props.dispatch(push('/map'))
    } else if (
      !(props.geographyType === props.appState.currentGeographyType) &&
      !(props.geographyId === props.appState.currentGeographyId)
    ) {
      this.changeGeographyAndId(props.geographyType, props.geographyId)
    }
  }

  changeGeographyAndId(type, value) {
    this.props.dispatch(
      setGeographyAndRequestsAndRedirect({
        geographyType: type,
        geographyId: value,
        redirect: true,
      })
    )
  }

  render() {
    return !(this.props.appState.currentGeographyType && this.props.appState.currentGeographyId) ? (
      <AlertMapIndex changeGeographyAndId={this.changeGeographyAndId} dispatch={this.props.dispatch} />
    ) : (
      <AlertMapRequestsWrapper
        key={`${this.props.appState.currentGeographyType}${this.props.appState.currentGeographyId}${
          this.props.appState.mapFilterDate
        }`}
        changeGeographyAndId={this.changeGeographyAndId}
        dispatch={this.props.dispatch}
        geographyType={this.props.appState.currentGeographyType}
        geographyId={this.props.appState.currentGeographyId}
        mapFilterDate={this.props.appState.mapFilterDate}
        requests={this.props.requests}
      />
    )
  }
}

AlertMap.defaultProps = {
  geographyType: undefined,
  geographyId: undefined,
  requests: [],
}

AlertMap.propTypes = {
  dispatch: PropTypes.func,
}

const mapStateToProps = state => {
  const pathMatch = state.router.location.pathname.match(/(council|community)/)
  const path = pathMatch ? pathMatch[0] : undefined
  const matchSelector = createMatchSelector({
    path: `/${path}/:id`,
  })
  const match = matchSelector(state)
  return {
    appState: state.appState,
    geographyId: match ? match.params.id : undefined,
    geographyType: path ? path.toUpperCase() : undefined,
    requests: getManyRequestTypes(state.appState.requests, ['MAP_FILTER', 'GEOGRAPHY_HOUSING_TYPE', 'ADVANCED_SEARCH']),
  }
}

export default connect(mapStateToProps)(AlertMap)

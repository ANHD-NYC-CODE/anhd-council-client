import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push, createMatchSelector } from 'connected-react-router'
import { setGeographyAndRequestsAndRedirect } from 'Store/AppState/actions'
import { selectRequests, getManyRequestTypes } from 'Store/AppState/selectors'
import AlertMapIndex from 'AlertMap/AlertMapIndex'
import AlertMapRequestsWrapper from 'AlertMap/AlertMapRequestsWrapper'

class AlertMap extends React.Component {
  constructor(props) {
    super(props)
    this.changeGeographyAndId = this.changeGeographyAndId.bind(this)

    if (!(props.geographyType && props.geographyId)) {
      props.dispatch(push('/map'))
    } else if (
      !(props.geographyType === props.currentGeographyType) &&
      !(props.geographyId === props.currentGeographyId)
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
    return !(this.props.currentGeographyType && this.props.currentGeographyId) ? (
      <AlertMapIndex changeGeographyAndId={this.changeGeographyAndId} dispatch={this.props.dispatch} />
    ) : (
      <AlertMapRequestsWrapper
        changeGeographyAndId={this.changeGeographyAndId}
        dispatch={this.props.dispatch}
        geographyType={this.props.currentGeographyType}
        geographyId={this.props.currentGeographyId}
        mapFilterDate={this.props.mapFilterDate}
        requests={getManyRequestTypes(this.props.requests, ['MAP_FILTER', 'ADVANCED_SEARCH', 'GEOGRAPHY_HOUSING_TYPE'])}
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
    mapFilterDate: state.appState.mapFilterDate,
    currentGeographyType: state.appState.currentGeographyType,
    currentGeographyId: state.appState.currentGeographyId,
    geographyId: match ? match.params.id : undefined,
    geographyType: path ? path.toUpperCase() : undefined,
    requests: selectRequests(state),
  }
}

export default connect(mapStateToProps)(AlertMap)

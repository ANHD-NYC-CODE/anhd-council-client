import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push, createMatchSelector } from 'connected-react-router'
import { setGeographyAndRequestsAndRedirect } from 'Store/AppState/actions'
import { selectRequests, getManyRequestTypes } from 'Store/AppState/selectors'
import AlertMapIndex from 'AlertMap/AlertMapIndex'
import AlertMapRequestsWrapper from 'AlertMap/AlertMapRequestsWrapper'
import { StandardizedInput } from 'shared/classes/StandardizedInput'

class AlertMap extends React.Component {
  constructor(props) {
    super(props)
    this.submitGeography = this.submitGeography.bind(this)
    this.handleChangeGeographyType = this.handleChangeGeographyType.bind(this)
    this.cancelChangeGeography = this.cancelChangeGeography.bind(this)
    this.handleChangeGeographyId = this.handleChangeGeographyId.bind(this)
    this.state = {
      changingGeography: false,
      changingGeographyType: undefined,
      changingGeographyId: undefined,
    }

    if (!(props.geographyType && props.geographyId)) {
      props.dispatch(push('/map'))
    } else if (
      !(props.geographyType === props.appState.currentGeographyType) &&
      !(props.geographyId === props.appState.currentGeographyId)
    ) {
      this.submitGeography(props.geographyType, props.geographyId)
    }
  }

  submitGeography(type, value) {
    this.props.dispatch(
      setGeographyAndRequestsAndRedirect({
        geographyType: this.state.changingGeographyType || type,
        geographyId: this.state.changingGeographyId || value,
        redirect: true,
      })
    )
    this.setState({
      selectedGeoJsonId: value,
      changingGeography: false,
      changingGeographyType: undefined,
      changingGeographyId: undefined,
    })
  }

  handleChangeGeographyType(e) {
    this.setState({
      changingGeography: true,
      changingGeographyType: new StandardizedInput(e).value,
      changingGeographyId: -1,
    })
  }

  handleChangeGeographyId(e) {
    this.setState({
      changingGeography: true,
      changingGeographyId: new StandardizedInput(e).value,
    })
  }

  cancelChangeGeography() {
    this.setState({
      changingGeography: false,
      changingGeographyType: undefined,
      changingGeographyId: undefined,
    })
  }

  render() {
    return !(this.props.appState.currentGeographyType && this.props.appState.currentGeographyId) ? (
      <AlertMapIndex
        dispatch={this.props.dispatch}
        handleChangeGeography={this.submitGeography}
        handleChangeGeographyType={this.handleChangeGeographyType}
        handleChangeGeographyId={this.handleChangeGeographyId}
        cancelChangeGeography={this.cancelChangeGeography}
        changingGeography={this.state.changingGeography}
        changingGeographyType={this.state.changingGeographyType}
        changingGeographyId={this.state.changingGeographyId}
      />
    ) : (
      <AlertMapRequestsWrapper
        dispatch={this.props.dispatch}
        geographyType={this.props.appState.currentGeographyType}
        geographyId={this.props.appState.currentGeographyId}
        mapFilterDate={this.props.appState.mapFilterDate}
        requests={getManyRequestTypes(this.props.requests, ['MAP_FILTER', 'ADVANCED_SEARCH', 'GEOGRAPHY_HOUSING_TYPE'])}
        handleChangeGeography={this.submitGeography}
        handleChangeGeographyType={this.handleChangeGeographyType}
        handleChangeGeographyId={this.handleChangeGeographyId}
        cancelChangeGeography={this.cancelChangeGeography}
        changingGeography={this.state.changingGeography}
        changingGeographyType={this.state.changingGeographyType}
        changingGeographyId={this.state.changingGeographyId}
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
  requests: PropTypes.array,
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
    requests: selectRequests(state),
  }
}

export default connect(mapStateToProps)(AlertMap)

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push, createMatchSelector } from 'connected-react-router'
import { setGeographyAndRequestsAndRedirect } from 'Store/AppState/actions'
import AlertMapIndex from 'AlertMap/AlertMapIndex'
import AlertMapRequestsWrapper from 'AlertMap/AlertMapRequestsWrapper'
import { StandardizedInput } from 'shared/classes/StandardizedInput'
import { setAppState } from 'Store/AppState/actions'
import { makeSelectRequests } from 'Store/AppState/selectors'

class AlertMap extends React.PureComponent {
  constructor(props) {
    super(props)

    this.submitGeography = this.submitGeography.bind(this)
    this.handleChangeGeographyType = this.handleChangeGeographyType.bind(this)
    this.cancelChangeGeography = this.cancelChangeGeography.bind(this)
    this.handleChangeGeographyId = this.handleChangeGeographyId.bind(this)
    this.cancelChangeGeography = this.cancelChangeGeography.bind(this)
    if (!(props.geographyType && props.geographyId)) {
      props.dispatch(push('/map'))
    } else if (
      !(props.geographyType === props.appState.currentGeographyType) &&
      !(props.geographyId === props.appState.currentGeographyId)
    ) {
      this.submitGeography({ geographyType: props.geographyType, geographyId: props.geographyId })
    }

    if (this.props.appState.changingGeography) {
      this.props.dispatch(
        setAppState({ changingGeography: false, changingGeographyType: undefined, changingGeographyId: undefined })
      )
    }
  }

  submitGeography({ e, geographyType, geographyId } = {}) {
    e = new StandardizedInput(e)
    const type = geographyType || this.props.appState.changingGeographyType || this.props.appState.currentGeographyType
    const id = geographyId || e.value

    this.props.dispatch(
      setGeographyAndRequestsAndRedirect({
        geographyType: type,
        geographyId: id,
        redirect: true,
      })
    )

    this.cancelChangeGeography()
  }

  handleChangeGeographyType(e) {
    this.props.dispatch(
      setAppState({
        changingGeography: true,
        changingGeographyType: new StandardizedInput(e).value,
        changingGeographyId: -1,
      })
    )
  }

  handleChangeGeographyId(e) {
    const geographyId = new StandardizedInput(e).value

    if (parseInt(geographyId) <= 0) return
    this.props.dispatch(
      setAppState({
        changingGeography: true,
        changingGeographyType: this.props.appState.changingGeographyType || this.props.appState.currentGeographyType,
        changingGeographyId: String(geographyId),
      })
    )
  }

  cancelChangeGeography() {
    this.props.dispatch(
      setAppState({
        changingGeography: false,
        changingGeographyType: undefined,
        changingGeographyId: undefined,
      })
    )
  }

  render() {
    return !(this.props.appState.currentGeographyType && this.props.appState.currentGeographyId) ? (
      <AlertMapIndex
        appState={this.props.appState}
        dispatch={this.props.dispatch}
        handleChangeGeography={this.submitGeography}
        handleChangeGeographyType={this.handleChangeGeographyType}
        handleChangeGeographyId={this.handleChangeGeographyId}
        cancelChangeGeography={this.cancelChangeGeography}
      />
    ) : (
      <AlertMapRequestsWrapper
        appState={this.props.appState}
        dispatch={this.props.dispatch}
        cancelChangeGeography={this.cancelChangeGeography}
        handleChangeGeography={this.submitGeography}
        handleChangeGeographyType={this.handleChangeGeographyType}
        handleChangeGeographyId={this.handleChangeGeographyId}
        requests={this.props.requests}
      />
    )
  }
}

AlertMap.defaultProps = {
  geographyType: undefined,
  geographyId: undefined,
}

AlertMap.propTypes = {
  dispatch: PropTypes.func,
}

const makeMapStateToProps = () => {
  const mapStateToProps = state => {
    const selectRequests = makeSelectRequests
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
  return mapStateToProps
}

export default connect(makeMapStateToProps)(AlertMap)

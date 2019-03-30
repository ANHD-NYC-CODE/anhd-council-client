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
import { isValidGeography } from 'shared/utilities/routeUtils'
import PageError from 'shared/components/PageError'
import { faMapSigns } from '@fortawesome/free-solid-svg-icons'
import ConfigContext from 'Config/ConfigContext'
import { Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

class AlertMap extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      error404: props.geographyType && !isValidGeography(props.geographyType, props.geographyId),
      error404Message: props.geographyType
        ? `Geography "${props.geographyType.toLowerCase()}" with id "${props.geographyId}" does not exist.`
        : '',
    }

    this.submitGeography = this.submitGeography.bind(this)
    this.handleChangeGeographyType = this.handleChangeGeographyType.bind(this)
    this.cancelChangeGeography = this.cancelChangeGeography.bind(this)
    this.handleChangeGeographyId = this.handleChangeGeographyId.bind(this)
    this.cancelChangeGeography = this.cancelChangeGeography.bind(this)
    this.scrollToControls = this.scrollToControls.bind(this)
    if (props.geographyType && !isValidGeography(props.geographyType, props.geographyId)) {
      return
    } else if (!(props.geographyType && props.geographyId)) {
      props.dispatch(push('/map'))
    } else if (
      !(props.geographyType === props.appState.currentGeographyType) &&
      !(props.geographyId === props.appState.currentGeographyId)
    ) {
      this.submitGeography({ geographyType: props.geographyType, geographyId: props.geographyId })
    }

    // Disable changing on mount
    if (this.props.appState.changingGeography) {
      this.props.dispatch(
        setAppState({ changingGeography: false, changingGeographyType: undefined, changingGeographyId: undefined })
      )
    }
  }

  componentDidMount() {
    scrollSpy.update()
    this.scrollToControls()
  }

  componentDidUpdate() {
    if (
      this.props.geographyType &&
      !this.state.error404 &&
      !isValidGeography(this.props.geographyType, this.props.geographyId)
    ) {
      this.trigger404Error(
        `Geography "${this.props.geographyType.toLowerCase()}" with id "${this.props.geographyId}" does not exist.`
      )
    } else if (this.state.error404) {
      this.setState({
        error404: false,
      })
    }
  }

  scrollToControls() {
    scroller.scrollTo('main-controls', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -200,
    })
  }

  trigger404Error(error404Message) {
    this.setState({ error404: true, error404Message })
    this.submitGeography({ geographyType: undefined, geographyId: undefined })
  }

  submitGeography({ e, geographyType, geographyId } = {}) {
    e = new StandardizedInput(e)
    const type = geographyType || this.props.appState.changingGeographyType || this.props.appState.currentGeographyType
    const id =
      geographyId || e.value || this.props.appState.changingGeographyId || this.props.appState.currentGeographyId

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
    return (
      <ConfigContext.Consumer>
        {config => {
          if (this.state.error404)
            return (
              <PageError title="Oops! 404 Page Not Found." message={this.state.error404Message} icon={faMapSigns} />
            )
          return !(this.props.appState.currentGeographyType && this.props.appState.currentGeographyId) ? (
            <AlertMapIndex
              appState={this.props.appState}
              cancelChangeGeography={this.cancelChangeGeography}
              dispatch={this.props.dispatch}
              handleChangeGeography={this.submitGeography}
              handleChangeGeographyType={this.handleChangeGeographyType}
              handleChangeGeographyId={this.handleChangeGeographyId}
              scrollToControls={this.scrollToControls}
            />
          ) : (
            <AlertMapRequestsWrapper
              advancedSearch={this.props.advancedSearch}
              appState={this.props.appState}
              dispatch={this.props.dispatch}
              config={config}
              cancelChangeGeography={this.cancelChangeGeography}
              handleChangeGeography={this.submitGeography}
              handleChangeGeographyType={this.handleChangeGeographyType}
              handleChangeGeographyId={this.handleChangeGeographyId}
              requests={this.props.requests}
              trigger404Error={this.trigger404Error}
            />
          )
        }}
      </ConfigContext.Consumer>
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
      advancedSearch: state.advancedSearch,
      geographyId: match ? match.params.id : undefined,
      geographyType: path ? path.toUpperCase() : undefined,
      requests: selectRequests(state),
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps)(AlertMap)

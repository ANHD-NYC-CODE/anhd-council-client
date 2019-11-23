import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as c from 'shared/constants'
import { push, createMatchSelector } from 'connected-react-router'
import { setGeographyAndRequestsAndRedirect } from 'Store/AppState/actions'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import Helmet from 'react-helmet'
import DistrictDashboardIndex from 'DistrictDashboard/DistrictDashboardIndex'
import DistrictDashboardRequestsWrapper from 'DistrictDashboard/DistrictDashboardRequestsWrapper'
import StandardizedInput from 'shared/classes/StandardizedInput'
import { setAppState } from 'Store/AppState/actions'
import { makeSelectRequests } from 'Store/AppState/selectors'
import { isValidGeography } from 'shared/utilities/routeUtils'
import PageError from 'shared/components/PageError'
import { faMapSigns } from '@fortawesome/free-solid-svg-icons'
import { Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

class DistrictDashboard extends React.PureComponent {
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

    this.syncGeographyMatch = this.syncGeographyMatch.bind(this)

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

  componentWillUnmount() {
    Events.scrollEvent.remove('begin')
    Events.scrollEvent.remove('end')
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

    this.syncGeographyMatch()
  }

  syncGeographyMatch() {
    if (
      this.props.geographyType !== this.props.appState.currentGeographyType ||
      this.props.geographyId !== this.props.appState.currentGeographyId
    ) {
      this.props.dispatch(
        setGeographyAndRequestsAndRedirect({
          geographyType: this.props.geographyType,
          geographyId: this.props.geographyId,
          redirect: false,
          requests: this.props.config.createMapRequests(this.props.geographyType, this.props.geographyId),
        })
      )
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
        requests: this.props.config.createMapRequests(type, id),
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
    if (this.state.error404)
      return <PageError title="Oops! 404 Page Not Found." message={this.state.error404Message} icon={faMapSigns} />
    return (
      <div>
        <Helmet>
          <title>{`DAP Portal | District Dashboard${
            this.props.appState.currentGeographyType
              ? ' - ' + this.props.appState.currentGeographyType + ' ' + this.props.appState.currentGeographyId
              : ''
          }`}</title>
        </Helmet>
        {!(this.props.appState.currentGeographyType && this.props.appState.currentGeographyId) ? (
          <DistrictDashboardIndex
            appState={this.props.appState}
            cancelChangeGeography={this.cancelChangeGeography}
            dispatch={this.props.dispatch}
            handleChangeGeography={this.submitGeography}
            handleChangeGeographyType={this.handleChangeGeographyType}
            handleChangeGeographyId={this.handleChangeGeographyId}
            scrollToControls={this.scrollToControls}
          />
        ) : (
          <DistrictDashboardRequestsWrapper
            advancedSearch={this.props.advancedSearch}
            appState={this.props.appState}
            dashboardState={this.props.dashboardState}
            dispatch={this.props.dispatch}
            config={this.props.config}
            cancelChangeGeography={this.cancelChangeGeography}
            handleChangeGeography={this.submitGeography}
            handleChangeGeographyType={this.handleChangeGeographyType}
            handleChangeGeographyId={this.handleChangeGeographyId}
            mapRequests={this.props.mapRequests}
            requests={this.props.requests}
            loading={this.props.loading}
            selectedError={this.props.selectedError}
            totalPropertyResults={this.props.totalPropertyResults}
            trigger404Error={this.trigger404Error}
          />
        )}
      </div>
    )
  }
}

DistrictDashboard.defaultProps = {
  geographyType: undefined,
  geographyId: undefined,
}

DistrictDashboard.propTypes = {
  dispatch: PropTypes.func,
}

const makeMapStateToProps = () => {
  const mapStateToProps = state => {
    const loadingSelector = createLoadingSelector([
      state.appState.selectedRequests.map(request => request.requestConstant),
      c.ADVANCED_SEARCH,
    ])

    const errorSelector = createErrorSelector([state.appState.selectedRequests.map(request => request.requestConstant)])

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
      dashboardState: state.dashboardState,
      geographyId: match ? match.params.id : undefined,
      geographyType: path ? path.toUpperCase() : undefined,
      mapRequests: selectRequests(state),
      loading: loadingSelector(state),
      selectedError: errorSelector(state),
      requests: state.requests,
      totalPropertyResults: state.requests['GEOGRAPHY_HOUSING_TYPE_ALL'],
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps)(DistrictDashboard)

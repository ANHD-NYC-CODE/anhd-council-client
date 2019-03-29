import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push, createMatchSelector } from 'connected-react-router'
import { setLookupAndRequestsAndRedirect } from 'Store/AppState/actions'
import { getRequestType } from 'Store/AppState/selectors'
import PageError from 'shared/components/PageError'
import { Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import { faMapSigns } from '@fortawesome/free-solid-svg-icons'

import LookupIndex from 'Lookup/LookupIndex'
import LookupRequestsWrapper from 'Lookup/LookupRequestsWrapper'
import InnerLoader from 'shared/components/Loaders/InnerLoader'
class Lookup extends React.Component {
  constructor(props) {
    super(props)
    this.changeLookup = this.changeLookup.bind(this)
    this.trigger404Error = this.trigger404Error.bind(this)
    this.state = {
      error404: false,
      error404Message: 'Sorry, an error has occured. Page not found!',
    }
    if (!props.bbl) {
      props.dispatch(push('/lookup'))
    } else if (!(props.bbl === props.appState.currentProperty) || !(props.bin === props.appState.currentBuilding)) {
      this.changeLookup(props.bbl, props.bin)
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
    this.changeLookup(undefined, undefined)
  }

  changeLookup(bbl, bin) {
    if (bbl === this.props.appState.currentProperty && bin === this.props.appState.currentBuilding) return
    this.props.dispatch(
      setLookupAndRequestsAndRedirect({
        bbl,
        bin,
      })
    )
  }

  render() {
    if (this.state.error404)
      return <PageError title="Oops! 404 Page Not Found." message={this.state.error404Message} icon={faMapSigns} />
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
        propertyError={this.props.propertyError}
        trigger404Error={this.trigger404Error}
      />
    ) : (
      <LookupIndex appState={this.props.appState} scrollToControls={this.scrollToControls} />
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
    propertyError: state.error[(getRequestType(state.appState.requests, 'LOOKUP_PROFILE')[0] || {}).requestConstant],
  }
}

export default connect(mapStateToProps)(Lookup)

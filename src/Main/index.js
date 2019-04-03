import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AddressSearch from 'Lookup/AddressSearch'
import GeographySelect from 'shared/components/GeographySelect'
import { setGeographyAndRequestsAndRedirect } from 'Store/AppState/actions'
import { setAppState } from 'Store/AppState/actions'
import StandardizedInput from 'shared/classes/StandardizedInput'
import IntroductionBlock from 'shared/components/IntroductionBlock'
import { Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import { Row, Col } from 'react-bootstrap'
class Main extends React.Component {
  constructor(props) {
    super(props)
    this.submitGeography = this.submitGeography.bind(this)
    this.cancelChangeGeography = this.cancelChangeGeography.bind(this)
    this.handleChangeGeographyType = this.handleChangeGeographyType.bind(this)
    this.scrollToControls = this.scrollToControls.bind(this)
    if (this.props.appState.changingGeography) {
      this.props.dispatch(
        setAppState({ changingGeography: false, changingGeographyType: undefined, changingGeographyId: undefined })
      )
    }
  }

  componentDidMount() {
    scrollSpy.update()
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
    })
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
      <div id="main" className="main">
        <Row>
          <Col className="touch-left padding-xs-sm-0" xs={12} lg={5}>
            <IntroductionBlock scrollToControls={this.scrollToControls} />
          </Col>
          <Col className="px-md-4 py-3 py-lg-6" xs={12} lg={7}>
            <p className="text-muted font-weight-bold">Select a district or enter a building address to begin.</p>
            <Element name="main-controls" />
            <div className="mb-4">
              <div>
                <AddressSearch inputClass="xl-form-control" placeholder="Enter an address" />
              </div>
              <div className="mt-5">
                <GeographySelect
                  selectClass="xl-form-control"
                  cancelChangeGeography={this.cancelChangeGeography}
                  changingGeographyType={this.props.appState.changingGeographyType}
                  confirmChange={false}
                  currentGeographyType={
                    this.props.appState.changingGeographyType || this.props.appState.currentGeographyType
                  }
                  currentGeographyId={this.props.appState.changingGeographyId || this.props.appState.currentGeographyId}
                  dispatch={this.props.dispatch}
                  handleChangeGeography={this.submitGeography}
                  handleChangeGeographyType={this.handleChangeGeographyType}
                  placeholder="Select a geography"
                  showSubmit={
                    !this.props.appState.changingGeography &&
                    this.props.appState.currentGeographyType &&
                    this.props.appState.currentGeographyId > 0
                  }
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

Main.propTypes = {
  auth: PropTypes.object,
  dispatch: PropTypes.func,
  showLoginModal: PropTypes.bool,
  path: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    appState: state.appState,
  }
}

export default connect(mapStateToProps)(Main)

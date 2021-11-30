import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import Helmet from 'react-helmet'
import AddressSearch from 'Lookup/AddressSearch'
import MainGeographySelect from 'shared/components/MainGeographySelect'
import { setGeographyAndRequestsAndRedirect } from 'Store/AppState/actions'
import { setAppState } from 'Store/AppState/actions'
import StandardizedInput from 'shared/classes/StandardizedInput'
import IntroductionBlock from 'shared/components/IntroductionBlock'
import LoginModal from 'shared/components/modals/LoginModal'
import LoginModalFooter from 'shared/components/forms/LoginForm/LoginModalFooter'
import ConfigContext from 'Config/ConfigContext'
import BaseLink from 'shared/components/BaseLink'

import { Element, Events, scrollSpy, scroller } from 'react-scroll'
import { Row, Col } from 'react-bootstrap'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.submitGeography = this.submitGeography.bind(this)
    this.cancelChangeGeography = this.cancelChangeGeography.bind(this)
    this.handleChangeGeographyType = this.handleChangeGeographyType.bind(this)
    this.handleChangeGeographyId = this.handleChangeGeographyId.bind(this)
    this.scrollToControls = this.scrollToControls.bind(this)
    if (this.props.appState.changingGeography) {
      this.props.dispatch(
        setAppState({ changingGeography: false, changingGeographyType: undefined, changingGeographyId: undefined })
      )
    }
  }

  componentDidMount() {
    scrollSpy.update()
    if (this.props.login) {
      this.props.modal.setModal({
        modalComponent: LoginModal,
        modalProps: {
          hideModal: () => {
            this.props.modal.hideModal()
            this.props.dispatch(push('/'))
          },
          modalFooter: <LoginModalFooter modal={this.props.modal} />,
          modal: this.props.modal
        },
      })
    }

    if (this.props.user) {
      this.props.dispatch(push('/'))
    }
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
      <div id="main" className="main max-width-wrapper">
        <Helmet>
          <title>DAP Portal</title>
        </Helmet>
        <Row>
          <Col>
            <h4 className="text-center text-black mt-4 mb-4">Welcome to the Displacement Alert Portal!</h4>
          </Col>
          <Col className="px-md-4 px-0 py-3 py-lg-4" xs={12}>
            <p className="text-black text-center py-3">Enter an address to find information about a building:</p>
            <Element name="main-controls" />
            <div className="mb-4">
              <div>
                <ConfigContext.Consumer>
                  {config => {
                    return (
                      <AddressSearch
                        config={config}
                        inputClass="home-search-bar"
                        inputSize="md"
                        containerClass="main-address-search"
                        placeholder="Enter an address"
                      />
                    )
                  }}
                </ConfigContext.Consumer>
              </div>
              <p className="text-black text-center py-4 mb-0">OR</p>
              <p className="text-black text-center">View data about a district or zip code:</p>
              <MainGeographySelect
                appState={this.props.appState}
                selectClass="main-geography-select"
                inputSize="md"
                submitButtonVariant="dark"
                cancelChangeGeography={this.cancelChangeGeography}
                changingGeographyType={this.props.appState.changingGeographyType}
                changingGeographyId={this.props.appState.changingGeographyId}
                confirmChange={false}
                currentGeographyType={
                  this.props.appState.changingGeographyType || this.props.appState.currentGeographyType
                }
                currentGeographyId={this.props.appState.currentGeographyId}
                dispatch={this.props.dispatch}
                handleChangeGeography={this.submitGeography}
                handleChangeGeographyType={this.handleChangeGeographyType}
                handleChangeGeographyId={this.handleChangeGeographyId}
                placeholder="Select"
                showSubmit={
                  (!this.props.appState.changingGeography &&
                    this.props.appState.currentGeographyType &&
                    this.props.appState.currentGeographyId > 0) ||
                  (this.props.appState.changingGeographyType && this.props.appState.changingGeographyId > 0)
                }
              />
            </div>
            <p className="text-black text-center my-5">
              You can also{' '}
              <BaseLink className="text-link" href="/search">
                create a Custom Search
              </BaseLink>
            </p>
          </Col>
          <Col className="layout__left-column padding-xs-sm-0 full-bleed--mobile" xs={12}>
            <IntroductionBlock scrollToControls={this.scrollToControls} />
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

import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'Store/AdvancedSearch/constants'

import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { connect } from 'react-redux'
import { Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import AdvancedSearchSentence from 'AdvancedSearch/Sentence'
import { Jumbotron, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import AdvancedSearchForm from 'AdvancedSearch/AdvancedSearchForm'
import AdvancedSearchInstructions from 'AdvancedSearch/AdvancedSearchInstructions'

import ConfigContext from 'Config/ConfigContext'
import { setAppState } from 'Store/AppState/actions'
import classnames from 'classnames'

import './style.scss'
export class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 1,
    }
    this.toggleView = this.toggleView.bind(this)

    if (this.props.appState.changingGeography) {
      this.props.dispatch(
        setAppState({ changingGeography: false, changingGeographyType: undefined, changingGeographyId: undefined })
      )
    }
  }

  componentDidMount() {
    scrollSpy.update()
    scroll.scrollToTop({
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart',
    })
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin')
    Events.scrollEvent.remove('end')
  }

  toggleView(value) {
    this.setState({
      view: value,
    })
  }

  render() {
    return (
      <div className="advanced-search">
        <Row>
          <Col className="touch-left padding-xs-sm-0" xs={12} lg={5}>
            <Jumbotron className="advanced-search__left-column">
              <Row className="advanced-search__row mb-4">
                <Col xs={12} xl={11}>
                  <h3 className="text-uppercase font-weight-bold m-0">Custom Search</h3>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <ToggleButtonGroup
                    name="view"
                    type="radio"
                    className="view-toggle"
                    value={this.state.view}
                    variant="info"
                    onChange={this.toggleView}
                  >
                    <ToggleButton className="toggle-link light" value={1}>
                      Sentence
                    </ToggleButton>
                    <ToggleButton className="toggle-link light" value={2}>
                      Search Guide
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Col>
              </Row>
              <Row className="mb-5">
                <Col>
                  <div className={classnames({ 'd-none': this.state.view === 1 })}>
                    <AdvancedSearchInstructions />
                  </div>
                  <div
                    className={classnames('advanced-search__sentence-container', { 'd-none': this.state.view !== 1 })}
                  >
                    <AdvancedSearchSentence advancedSearch={this.props.advancedSearch} />
                  </div>
                </Col>
              </Row>
            </Jumbotron>
          </Col>
          <Col className="advanced-search-form--container px-lg-5 pt-6" xs={12} lg={7}>
            <ConfigContext.Consumer>
              {config => (
                <AdvancedSearchForm
                  advancedSearch={this.props.advancedSearch}
                  appState={this.props.appState}
                  config={config}
                  dispatch={this.props.dispatch}
                  error={this.props.error}
                  loading={this.props.loading}
                  showPopups={this.state.view === 2}
                />
              )}
            </ConfigContext.Consumer>
          </Col>
        </Row>
      </div>
    )
  }
}

AdvancedSearch.propTypes = {
  advancedSearch: PropTypes.object,
  dispatch: PropTypes.func,
}

const loadingSelector = createLoadingSelector([c.GET_ADVANCED_SEARCH])
const errorSelector = createErrorSelector([c.GET_ADVANCED_SEARCH])

const mapStateToProps = state => {
  return {
    appState: state.appState,
    advancedSearch: state.advancedSearch,
    error: errorSelector(state),
    loading: loadingSelector(state),
  }
}

export default connect(mapStateToProps)(AdvancedSearch)

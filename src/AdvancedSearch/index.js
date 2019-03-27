import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'Store/AdvancedSearch/constants'

import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { connect } from 'react-redux'

import AdvancedSearchSentence from 'AdvancedSearch/Sentence'
import { Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import AdvancedSearchForm from 'AdvancedSearch/AdvancedSearchForm'
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

  toggleView(value) {
    this.setState({
      view: value,
    })
  }

  render() {
    return (
      <div className="advanced-search">
        <Row>
          <Col className="advanced-search__left-column px-lg-2 px-xl-5" xs={12} lg={4}>
            <Row className="advanced-search__row my-4">
              <Col xs={12} xl={11}>
                <h3 className="text-light-gray text-uppercase font-weight-bold m-0">Advanced Search</h3>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <ToggleButtonGroup
                  name="view"
                  type="radio"
                  className="view-toggle"
                  value={this.state.view}
                  onChange={this.toggleView}
                >
                  <ToggleButton className="toggle-link light" value={1}>
                    Sentence
                  </ToggleButton>
                  <ToggleButton className="toggle-link light" value={2}>
                    Instructions
                  </ToggleButton>
                </ToggleButtonGroup>
              </Col>
            </Row>
            <Row className="mb-5">
              <Col>
                <div className={classnames({ 'd-none': this.state.view === 1 })}>
                  <div className="advanced-search__instructions">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id lobortis diam. Praesent neque
                    purus, mattis eu interdum eget, maximus a purus. Quisque interdum auctor ligula vel commodo. Aliquam
                    est arcu, gravida at ultrices vitae, mattis non massa. Curabitur posuere, ex nec rhoncus lobortis,
                    est mi luctus massa, in tempor dui est vel erat.
                  </div>
                </div>
                <div className={classnames('advanced-search__sentence-container', { 'd-none': this.state.view !== 1 })}>
                  <AdvancedSearchSentence advancedSearch={this.props.advancedSearch} />
                </div>
              </Col>
            </Row>
          </Col>
          <Col className="advanced-search-form--container px-lg-5" xs={12} lg={8}>
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

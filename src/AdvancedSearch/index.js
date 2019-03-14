import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'Store/AdvancedSearch/constants'

import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { connect } from 'react-redux'

import AdvancedSearchSentence from 'AdvancedSearch/Sentence'
import BuildingHistoryTable from 'Lookup/BuildingHistoryTable'

import { Row, Col } from 'react-bootstrap'
import AdvancedSearchForm from 'AdvancedSearch/AdvancedSearchForm'
import ConfigContext from 'Config/ConfigContext'
import './style.scss'
export class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="advanced-search">
        <h1>Advanced Search</h1>

        <BuildingHistoryTable
          loading={this.props.loading}
          error={this.props.error}
          title="Search Results"
          records={this.props.advancedSearch.results}
        />
        {!!this.props.advancedSearch && (
          <Row>
            <Col xs={12} md={4}>
              <AdvancedSearchSentence advancedSearch={this.props.advancedSearch} />
            </Col>
            <Col className="advanced-search-form--container" xs={12} md={8}>
              <ConfigContext.Consumer>
                {config => (
                  <AdvancedSearchForm
                    advancedSearch={this.props.advancedSearch}
                    config={config}
                    dispatch={this.props.dispatch}
                    error={this.props.error}
                    loading={this.props.loading}
                  />
                )}
              </ConfigContext.Consumer>
            </Col>
          </Row>
        )}
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
    advancedSearch: state.advancedSearch,
    error: errorSelector(state),
    loading: loadingSelector(state),
  }
}

export default connect(mapStateToProps)(AdvancedSearch)

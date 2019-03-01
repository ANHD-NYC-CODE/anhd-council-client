import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'Store/AdvancedSearch/constants'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { connect } from 'react-redux'
import { getAdvancedSearch } from 'Store/AdvancedSearch/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import Layout from 'Layout'
import AdvancedSearchSentence from 'AdvancedSearch/Sentence'
import BuildingHistoryTable from 'BuildingLookup/BuildingHistoryTable'
import { Button } from 'react-bootstrap'

import Condition from 'AdvancedSearch/Condition'

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)

    this.submitSearch = this.submitSearch.bind(this)
  }

  submitSearch(e) {
    e.preventDefault()
    e.stopPropagation()

    this.props.dispatch(requestWithAuth(getAdvancedSearch(this.props.advancedSearch.conditions)))
  }

  render() {
    return (
      <Layout>
        <h1>Advanced Search</h1>
        <AdvancedSearchSentence conditions={this.props.advancedSearch.conditions} />
        <BuildingHistoryTable
          loading={this.props.loading}
          error={this.props.error}
          title="Search Results"
          records={this.props.advancedSearch.results}
        />

        <Condition
          conditions={this.props.advancedSearch.conditions}
          condition={this.props.advancedSearch.conditions[0]}
          dispatch={this.props.dispatch}
          key={'condition-0'}
          conditionKey={'0'}
        />
        <Button onClick={this.submitSearch} type="submit" variant="primary">
          Submit
        </Button>
      </Layout>
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

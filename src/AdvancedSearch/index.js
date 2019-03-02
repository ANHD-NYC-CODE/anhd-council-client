import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'Store/AdvancedSearch/constants'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { connect } from 'react-redux'
import { getAdvancedSearch } from 'Store/AdvancedSearch/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import AdvancedSearchSentence from 'AdvancedSearch/Sentence'
import BuildingHistoryTable from 'BuildingLookup/BuildingHistoryTable'
import { addBoundary, updateBoundary } from 'Store/AdvancedSearch/actions'
import { Button } from 'react-bootstrap'

import Condition from 'AdvancedSearch/Condition'
import BoundaryQuery from 'AdvancedSearch/BoundaryQuery'

export class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)

    this.submitSearch = this.submitSearch.bind(this)
    this.changeBoundaryObject = this.changeBoundaryObject.bind(this)
    this.changeBoundaryId = this.changeBoundaryId.bind(this)
    this.addBoundary = this.addBoundary.bind(this)

    this.state = {
      boundaries: [],
      conditions: [],
      housingTypes: [],
    }
  }

  addBoundary(option) {
    this.props.dispatch(addBoundary({ object: option.value }))
  }

  changeBoundaryObject(option, index) {
    this.props.dispatch(updateBoundary(index, { object: option.value, id: undefined }))
  }

  changeBoundaryId(option, index) {
    this.props.dispatch(updateBoundary(index, { id: option.value }))
  }

  submitSearch(e) {
    e.preventDefault()
    e.stopPropagation()

    this.props.dispatch(requestWithAuth(getAdvancedSearch(this.props.advancedSearch)))
  }

  render() {
    return (
      <div className="advanced-search">
        <h1>Advanced Search</h1>

        {!!this.props.advancedSearch && (
          <div>
            <AdvancedSearchSentence advancedSearch={this.props.advancedSearch} />
            <BuildingHistoryTable
              loading={this.props.loading}
              error={this.props.error}
              title="Search Results"
              records={this.props.advancedSearch.results}
            />
            <BoundaryQuery
              addBoundary={this.addBoundary}
              boundaries={this.props.advancedSearch.boundaries}
              changeBoundaryObject={this.changeBoundaryObject}
              changeBoundaryId={this.changeBoundaryId}
            />

            <Condition
              conditions={this.props.advancedSearch.conditions}
              condition={this.props.advancedSearch.conditions[0]}
              dispatch={this.props.dispatch}
              key={'condition-0'}
              conditionKey={'0'}
            />
          </div>
        )}
        <Button onClick={this.submitSearch} type="submit" variant="primary">
          Submit
        </Button>
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

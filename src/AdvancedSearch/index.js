import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'Store/AdvancedSearch/constants'
import * as cl from 'Store/AdvancedSearch/classes'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { connect } from 'react-redux'
import { getAdvancedSearch } from 'Store/AdvancedSearch/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import AdvancedSearchSentence from 'AdvancedSearch/Sentence'
import BuildingHistoryTable from 'BuildingLookup/BuildingHistoryTable'
import { addBoundary, updateBoundary } from 'Store/AdvancedSearch/actions'
import { addHousingType, updateHousingType } from 'Store/AdvancedSearch/actions'

import { Button } from 'react-bootstrap'

import Condition from 'AdvancedSearch/Condition'
import BoundaryQuery from 'AdvancedSearch/BoundaryQuery'
import HousingTypeQuery from 'AdvancedSearch/HousingTypeQuery'

export class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)

    this.submitSearch = this.submitSearch.bind(this)
    this.changeBoundary = this.changeBoundary.bind(this)
    this.addBoundary = this.addBoundary.bind(this)
  }

  addBoundary(option) {
    this.props.dispatch(addBoundary(new cl.Boundary(option.value)))
  }

  changeBoundary(index, boundary, option) {
    boundary[option.value.type] = option.value.value
    this.props.dispatch(updateBoundary(index, boundary))
  }

  addHousingType(option) {
    this.props.dispatch(addHousingType({ object: option.value }))
  }

  changeHousingTypeObject(option, index) {
    this.props.dispatch(updateHousingType(index, { object: option.value, id: undefined }))
  }

  changeHousingTypeId(option, index) {
    this.props.dispatch(updateHousingType(index, { id: option.value }))
  }

  submitSearch(e) {
    e.preventDefault()
    e.stopPropagation()

    this.props.dispatch(requestWithAuth(getAdvancedSearch()))
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
              changeBoundary={this.changeBoundary}
            />
            <HousingTypeQuery
              addBoundary={this.addBoundary}
              housingTypes={this.props.advancedSearch.boundaries}
              changeBoundary={this.changeBoundary}
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

import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'Store/AdvancedSearch/constants'
import { Boundary } from 'shared/classes/Boundary'
import { HousingType } from 'shared/classes/HousingType'
import { StandardizedInput } from 'shared/classes/StandardizedInput'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { connect } from 'react-redux'
import { getAdvancedSearch } from 'Store/AdvancedSearch/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import AdvancedSearchSentence from 'AdvancedSearch/Sentence'
import BuildingHistoryTable from 'BuildingLookup/BuildingHistoryTable'
import { addBoundary, updateBoundary } from 'Store/AdvancedSearch/actions'
import { addHousingType, updateHousingType } from 'Store/AdvancedSearch/actions'

import { Form, Button, Row, Col } from 'react-bootstrap'

import ConditionComponent from 'AdvancedSearch/ConditionComponent'
import BoundaryQuery from 'AdvancedSearch/BoundaryQuery'
import HousingTypeQuery from 'AdvancedSearch/HousingTypeQuery'

export class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)

    this.submitSearch = this.submitSearch.bind(this)
    this.changeBoundary = this.changeBoundary.bind(this)
    this.addBoundary = this.addBoundary.bind(this)
    this.addHousingType = this.addHousingType.bind(this)
    this.changeHousingType = this.changeHousingType.bind(this)
  }

  addBoundary(e) {
    e = new StandardizedInput(e)
    this.props.dispatch(addBoundary(new Boundary(e.value)))
  }

  changeBoundary(index, boundary, e) {
    e = new StandardizedInput(e)
    boundary[e.key] = e.value
    this.props.dispatch(updateBoundary(index, boundary))
  }

  addHousingType(e) {
    e = new StandardizedInput(e)
    const newHousingType = new HousingType({ housingType: e.value })
    this.props.dispatch(addHousingType(newHousingType))
  }

  changeHousingType(housingTypeIndex, e) {
    e = new StandardizedInput(e)
    const newHousingType = new HousingType({ housingType: e.value })

    this.props.dispatch(updateHousingType(housingTypeIndex, newHousingType))
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
            <Col xs={12} md={8}>
              <BoundaryQuery
                addBoundary={this.addBoundary}
                boundaries={this.props.advancedSearch.boundaries}
                boards={this.props.boards}
                districts={this.props.districts}
                changeBoundary={this.changeBoundary}
              />
              <HousingTypeQuery
                addHousingType={this.addHousingType}
                changeHousingType={this.changeHousingType}
                housingTypes={this.props.advancedSearch.housingTypes}
                dispatch={this.props.dispatch}
              />

              <ConditionComponent
                conditions={this.props.advancedSearch.conditions}
                condition={this.props.advancedSearch.conditions[0]}
                dispatch={this.props.dispatch}
                key={'condition-0'}
                conditionKey={'0'}
              />
            </Col>
          </Row>
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
    boards: state.community.boards,
    districts: state.council.districts,
    error: errorSelector(state),
    loading: loadingSelector(state),
  }
}

export default connect(mapStateToProps)(AdvancedSearch)

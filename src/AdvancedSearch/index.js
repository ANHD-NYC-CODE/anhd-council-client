import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'Store/AdvancedSearch/constants'
import { Boundary } from 'Store/AdvancedSearch/classes/Boundary'
import { HousingType } from 'Store/AdvancedSearch/classes/HousingType'

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
    this.addHousingType = this.addHousingType.bind(this)
    this.changeHousingType = this.changeHousingType.bind(this)
    this.changeHousingTypeParam = this.changeHousingTypeParam.bind(this)
    this.addHousingTypeParamMapping = this.addHousingTypeParamMapping.bind(this)
    this.removeParamsObject = this.removeParamsObject.bind(this)
  }

  addBoundary(option) {
    this.props.dispatch(addBoundary(new Boundary(option.value)))
  }

  changeBoundary(index, boundary, option) {
    boundary[option.value.key] = option.value.value
    this.props.dispatch(updateBoundary(index, boundary))
  }

  addHousingType(option) {
    const newHousingType = new HousingType(option.value)
    this.props.dispatch(addHousingType(newHousingType))
  }

  changeHousingType(housingTypeIndex, housingType, option) {
    const newHousingType = new HousingType(option.value.value)

    this.props.dispatch(updateHousingType(housingTypeIndex, newHousingType))
  }

  addHousingTypeParamMapping(housingTypeIndex, paramsMappingKey, paramMapIndex) {
    const housingType = this.props.advancedSearch.housingTypes[housingTypeIndex]
    housingType.addParamMapping(paramsMappingKey, paramMapIndex)
    this.props.dispatch(updateHousingType(housingTypeIndex, housingType))
  }

  changeHousingTypeParam(housingTypeIndex, paramObjectKey, paramMapIndex, e) {
    // Converty multi select into a standardized Input object
    if (Array.isArray(e)) {
      if (e.length) {
        e = { name: e[0].name, value: e.map(v => v.value).join(',') }
      } else {
        e = { name: 'value', value: '' }
      }
    }
    const housingType = this.props.advancedSearch.housingTypes[housingTypeIndex]
    const standarizedInputObject = { name: e.name, value: e.value }
    housingType.updateParamMapping(paramObjectKey, paramMapIndex, standarizedInputObject)
    this.props.dispatch(updateHousingType(housingTypeIndex, housingType))
  }

  removeParamsObject(housingTypeIndex, paramObjectKey, paramMapIndex) {
    const housingType = this.props.advancedSearch.housingTypes[housingTypeIndex]
    housingType.removeParamMapping(paramObjectKey, paramMapIndex)
    this.props.dispatch(updateHousingType(housingTypeIndex, housingType))
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
              addHousingType={this.addHousingType}
              addHousingTypeParamMapping={this.addHousingTypeParamMapping}
              housingTypes={this.props.advancedSearch.housingTypes}
              changeHousingType={this.changeHousingType}
              changeHousingTypeParam={this.changeHousingTypeParam}
              removeParamsObject={this.removeParamsObject}
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

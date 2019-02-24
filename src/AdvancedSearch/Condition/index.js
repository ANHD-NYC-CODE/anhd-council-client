import React from 'react'
import PropTypes from 'prop-types'
import * as d from 'shared/constants/datasets'
import { addFilter } from 'Store/AdvancedSearch/actions'
import { addNewCondition, removeLastCondition } from 'Store/AdvancedSearch/actions'

import Filter from 'AdvancedSearch/Filter'

import './style.scss'

class Condition extends React.Component {
  constructor(props) {
    super(props)

    this.addNewFilter = this.addNewFilter.bind(this)
    this.removeFilter = this.removeFilter.bind(this)
    this.addCondition = this.addCondition.bind(this)
    this.removeCondition = this.removeCondition.bind(this)
    this.containsCondition = this.containsCondition.bind(this)
  }

  addCondition() {
    this.props.dispatch(addNewCondition(this.props.index))
  }

  removeCondition() {
    this.props.dispatch(removeLastCondition())
  }

  containsCondition() {
    return this.props.condition.filters.find(filter => filter.conditionGroup)
  }

  addNewFilter() {
    const filter = {
      dataset: d.HPDVIOLATIONS,
    }
    this.props.dispatch(addFilter(this.props.index, filter))
  }
  removeFilter() {}

  render() {
    const renderFilterOrCondition = (filter, index) => {
      if (filter.conditionGroup) {
        return (
          <Condition
            key={`condition-${this.props.index + 1}`}
            conditions={this.props.conditions}
            condition={this.props.conditions[this.props.index + 1]}
            dispatch={this.props.dispatch}
            index={this.props.index + 1}
          />
        )
      } else {
        return <Filter key={`filter-${this.props.index}-${index}`} filter={filter} />
      }
    }

    return (
      <div className="condition">
        <h1>{this.props.condition.type}</h1>
        {!this.containsCondition() && <button onClick={() => this.addCondition()}>Add Condition</button>}
        {this.props.index !== 0 && this.props.index === this.props.conditions.length - 1 && (
          <button onClick={() => this.props.dispatch(removeLastCondition())}>Remove Condition</button>
        )}

        <button onClick={this.addNewFilter}>Add Filter</button>
        {this.props.condition.filters.map((filter, index) => {
          return renderFilterOrCondition(filter, index)
        })}
      </div>
    )
  }
}

Condition.propTypes = {
  condition: PropTypes.object,
  conditions: PropTypes.array,
  dispatch: PropTypes.func,
  index: PropTypes.number,
}

export default Condition

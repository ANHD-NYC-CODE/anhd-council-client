import React from 'react'
import PropTypes from 'prop-types'
import * as d from 'shared/constants/datasets'
import { addNewCondition, removeLastCondition } from 'Store/AdvancedSearch/actions'

import Filter from 'AdvancedSearch/Filter'

import './style.scss'

class Condition extends React.Component {
  constructor(props) {
    super(props)

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

  render() {
    const renderFilterOrCondition = (filter, filterIndex) => {
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
        return (
          <Filter
            conditionIndex={this.props.index}
            dataset={Object.entries(d).find(ds => ds[1] == filter.dataset)[1]}
            dispatch={this.props.dispatch}
            filter={filter}
            filterIndex={filterIndex}
            filterModel={Object.entries(d).find(ds => ds[1] == filter.dataset)[1].filter}
            key={`filter-${this.props.index}-${filter.type}`}
          />
        )
      }
    }

    return (
      <div className="condition">
        <h1>{this.props.condition.type}</h1>
        {!this.containsCondition() && <button onClick={() => this.addCondition()}>Add Condition</button>}

        {this.props.index !== 0 && this.props.index === this.props.conditions.length - 1 && (
          <button onClick={() => this.props.dispatch(removeLastCondition())}>Remove Condition</button>
        )}

        {this.props.condition.filters.map((filter, index) => {
          return renderFilterOrCondition(filter, index)
        })}

        <Filter dispatch={this.props.dispatch} conditionIndex={this.props.index} />
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

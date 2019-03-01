import React from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import * as d from 'shared/constants/datasets'
import { addNewCondition, removeCondition } from 'Store/AdvancedSearch/actions'
import { Button } from 'react-bootstrap'

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
    this.props.dispatch(addNewCondition(this.props.conditionKey, uuidv4()))
  }

  removeCondition() {
    this.props.dispatch(removeCondition(this.props.conditionKey))
  }

  containsCondition() {
    return this.props.condition.filters.find(filter => filter.conditionGroup)
  }

  render() {
    const renderFilterOrCondition = (filter, filterIndex) => {
      if (filter.conditionGroup) {
        return (
          <Condition
            key={`condition-${this.props.conditionKey}`}
            conditions={this.props.conditions}
            condition={this.props.conditions[filter.conditionGroup]}
            dispatch={this.props.dispatch}
            conditionKey={filter.conditionGroup}
          />
        )
      } else {
        return (
          <Filter
            conditionIndex={this.props.conditionKey}
            dataset={Object.entries(d).find(ds => ds[1] == filter.dataset)[1]}
            dispatch={this.props.dispatch}
            filter={filter}
            filterIndex={filterIndex}
            filterModel={Object.entries(d).find(ds => ds[1] == filter.dataset)[1].filter}
            key={`filter-${this.props.conditionKey}-${filter.dataset.name}`}
          />
        )
      }
    }

    return (
      <div className="condition">
        <h1>{this.props.condition.type}</h1>
        <Button onClick={() => this.addCondition()} variant="outline-primary">
          Add Condition
        </Button>

        {this.props.conditionKey !== '0' && (
          <Button onClick={() => this.removeCondition()} variant="outline-danger">
            Remove Condition
          </Button>
        )}

        {this.props.condition.filters.map((filter, conditionKey) => {
          return renderFilterOrCondition(filter, conditionKey)
        })}

        <Filter dispatch={this.props.dispatch} conditionIndex={this.props.conditionKey} />
      </div>
    )
  }
}

Condition.propTypes = {
  condition: PropTypes.object,
  conditions: PropTypes.array,
  dispatch: PropTypes.func,
  conditionKey: PropTypes.string,
}

export default Condition

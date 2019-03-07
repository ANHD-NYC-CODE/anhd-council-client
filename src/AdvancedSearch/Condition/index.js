import React from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import { addNewCondition, updateCondition, removeCondition } from 'Store/AdvancedSearch/actions'
import { Button } from 'react-bootstrap'

import FilterComponent from 'AdvancedSearch/Filter'

import './style.scss'

export class Condition extends React.Component {
  constructor(props) {
    super(props)

    this.addCondition = this.addCondition.bind(this)
    this.removeCondition = this.removeCondition.bind(this)
    this.containsCondition = this.containsCondition.bind(this)
    this.dispatchAction = this.dispatchAction.bind(this)
  }

  addCondition() {
    this.props.dispatch(addNewCondition(this.props.conditionKey, uuidv4()))
  }

  dispatchAction() {
    this.props.dispatch(updateCondition(this.props.conditionKey, this.props.condition))
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
            key={`condition-${this.props.conditionKey}-${filterIndex}`}
            conditions={this.props.conditions}
            condition={this.props.conditions[filter.conditionGroup]}
            dispatch={this.props.dispatch}
            conditionKey={filter.conditionGroup}
          />
        )
      } else {
        return (
          <FilterComponent
            dispatchAction={this.dispatchAction}
            conditionKey={this.props.conditionKey}
            condition={this.props.condition}
            dataset={filter.dataset}
            dispatch={this.props.dispatch}
            filter={filter}
            filterIndex={filterIndex}
            key={`filter-${this.props.conditionKey}-${filter.dataset.apiMap.name}`}
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

        <FilterComponent
          dispatchAction={this.dispatchAction}
          dispatch={this.props.dispatch}
          conditionKey={this.props.conditionKey}
          condition={this.props.condition}
        />
      </div>
    )
  }
}

Condition.propTypes = {
  condition: PropTypes.object,
  conditions: PropTypes.object,
  dispatch: PropTypes.func,
  conditionKey: PropTypes.string,
}

export default Condition

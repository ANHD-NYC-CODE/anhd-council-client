import React from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import { addNewCondition, updateCondition, removeCondition } from 'Store/AdvancedSearch/actions'
import { Button } from 'react-bootstrap'

import FilterComponent from 'AdvancedSearch/FilterComponent'

import './style.scss'

export class ConditionComponent extends React.Component {
  constructor(props) {
    super(props)

    this.addCondition = this.addCondition.bind(this)
    this.removeCondition = this.removeCondition.bind(this)
    this.containsCondition = this.containsCondition.bind(this)
    this.dispatchAction = this.dispatchAction.bind(this)
  }

  addCondition() {
    this.props.dispatch(addNewCondition(this.props.condition.key, uuidv4()))
  }

  dispatchAction() {
    this.props.dispatch(updateCondition(this.props.condition.key, this.props.condition))
  }

  removeCondition() {
    this.props.dispatch(removeCondition(this.props.condition.key))
  }

  containsCondition() {
    return this.props.condition.filters.find(filter => filter.conditionGroup)
  }

  render() {
    const renderFilterOrCondition = (filter, filterIndex) => {
      if (filter.conditionGroup) {
        return (
          <ConditionComponent
            key={`condition-${this.props.condition.key}-${filterIndex}`}
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
            conditionKey={this.props.condition.key}
            condition={this.props.condition}
            dataset={filter.dataset}
            dispatch={this.props.dispatch}
            filter={filter}
            filterIndex={filterIndex}
            key={`filter-${this.props.condition.key}-${filter.dataset.apiMap.name}`}
          />
        )
      }
    }

    return (
      <div className="condition">
        <h1>{this.props.condition.type}</h1>
        {!this.props.condition.hasCondition() && (
          <Button
            className="add-condition"
            onClick={() => this.addCondition(this.props.condition.key)}
            variant="outline-primary"
          >
            Add Condition
          </Button>
        )}

        {this.props.condition.key !== '0' && (
          <Button
            className="remove-condition"
            onClick={() => this.removeCondition(this.props.condition.key)}
            variant="outline-danger"
          >
            Remove Condition
          </Button>
        )}

        {this.props.condition.filters.map((filter, conditionKey) => {
          return renderFilterOrCondition(filter, conditionKey)
        })}

        <FilterComponent
          dispatchAction={this.dispatchAction}
          dispatch={this.props.dispatch}
          conditionKey={this.props.condition.key}
          condition={this.props.condition}
        />
      </div>
    )
  }
}

ConditionComponent.propTypes = {
  condition: PropTypes.object,
  conditions: PropTypes.object,
  dispatch: PropTypes.func,
}

export default ConditionComponent

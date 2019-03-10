import React from 'react'
import PropTypes from 'prop-types'
import { Filter } from 'shared/classes/Filter'
import { StandardizedInput } from 'shared/classes/StandardizedInput'
import NewFilterSelect from 'AdvancedSearch/FilterComponent/NewFilterSelect'
import uuidv4 from 'uuid/v4'
import { addNewCondition, updateCondition, removeCondition } from 'Store/AdvancedSearch/actions'
import { Form, Button, Badge, Col, ButtonGroup } from 'react-bootstrap'

import FilterComponent from 'AdvancedSearch/FilterComponent'

import './style.scss'

export class ConditionComponent extends React.Component {
  constructor(props) {
    super(props)

    this.addCondition = this.addCondition.bind(this)
    this.removeCondition = this.removeCondition.bind(this)
    this.containsCondition = this.containsCondition.bind(this)
    this.dispatchAction = this.dispatchAction.bind(this)
    this.replaceFilter = this.replaceFilter.bind(this)
    this.createNewFilter = this.createNewFilter.bind(this)
    this.switchCondition = this.switchCondition.bind(this)

    this.state = {
      creatingFilter: false,
    }
  }

  addCondition(filter) {
    this.props.dispatch(addNewCondition(this.props.condition.key, uuidv4(), filter))
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

  createNewFilter() {
    const newFilter = new Filter({ datasetConstant: 'NEW_FILTER' })
    this.props.condition.addFilter({ filter: newFilter })
    this.dispatchAction()
  }

  replaceFilter(filterIndex, e) {
    e = new StandardizedInput(e)
    const newFilter = new Filter({ datasetConstant: e.value })
    this.props.condition.replaceFilter({ filterIndex, filter: newFilter })
    this.dispatchAction()
  }

  switchCondition() {
    const e = new StandardizedInput({ value: this.props.condition.type })
    this.props.condition.toggleAndOrConditionType(e)
    this.dispatchAction()
  }

  render() {
    const isCondition0 = () => {
      return this.props.condition.key === '0'
    }

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
      } else if (filter.id === 'NEW_FILTER') {
        return (
          <NewFilterSelect
            filterIndex={filterIndex}
            onChange={this.replaceFilter}
            key={`new-filter-${this.props.condition.key}-${filter.id}`}
          />
        )
      } else {
        return (
          <FilterComponent
            addCondition={this.addCondition}
            allowNewCondition={isCondition0() || (!isCondition0() && !this.props.condition.hasCondition())}
            dispatchAction={this.dispatchAction}
            condition={this.props.condition}
            dispatch={this.props.dispatch}
            filter={filter}
            filterIndex={filterIndex}
            key={`filter-${this.props.condition.key}-${filter.id}`}
          />
        )
      }
    }

    return (
      <Form.Row className="condition">
        <Col xs={2} className="condition-control flex-column align-center">
          <ButtonGroup vertical>
            {isCondition0() && !this.props.condition.hasCondition() ? (
              <Button className="switch-condition" size="sm" onClick={() => this.switchCondition()}>
                {this.props.condition.type}
              </Button>
            ) : (
              <Button size="sm" disabled>
                {this.props.condition.type}
              </Button>
            )}
            {/* {(isCondition0() || (!isCondition0() && !this.props.condition.hasCondition())) && (
              <Button
                className="add-condition"
                size="sm"
                onClick={() => this.addCondition(this.props.condition.key)}
                variant="outline-primary"
              >
                + {this.props.condition.isAnd() ? 'OR' : 'AND'}
              </Button>
            )} */}
            {!isCondition0() && (
              <Button
                className="remove-condition"
                size="sm"
                onClick={() => this.removeCondition(this.props.condition.key)}
                variant="outline-danger"
              >
                - {this.props.condition.type.toUpperCase()}
              </Button>
            )}
            <Button className="add-filter" size="sm" onClick={() => this.createNewFilter()} variant="success">
              +
            </Button>
          </ButtonGroup>
        </Col>
        <Col xs={10}>
          {this.props.condition.filters.map((filter, conditionKey) => {
            return renderFilterOrCondition(filter, conditionKey)
          })}
        </Col>
      </Form.Row>
    )
  }
}

ConditionComponent.propTypes = {
  condition: PropTypes.object,
  conditions: PropTypes.object,
  dispatch: PropTypes.func,
}

export default ConditionComponent

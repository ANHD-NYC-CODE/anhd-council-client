import React from 'react'
import PropTypes from 'prop-types'
import { Filter } from 'shared/classes/Filter'
import { StandardizedInput } from 'shared/classes/StandardizedInput'
import NewFilterSelect from 'AdvancedSearch/FilterComponent/NewFilterSelect'
import uuidv4 from 'uuid/v4'
import { addNewCondition, updateCondition, removeCondition } from 'Store/AdvancedSearch/actions'
import { Form, Button, Col, ButtonGroup } from 'react-bootstrap'

import FilterComponent from 'AdvancedSearch/FilterComponent'

import './style.scss'

export class ConditionComponent extends React.Component {
  constructor(props) {
    super(props)

    this.addCondition = this.addCondition.bind(this)
    this.removeCondition = this.removeCondition.bind(this)
    this.dispatchAction = this.dispatchAction.bind(this)
    this.replaceFilter = this.replaceFilter.bind(this)
    this.createNewFilter = this.createNewFilter.bind(this)
    this.switchCondition = this.switchCondition.bind(this)

    this.state = {
      creatingFilter: false,
    }
  }

  addCondition(filterIndex = undefined) {
    this.props.dispatch(addNewCondition(this.props.condition.key, uuidv4(), filterIndex))
  }

  dispatchAction() {
    this.props.condition.clearErrors()
    if (this.props.condition.errors.length) {
      this.props.validateForm()
    }
    this.props.dispatch(updateCondition(this.props.condition.key, this.props.condition))
  }

  removeCondition() {
    this.props.dispatch(removeCondition(this.props.condition.key))
  }

  createNewFilter() {
    const newFilter = new Filter({ modelConstant: 'NEW_FILTER', model: { schema: {} } })
    this.props.condition.addFilter({ filter: newFilter })
    this.dispatchAction()
  }

  replaceFilter(filterIndex, e) {
    e = new StandardizedInput(e)
    const model = this.props.config.datasetModels.find(ds => ds.id === e.value)
    const newFilter = new Filter({ model })
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
            condition={this.props.conditions[filter.conditionGroup]}
            conditions={this.props.conditions}
            conditionKey={filter.conditionGroup}
            config={this.props.config}
            dispatch={this.props.dispatch}
          />
        )
      } else if (filter.id === 'NEW_FILTER') {
        return (
          <NewFilterSelect
            filter={filter}
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
            condition={this.props.condition}
            datasetModels={this.props.datasetModels}
            dispatch={this.props.dispatch}
            dispatchAction={this.dispatchAction}
            filter={filter}
            filterIndex={filterIndex}
            key={`filter-${this.props.condition.key}-${filter.id}`}
            replaceFilter={this.replaceFilter}
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
            {this.props.condition.filters.some(filter => filter.id === 'NEW_FILTER') ? (
              <Button
                className="remove-add-filter"
                size="sm"
                onClick={() =>
                  this.props.condition.removeNewFilters({
                    dispatchAction: this.dispatchAction,
                  })
                }
                variant="warning"
              >
                X
              </Button>
            ) : (
              <Button className="add-filter" size="sm" onClick={() => this.createNewFilter()} variant="success">
                +
              </Button>
            )}
          </ButtonGroup>
        </Col>
        <Col xs={10}>
          {this.props.condition.filters.map((filter, conditionKey) => {
            return renderFilterOrCondition(filter, conditionKey)
          })}
          {!!this.props.condition.errors.length && (
            <Form.Text className="text-danger" type="invalid">
              {this.props.condition.errors[0].message}
            </Form.Text>
          )}
        </Col>
      </Form.Row>
    )
  }
}

ConditionComponent.propTypes = {
  condition: PropTypes.object,
  conditions: PropTypes.object,
  dispatch: PropTypes.func,
  datasetModels: PropTypes.array,
  validateForm: PropTypes.func,
}

export default ConditionComponent

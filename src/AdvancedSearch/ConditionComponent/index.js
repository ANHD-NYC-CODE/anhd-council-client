import React from 'react'
import PropTypes from 'prop-types'
import { Filter } from 'shared/classes/Filter'
import { StandardizedInput } from 'shared/classes/StandardizedInput'
import NewFilterSelect from 'AdvancedSearch/FilterComponent/NewFilterSelect'
import uuidv4 from 'uuid/v4'
import { addNewCondition, updateCondition, removeCondition } from 'Store/AdvancedSearch/actions'
import { Form, Button, Col, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import FormError from 'shared/components/FormError'
import FilterComponent from 'AdvancedSearch/FilterComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

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
    this.standardFilters = this.standardFilters.bind(this)
    this.newFilterFilter = this.newFilterFilter.bind(this)
    this.conditionGroupFilters = this.conditionGroupFilters.bind(this)
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

  switchCondition(value) {
    this.props.condition.type = value
    this.dispatchAction()
  }

  standardFilters() {
    return this.props.condition.filters.filter(filter => !filter.conditionGroup && filter.id !== 'NEW_FILTER')
  }

  newFilterFilter() {
    return this.props.condition.filters.filter(filter => filter.id == 'NEW_FILTER')
  }

  conditionGroupFilters() {
    return this.props.condition.filters.filter(filter => !!filter.conditionGroup)
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
            key={`new-filter-${this.props.condition.key}-${filter.id}-${filterIndex}`}
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
            key={`filter-${this.props.condition.key}-${filter.id}-${filterIndex}`}
            replaceFilter={this.replaceFilter}
          />
        )
      }
    }

    return (
      <Form.Row className="condition">
        <Col xs={2} className="condition-control flex-column align-self-center">
          <div className="condition-control-column d-flex flex-column">
            {isCondition0() && !this.props.condition.hasCondition() ? (
              <DropdownButton
                className="control-button"
                as={ButtonGroup}
                title={this.props.condition.type}
                size="lg"
                variant="success"
                id="bg-vertical-dropdown-1"
              >
                <Dropdown.Item
                  className="control-button"
                  eventKey="1"
                  size="lg"
                  onClick={() => this.switchCondition('AND')}
                >
                  And
                </Dropdown.Item>
                <Dropdown.Item
                  className="control-button"
                  eventKey="2"
                  size="lg"
                  onClick={() => this.switchCondition('OR')}
                >
                  Or
                </Dropdown.Item>
              </DropdownButton>
            ) : (
              <Button className="control-button" size="lg" variant="success" disabled>
                {this.props.condition.type}
              </Button>
            )}
            {!isCondition0() && (
              <Button
                className="control-button remove-condition"
                size="lg"
                onClick={() => this.removeCondition(this.props.condition.key)}
                variant="outline-danger"
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
            )}
          </div>
        </Col>
        <Col xs={10}>
          <FormError
            show={!!this.props.condition.errors.length}
            message={(this.props.condition.errors[0] || {}).message}
          />

          {this.standardFilters().map(filter => {
            return renderFilterOrCondition(filter, this.props.condition.filters.indexOf(filter))
          })}

          {this.newFilterFilter().map(filter => {
            return renderFilterOrCondition(filter, this.props.condition.filters.indexOf(filter))
          })}

          <div className="new-filter-row d-flex my-2">
            {this.props.condition.filters.some(filter => filter.id === 'NEW_FILTER') ? (
              <Button
                className="remove-add-filter"
                size="lg"
                onClick={() =>
                  this.props.condition.removeNewFilters({
                    dispatchAction: this.dispatchAction,
                  })
                }
                variant="warning"
              >
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </Button>
            ) : (
              <Button
                className="add-filter"
                size="lg"
                onClick={e => {
                  e.preventDefault()
                  this.createNewFilter()
                }}
                variant="success"
              >
                <FontAwesomeIcon icon={faPlus} /> New filter
              </Button>
            )}
          </div>

          {this.conditionGroupFilters().map(filter => {
            return renderFilterOrCondition(filter, this.props.condition.filters.indexOf(filter))
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
  datasetModels: PropTypes.array,
  validateForm: PropTypes.func,
}

export default ConditionComponent

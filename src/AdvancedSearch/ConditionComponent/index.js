import React from 'react'
import PropTypes from 'prop-types'
import Filter from 'shared/classes/Filter'
import StandardizedInput from 'shared/classes/StandardizedInput'
import NewFilterSelect from 'AdvancedSearch/FilterComponent/NewFilterSelect'
import uuidv4 from 'uuid/v4'
import { addNewConditionGroup, updateCondition, removeCondition } from 'Store/AdvancedSearch/actions'
import { Form, Button, Col } from 'react-bootstrap'
import FormError from 'shared/components/FormError'
import FilterComponent from 'AdvancedSearch/FilterComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import AddFilterButtonGroup from 'AdvancedSearch/ConditionComponent/AddFilterButtonGroup'
import ConditionControlGroup from 'AdvancedSearch/ConditionComponent/ConditionControlGroup'

import SwitchConditionButton from 'AdvancedSearch/ConditionComponent/SwitchConditionButton'

import './style.scss'

export class ConditionComponent extends React.Component {
  constructor(props) {
    super(props)

    this.addConditionGroup = this.addConditionGroup.bind(this)
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

  addConditionGroup() {
    this.props.dispatch(
      addNewConditionGroup({
        parentKey: this.props.condition.key,
        conditionKey: uuidv4(),
        filters: this.props.condition.filters,
      })
    )
    this.createNewFilter()
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
    const newFilter = new Filter({ modelConstant: 'NEW_FILTER', resourceModel: { schema: {} } })
    this.props.condition.addFilter({ filter: newFilter })
    this.dispatchAction()
  }

  replaceFilter(filterIndex, e) {
    e = new StandardizedInput(e)
    const advancedSearchFilter = Object.values(this.props.config.advancedSearchFilters).find(
      aFilter => aFilter.resourceModel.resourceConstant === e.value
    )

    const newFilter = new Filter({
      primaryResourceModel: this.props.config.resourceModels['PROPERTY'],
      resourceModel: advancedSearchFilter.resourceModel,
      schema: advancedSearchFilter.resourceModel.ownResourceFilters,
    })
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
          <div className="form-row__container" key={`condition-${this.props.condition.key}-${filterIndex}`}>
            <ConditionComponent
              condition={this.props.conditions[filter.conditionGroup]}
              conditions={this.props.conditions}
              conditionKey={filter.conditionGroup}
              config={this.props.config}
              dispatch={this.props.dispatch}
              showPopups={this.props.showPopups}
              parentCondition={this.props.condition}
            />
          </div>
        )
      } else if (filter.id === 'NEW_FILTER') {
        return (
          <div className="form-row__container" key={`new-filter-select-${filterIndex}`}>
            <div className="w-50">
              <NewFilterSelect
                filter={filter}
                filterIndex={filterIndex}
                onChange={this.replaceFilter}
                key={`new-filter-${this.props.condition.key}-${filter.id}-${filterIndex}`}
              />
            </div>
          </div>
        )
      } else {
        return (
          <div className="form-row__container" key={`filter-${this.props.condition.key}-${filter.id}-${filterIndex}`}>
            <FilterComponent
              addCondition={this.addConditionGroup}
              allowNewCondition={isCondition0() || (!isCondition0() && !this.props.condition.hasCondition())}
              condition={this.props.condition}
              config={this.props.config}
              dispatch={this.props.dispatch}
              dispatchAction={this.dispatchAction}
              filter={filter}
              filterIndex={filterIndex}
              showPopups={this.props.showPopups}
              replaceFilter={this.replaceFilter}
            />
          </div>
        )
      }
    }

    return (
      <div className="condition">
        {((this.props.condition.key === '0' &&
          this.props.condition.filters.filter(f => f.id !== 'NEW_FILTER').length > 1) ||
          this.props.condition.key !== '0') && (
          <Form.Row className="switch-condition-row">
            <Col xs={12} sm={8} className="align-items-center d-flex">
              <div>
                {this.props.condition.key !== '0' && this.props.parentCondition.type.toLowerCase() + ' '}
                Properties with{' '}
                <SwitchConditionButton
                  showPopups={this.props.showPopups}
                  condition={this.props.condition}
                  switchCondition={this.switchCondition}
                />{' '}
                of the following:
              </div>
            </Col>
            <Col xs={12} sm={4}>
              <ConditionControlGroup
                condition={this.props.condition}
                addCondition={this.addConditionGroup}
                showPopups={this.props.showPopups}
                removeCondition={this.removeCondition}
              />
            </Col>
          </Form.Row>
        )}
        <Form.Row>
          {!isCondition0() && (
            <Col className="form-row__connection-container condition-connection d-flex flex-column">
              <div className="form-row__connection" />
              <div className="form-row__connection" />
            </Col>
          )}

          <Col xs={9} sm={10} className="d-flex flex-column justify-content-center">
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

            {this.conditionGroupFilters().map(filter => {
              return renderFilterOrCondition(filter, this.props.condition.filters.indexOf(filter))
            })}
            <div className="new-filter-row d-flex">
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
                <AddFilterButtonGroup
                  condition={this.props.condition}
                  createNewFilter={this.createNewFilter}
                  showPopups={this.props.showPopups}
                  switchCondition={this.switchCondition}
                />
              )}
            </div>
          </Col>
        </Form.Row>
      </div>
    )
  }
}

ConditionComponent.propTypes = {
  config: PropTypes.object,
  condition: PropTypes.object,
  conditions: PropTypes.object,
  dispatch: PropTypes.func,
  validateForm: PropTypes.func,
}

export default ConditionComponent

import React from 'react'
import PropTypes from 'prop-types'
import Filter from 'shared/classes/Filter'
import StandardizedInput from 'shared/classes/StandardizedInput'
import NewFilterSelect from 'AdvancedSearch/FilterComponent/NewFilterSelect'
import { v4 as uuidv4 } from 'uuid'
import { addNewConditionGroup, removeConditionGroup } from 'Store/AdvancedSearch/actions'
import FormError from 'shared/components/FormError'
import FilterComponent from 'AdvancedSearch/FilterComponent'
import AddFilterButtonGroup from 'AdvancedSearch/ConditionComponent/AddFilterButtonGroup'
import {
  fireCustomSearchSelectFilterEvent,
  fireCustomSearchSwitchConditionEvent,
  fireCustomSearchAddConditionGroupEvent,
} from 'Store/Analytics/actions'
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
    this.props.dispatch(fireCustomSearchAddConditionGroupEvent())
  }

  dispatchAction() {
    this.props.condition.clearErrors()
    if (this.props.condition.errors.length) {
      this.props.validateForm()
    }

    this.props.dispatchAction()
    // this.props.dispatch(updateCondition(this.props.condition.key, this.props.condition))
  }

  removeCondition() {
    this.props.dispatch(removeConditionGroup(this.props.condition.key, this.props.parentCondition.key))
  }

  createNewFilter() {
    this.props.condition.removeNewFilters()
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
    this.props.dispatch(fireCustomSearchSelectFilterEvent(newFilter.resourceModel.label))
  }

  switchCondition(value) {
    this.props.condition.type = value
    this.dispatchAction()
    // only track if filters are already added since we want to track
    // the condition type of this filter.
    this.props.dispatch(fireCustomSearchSwitchConditionEvent(value))
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
            <NewFilterSelect
              filter={filter}
              filterIndex={filterIndex}
              onChange={this.replaceFilter}
              removeNewFilters={() =>
                this.props.condition.removeNewFilters({
                  dispatchAction: this.dispatchAction,
                })
              }
              key={`new-filter-${this.props.condition.key}-${filter.id}-${filterIndex}`}
            />
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
            {this.props.condition.key === '0' &&
              this.props.condition.filters.filter(f => f.id !== 'NEW_FILTER').length > 1 &&
              filter !== this.props.condition.filters[this.props.condition.filters.length - 1] && (
                <div className="switch-condition-row">
                  {this.props.condition.key !== '0' && this.props.parentCondition.type.toLowerCase() + ' '}{' '}
                  <SwitchConditionButton
                    showPopups={this.props.showPopups}
                    condition={this.props.condition}
                    switchCondition={this.switchCondition}
                  />{' '}
                </div>
              )}
          </div>
        )
      }
    }

    return (
      <div className="condition">
        <div className="d-flex flex-column justify-content-center">
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
            {!this.props.condition.filters.some(filter => filter.id === 'NEW_FILTER') && (
              <AddFilterButtonGroup
                className={this.props.condition.filters.length > 0 ? 'new-filter__either' : ''}
                condition={this.props.condition}
                createNewFilter={this.createNewFilter}
                showPopups={this.props.showPopups}
                switchCondition={this.switchCondition}
              />
            )}
          </div>
        </div>
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

import React from 'react'
import PropTypes from 'prop-types'
import Filter from 'shared/classes/Filter'
import StandardizedInput from 'shared/classes/StandardizedInput'
import NewFilterSelect from 'AdvancedSearch/FilterComponent/NewFilterSelect'
import uuidv4 from 'uuid/v4'
import { addNewCondition, updateCondition, removeCondition } from 'Store/AdvancedSearch/actions'
import { Form, Button, Col } from 'react-bootstrap'
import FormError from 'shared/components/FormError'
import FilterComponent from 'AdvancedSearch/FilterComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import AddFilterButton from 'AdvancedSearch/ConditionComponent/AddFilterButton'
import AddConditionButton from 'AdvancedSearch/ConditionComponent/AddConditionButton'

import RemoveConditionButton from 'AdvancedSearch/ConditionComponent/RemoveConditionButton'
import SwitchConditionButton from 'AdvancedSearch/ConditionComponent/SwitchConditionButton'

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
              addCondition={this.addCondition}
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
      <Form.Row className="condition">
        {!isCondition0() && (
          <div className="form-row__connection-container condition-connection d-flex flex-column">
            <div className="form-row__connection" />
            <div className="form-row__connection" />
          </div>
        )}

        <Col xs={3} sm={2} className="condition-control flex-column align-self-center">
          <div className="condition-control-column d-flex align-items-center flex-column">
            {isCondition0() && !this.props.condition.hasCondition() ? (
              <SwitchConditionButton
                showPopups={this.props.showPopups}
                condition={this.props.condition}
                switchCondition={this.switchCondition}
              />
            ) : (
              <Button className="control-button" size="lg" variant="success" disabled>
                {this.props.condition.type}
              </Button>
            )}
            {!isCondition0() && (
              <RemoveConditionButton
                condition={this.props.condition}
                removeCondition={this.removeCondition}
                showPopups={this.props.showPopups}
              />
            )}
          </div>
        </Col>
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
              <AddFilterButton createNewFilter={this.createNewFilter} showPopups={this.props.showPopups} />
            )}
            {(isCondition0() || (!isCondition0() && !this.props.condition.hasCondition())) && (
              <AddConditionButton
                condition={this.props.condition}
                addCondition={this.addCondition}
                showPopups={this.props.showPopups}
              />
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
  config: PropTypes.object,
  condition: PropTypes.object,
  conditions: PropTypes.object,
  dispatch: PropTypes.func,
  validateForm: PropTypes.func,
}

export default ConditionComponent

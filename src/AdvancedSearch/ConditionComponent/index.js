import React from 'react'
import PropTypes from 'prop-types'
import * as d from 'shared/models/datasets'
import CustomSelect from 'shared/components/CustomSelect'
import { Filter } from 'shared/classes/Filter'
import { StandardizedInput } from 'shared/classes/StandardizedInput'

import uuidv4 from 'uuid/v4'
import { addNewCondition, changeConditionType, updateCondition, removeCondition } from 'Store/AdvancedSearch/actions'
import { Form, Button } from 'react-bootstrap'

import FilterComponent from 'AdvancedSearch/FilterComponent'

import './style.scss'

export class ConditionComponent extends React.Component {
  constructor(props) {
    super(props)

    this.addCondition = this.addCondition.bind(this)
    this.removeCondition = this.removeCondition.bind(this)
    this.containsCondition = this.containsCondition.bind(this)
    this.dispatchAction = this.dispatchAction.bind(this)
    this.constructFilter = this.constructFilter.bind(this)
    this.switchCondition = this.switchCondition.bind(this)

    this.state = {
      creatingFilter: false,
    }
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

  constructFilter(datasetConstant) {
    const newFilter = new Filter({ datasetConstant })
    this.props.condition.addFilter({ filter: newFilter })
    this.setState({ creatingFilter: false })
    this.dispatchAction()
  }

  switchCondition() {
    const e = new StandardizedInput({ value: this.props.condition.type })
    this.props.condition.toggleAndOrConditionType(e)
    this.dispatchAction()
  }

  render() {
    const datasetOptions = Object.entries(d).map(ds => {
      return {
        value: ds[1].id,
        label: ds[1].languageModule.noun,
      }
    })

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
        {this.props.condition.key === '0' && !this.props.condition.hasCondition() ? (
          <Button className="switch-condition" onClick={() => this.switchCondition()}>
            {this.props.condition.type}
          </Button>
        ) : (
          <Form.Label> {this.props.condition.type}</Form.Label>
        )}

        {!this.state.creatingFilter && (
          <Button className="add-filter" onClick={() => this.setState({ creatingFilter: true })} variant="success">
            +
          </Button>
        )}

        {(this.props.condition.key === '0' ||
          (this.props.condition.key !== '0' && !this.props.condition.hasCondition())) && (
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

        {this.state.creatingFilter && (
          <div>
            <CustomSelect options={datasetOptions} onChange={e => this.constructFilter(e.value)} size="sm" />
            <Button
              className="cancel-filter"
              variant="warning"
              onClick={() => this.setState({ creatingFilter: false })}
            >
              Cancel
            </Button>
          </div>
        )}
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

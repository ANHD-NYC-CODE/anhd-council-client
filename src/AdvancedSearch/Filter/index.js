import React from 'react'
import PropTypes from 'prop-types'
import { Filter } from 'shared/classes/Filter'
import * as d from 'shared/models/datasets'

import { addFilter, removeFilter, updateFilter } from 'Store/AdvancedSearch/actions'

import CustomSelect from 'shared/components/CustomSelect'
import { Form, Button } from 'react-bootstrap'

class FilterComponent extends React.Component {
  constructor(props) {
    super(props)

    this.initialState = {
      creatingFilter: false,
      dataset: this.props.dataset,
      filter: this.props.filter,
    }

    this.state = this.initialState

    this.constructFilter = this.constructFilter.bind(this)
    this.removeFilter = this.removeFilter.bind(this)
    this.updateFilter = this.updateFilter.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filter: nextProps.filter, dataset: nextProps.dataset })
  }

  constructFilter(datasetConstant) {
    const newFilter = new Filter({ datasetConstant })
    this.props.condition.addFilter({ filter: newFilter })
    this.setState({ creatingFilter: false })
    this.props.dispatchAction()
  }

  removeFilter() {
    this.props.dispatch(removeFilter(this.props.conditionKey, this.props.filterIndex))
  }

  updateFilter(e) {
    if (e.preventDefault) {
      e.preventDefault()
      e.stopPropagation()
      e = e.currentTarget
    }

    // Handle form event object
    if (e.name && e.value) {
      e = { [e.name]: e.value }
    }

    const filter = {
      ...this.state.filter,
      ...e,
    }

    if (this.props.filter) {
      this.props.dispatch(updateFilter(this.props.conditionKey, this.props.filterIndex, filter))
    } else {
      this.setState({
        ...this.state,
        filter: filter,
      })
    }
  }

  render() {
    const datasetOptions = Object.entries(d).map(ds => {
      return {
        value: ds[1].apiMap.constant,
        label: ds[1].apiMap.name,
      }
    })

    return (
      <div className="filter">
        <div>
          {this.state.creatingFilter && (
            <div>
              <CustomSelect options={datasetOptions} onChange={e => this.constructFilter(e.value)} size="sm" />
              <Button variant="warning" onClick={() => this.setState({ creatingFilter: false })}>
                Cancel
              </Button>
            </div>
          )}

          {this.props.filter &&
            Object.keys(this.props.filter.paramsObject).map((paramsSetKey, paramSetIndex) =>
              this.props.filter.paramsObject[paramsSetKey].component({
                key: 'filter-param-set-component',
                dispatchAction: this.props.dispatchAction,
                paramSet: this.props.filter.paramsObject[paramsSetKey],
                paramSetIndex: paramSetIndex,
              })
            )}
        </div>
        {!this.props.filter && !this.state.creatingFilter && (
          <Button onClick={() => this.setState({ creatingFilter: true })} variant="outline-success">
            Add Filter
          </Button>
        )}
        {this.props.filter && (
          <Button onClick={this.removeFilter} variant="outline-danger">
            Remove Filter
          </Button>
        )}
      </div>
    )
  }
}

FilterComponent.propTypes = {
  conditionKey: PropTypes.string,
  dataset: PropTypes.object,
  dispatchAction: PropTypes.func,
  filterIndex: PropTypes.number,
}

export default FilterComponent

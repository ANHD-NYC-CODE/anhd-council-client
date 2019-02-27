import React from 'react'
import PropTypes from 'prop-types'
import { convertFieldsToComponents } from 'shared/utilities/componentUtils'
import * as d from 'shared/constants/datasets'
import { addFilter, removeFilter } from 'Store/AdvancedSearch/actions'

import Select from 'react-select'

class Filter extends React.Component {
  constructor(props) {
    super(props)

    this.initialState = {
      creatingFilter: false,
      dataset: this.props.dataset,
      filterModel: this.props.filterModel,
      filter: this.props.filter,
    }

    this.state = this.initialState

    this.constructFilter = this.constructFilter.bind(this)
    this.removeFilter = this.removeFilter.bind(this)
    this.submitFilter = this.submitFilter.bind(this)
  }

  constructFilter(dataset) {
    this.setState({ dataset: dataset })
    this.setState({ filterModel: dataset.filter })
  }

  removeFilter() {
    this.props.dispatch(removeFilter(this.props.conditionIndex, this.props.filterIndex))
  }

  submitFilter(e) {
    e.preventDefault()
    e.stopPropagation()
    const formElements = Array.from(e.currentTarget.elements)
    const filter = {}
    formElements
      .filter(el => el.name)
      .forEach(el => {
        filter[el.name] = el.value
      })
    filter['dataset'] = this.state.dataset
    this.props.dispatch(addFilter(this.props.conditionIndex, filter))
    this.setState(this.initialState)
  }

  render() {
    const datasetOptions = Object.entries(d).map(ds => {
      return {
        value: ds[1],
        label: ds[1].name,
      }
    })

    return (
      <div className="filter">
        <form onSubmit={this.submitFilter}>
          {this.state.creatingFilter && (
            <Select options={datasetOptions} onChange={e => this.constructFilter(e.value)} />
          )}

          {this.props.filter && <div>{this.state.dataset.name}</div>}

          {this.state.filterModel && (
            <div>
              <input type="hidden" value={this.state.dataset.queryName} />

              {this.state.filterModel.fields.map((field, index) => {
                return <div key={`filterField-${index}`}>{convertFieldsToComponents(field, this.state.filter)}</div>
              })}

              {this.state.creatingFilter && <button type="submit">Create</button>}
            </div>
          )}
        </form>
        {!this.state.creatingFilter && !this.state.filter && (
          <button onClick={() => this.setState({ creatingFilter: true })}>Add Filter</button>
        )}
        {this.props.filter && <button onClick={this.removeFilter}>Remove Filter</button>}
      </div>
    )
  }
}

Filter.propTypes = {
  conditionIndex: PropTypes.number,
  dataset: PropTypes.object,
  filterIndex: PropTypes.number,
  filterModel: PropTypes.object,
}

export default Filter

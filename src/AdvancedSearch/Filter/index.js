import React from 'react'
import PropTypes from 'prop-types'
import { convertFieldsToComponents } from 'shared/utilities/componentUtils'
import * as d from 'shared/constants/datasets'
import { addFilter, removeFilter, updateFilter } from 'Store/AdvancedSearch/actions'

import CustomSelect from 'shared/components/Select'
import { Form, Button, Col } from 'react-bootstrap'

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
    this.updateFilter = this.updateFilter.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filter: nextProps.filter })
  }

  constructFilter(dataset) {
    this.setState({ dataset: dataset, filterModel: dataset.filter, filter: dataset.defaultFilterValues })
  }

  removeFilter() {
    this.props.dispatch(removeFilter(this.props.conditionKey, this.props.filterIndex))
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
    this.props.dispatch(addFilter(this.props.conditionKey, filter))
    this.setState(this.initialState)
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
        value: ds[1],
        label: ds[1].name,
      }
    })

    return (
      <div className="filter">
        <Form className="filter" onSubmit={this.submitFilter}>
          <Form.Row>
            {this.state.creatingFilter && (
              <Col md="3">
                <CustomSelect options={datasetOptions} onChange={e => this.constructFilter(e.value)} size="sm" />
              </Col>
            )}
            {this.props.filter && <Form.Label column>{this.state.dataset.name}</Form.Label>}
            {this.state.dataset && <input type="hidden" value={this.state.dataset.queryName} />}
            {this.state.filterModel &&
              this.state.filterModel.fields.map((field, index) => {
                return convertFieldsToComponents(field, this.state.filter, this.updateFilter, index)
              })}
            {this.state.filterModel && this.state.creatingFilter && <Button type="submit">Create</Button>}
          </Form.Row>
        </Form>
        {!this.state.creatingFilter && !this.state.filter && (
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

Filter.propTypes = {
  conditionKey: PropTypes.string,
  dataset: PropTypes.object,
  filterIndex: PropTypes.number,
  filterModel: PropTypes.object,
}

export default Filter

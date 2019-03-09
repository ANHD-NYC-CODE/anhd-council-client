import React from 'react'
import PropTypes from 'prop-types'

import { Form, Button } from 'react-bootstrap'

export class FilterComponent extends React.Component {
  constructor(props) {
    super(props)

    this.initialState = {
      creatingFilter: false,
      filter: this.props.filter,
    }

    this.state = this.initialState

    this.removeFilter = this.removeFilter.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filter: nextProps.filter })
  }

  removeFilter() {
    this.props.condition.removeFilter({ filterIndex: this.props.filterIndex })
    this.props.dispatchAction()
  }

  render() {
    return (
      <Form className="filter">
        {this.props.filter &&
          Object.keys(this.props.filter.paramsObject).map((paramsSetKey, paramSetIndex) =>
            this.props.filter.paramsObject[paramsSetKey].component({
              key: 'filter-param-set-component',
              dispatchAction: this.props.dispatchAction,
              paramSet: this.props.filter.paramsObject[paramsSetKey],
              paramSetIndex: paramSetIndex,
            })
          )}

        {this.props.filter && (
          <Button onClick={this.removeFilter} variant="outline-danger">
            Remove Filter
          </Button>
        )}
      </Form>
    )
  }
}

FilterComponent.propTypes = {
  conditionKey: PropTypes.string,
  dispatchAction: PropTypes.func,
  filterIndex: PropTypes.number,
}

export default FilterComponent

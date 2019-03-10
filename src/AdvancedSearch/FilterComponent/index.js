import React from 'react'
import PropTypes from 'prop-types'

import { Form, Button, Col, ButtonGroup } from 'react-bootstrap'
import './style.scss'
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
      <Form.Row className="filter">
        <Form.Group as={Col} xs={10}>
          {this.props.filter &&
            Object.keys(this.props.filter.paramsObject).map((paramsSetKey, paramSetIndex) =>
              this.props.filter.paramsObject[paramsSetKey].component({
                key: 'filter-paramset-component',
                dispatchAction: this.props.dispatchAction,
                paramSet: this.props.filter.paramsObject[paramsSetKey],
                paramSetIndex: paramSetIndex,
              })
            )}
        </Form.Group>
        <Col xs={2}>
          <ButtonGroup>
            <Button onClick={this.removeFilter} variant="danger">
              -
            </Button>
            {this.props.allowNewCondition && (
              <Button onClick={() => this.props.addCondition(this.props.conditionKey)} variant="success">
                {'<'}
              </Button>
            )}
          </ButtonGroup>
        </Col>
      </Form.Row>
    )
  }
}

FilterComponent.propTypes = {
  addCondition: PropTypes.func,
  allowNewCondition: PropTypes.bool,
  conditionKey: PropTypes.string,
  dispatchAction: PropTypes.func,
  filter: PropTypes.object,
  filterIndex: PropTypes.number,
}

export default FilterComponent

import React from 'react'
import PropTypes from 'prop-types'

import { Form, Button, Col, ButtonGroup } from 'react-bootstrap'

export class FilterComponent extends React.Component {
  constructor(props) {
    super(props)

    this.removeFilter = this.removeFilter.bind(this)
    this.createConditionWithFilter = this.createConditionWithFilter.bind(this)
  }

  createConditionWithFilter(filterIndex) {
    this.props.condition.removeFilter({ filterIndex })
    this.props.addCondition(this.props.filter)
  }

  removeFilter() {
    this.props.condition.removeFilter({ filterIndex: this.props.filterIndex })
    this.props.dispatchAction()
  }

  render() {
    return (
      <Form.Row className="filter align-items-center">
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
        <Col xs={2} className="flex-column">
          <ButtonGroup className="align-center">
            <Button size="sm" onClick={this.removeFilter} variant="danger">
              -
            </Button>
            {this.props.allowNewCondition && (
              <Button
                size="sm"
                onClick={() => this.createConditionWithFilter(this.props.filterIndex)}
                variant="success"
              >
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
  condition: PropTypes.object,
  dispatchAction: PropTypes.func,
  filter: PropTypes.object,
  filterIndex: PropTypes.number,
}

export default FilterComponent

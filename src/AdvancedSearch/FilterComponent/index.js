import React from 'react'
import PropTypes from 'prop-types'

import { Form, Button, Col, ButtonGroup } from 'react-bootstrap'
import FormError from 'shared/components/FormError'

import './style.scss'
export class FilterComponent extends React.Component {
  constructor(props) {
    super(props)

    this.removeFilter = this.removeFilter.bind(this)
  }

  removeFilter() {
    this.props.condition.removeFilter({
      dispatchAction: this.props.dispatchAction,
      filterIndex: this.props.filterIndex,
    })
  }

  render() {
    return (
      <div>
        <Form.Row className="filter align-items-center">
          <Form.Group as={Col} xs={10}>
            {this.props.filter &&
              Object.keys(this.props.filter.paramSets).map((paramsSetKey, paramSetIndex) =>
                this.props.filter.paramSets[paramsSetKey].component({
                  key: `filter-paramset-${this.props.filter.id}-${paramSetIndex}`,
                  dispatchAction: this.props.dispatchAction,
                  replaceFilter: this.props.replaceFilter,
                  filterIndex: this.props.filterIndex,
                  filter: this.props.filter,
                  paramSet: this.props.filter.paramSets[paramsSetKey],
                  paramSetIndex: paramSetIndex,
                })
              )}
          </Form.Group>
          <Col xs={2} className="flex-column">
            <ButtonGroup className="align-center">
              <Button size="sm" className="remove-filter" onClick={this.removeFilter} variant="danger">
                -
              </Button>
              {this.props.allowNewCondition && (
                <Button
                  size="sm"
                  className="add-condition"
                  onClick={() => this.props.addCondition(this.props.filterIndex)}
                  variant="success"
                >
                  {'<'}
                </Button>
              )}
            </ButtonGroup>
          </Col>
        </Form.Row>
        <FormError show={!!this.props.filter.errors.length} message={(this.props.filter.errors[0] || {}).message} />
      </div>
    )
  }
}

FilterComponent.propTypes = {
  addCondition: PropTypes.func,
  allowNewCondition: PropTypes.bool,
  condition: PropTypes.object,
  datasetModels: PropTypes.array,
  dispatchAction: PropTypes.func,
  filter: PropTypes.object,
  filterIndex: PropTypes.number,
  replaceFilter: PropTypes.func,
}

export default FilterComponent

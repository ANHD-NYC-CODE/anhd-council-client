import React from 'react'
import PropTypes from 'prop-types'

import { Form, Button, Col } from 'react-bootstrap'
import FormError from 'shared/components/FormError'
import AddConditionButton from 'AdvancedSearch/FilterComponent/AddConditionButton'
import RemoveFilterButton from 'AdvancedSearch/FilterComponent/RemoveFilterButton'

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
      <div className="filter-component  d-flex">
        <div className="form-row__connection-container filter-connection d-flex flex-column">
          <div className="form-row__connection" />
          <div className="form-row__connection" />
        </div>

        <Form.Row className="filter align-content-center">
          <Form.Group as={Col} xs={9} lg={10}>
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
          <Col xs={3} lg={2} className="d-flex align-items-center">
            <RemoveFilterButton showPopups={this.props.showPopups} removeFilter={this.removeFilter} />
            {this.props.allowNewCondition && (
              <AddConditionButton
                addCondition={this.props.addCondition}
                filterIndex={this.props.filterIndex}
                showPopups={this.props.showPopups}
              />
            )}
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

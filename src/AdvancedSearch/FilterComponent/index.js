import React from 'react'
import PropTypes from 'prop-types'

import { Form, Col, Button } from 'react-bootstrap'
import FormError from 'shared/components/FormError'
import AddConditionButton from 'AdvancedSearch/FilterComponent/AddConditionButton'
import RemoveFilterButton from 'AdvancedSearch/FilterComponent/RemoveFilterButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

import classnames from 'classnames'
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

  renderButtons(paramSet, key) {
    if (this.props.condition && !!paramSet.paramMaps.length && key === 'initial') {
      return (
        <div className="d-flex align-items-center">
          <RemoveFilterButton showPopups={this.props.showPopups} removeFilter={this.removeFilter} />
          {/* {this.props.allowNewCondition && (
            <AddConditionButton
              addCondition={this.props.addCondition}
              filterIndex={this.props.filterIndex}
              showPopups={this.props.showPopups}
            />
          )} */}
        </div>
      )
    } else if (!!paramSet.paramMaps.length && key !== 'initial') {
      return (
        <Button
          onClick={() =>
            paramSet.deleteAll({
              dispatchAction: this.props.dispatchAction,
            })
          }
          size="sm"
          variant="outline-danger"
        >
          <FontAwesomeIcon icon={faMinus} />
        </Button>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div className="filter-component">
        <div className="filter-component__primary-row d-flex">
          <div
            className={classnames('form-row__connection-container', 'filter-connection', 'flex-column', {
              'd-flex': !this.props.blockWidth,
              'd-none': this.props.blockWidth,
            })}
          >
            <div className="form-row__connection" />
            <div className="form-row__connection" />
          </div>

          <Form.Row className="filter align-content-center">
            <Form.Group as={Col} xs={12}>
              {Object.keys(this.props.filter.paramSets).map((key, index) => {
                // Render all param sets in the filter
                const paramSet = this.props.filter.paramSets[key]
                return (
                  <Form.Row
                    className={classnames('paramset-wrapper', { 'modifying-paramset': key !== 'initial' })}
                    key={`filter-paramset-${this.props.filter.resourceConstant}-${index}`}
                  >
                    <Col className="filter-component__wrapper d-flex">
                      <Form.Row>
                        <Col className="input-column" xs={10} xl={11}>
                          {this.props.filter.paramSets[key].component({
                            dispatchAction: this.props.dispatchAction,
                            replaceFilter: this.props.replaceFilter,
                            filterIndex: this.props.filterIndex,
                            filter: this.props.filter,
                            paramSet: paramSet,
                            paramSetIndex: index,
                          })}
                        </Col>
                        {
                          // Buttons
                        }
                        <Col xs={2} xl={1} className="d-flex align-items-center">
                          {this.renderButtons(paramSet, key)}
                        </Col>
                      </Form.Row>
                    </Col>
                  </Form.Row>
                )
              })}
              {
                // New Button
              }
              {Object.keys(this.props.filter.paramSets)
                .filter(key => key !== 'initial')
                .map((key, index) => {
                  const paramSet = this.props.filter.paramSets[key]
                  return !paramSet.paramMaps.length ? (
                    <div
                      className="filter-component__paramsets"
                      key={`paramSet-${this.props.filter.resourceConstant}-${index}`}
                    >
                      <div className="filter-component__paramsets-wrapper">
                        <Form.Row>
                          <Form.Group as={Col} className="paramset--group">
                            <Button
                              className="paramset--new-button"
                              variant="outline-primary"
                              onClick={() => paramSet.create({ dispatchAction: this.props.dispatchAction })}
                            >
                              {`Add ${paramSet.label} +`}
                            </Button>
                          </Form.Group>
                        </Form.Row>
                      </div>
                    </div>
                  ) : null
                })}
            </Form.Group>
          </Form.Row>
        </div>
        <Form.Row />
        <FormError show={!!this.props.filter.errors.length} message={(this.props.filter.errors[0] || {}).message} />
      </div>
    )
  }
}

FilterComponent.defaultProps = {
  blockWidth: false,
}

FilterComponent.propTypes = {
  addCondition: PropTypes.func,
  allowNewCondition: PropTypes.bool,
  blockWidth: PropTypes.bool,
  condition: PropTypes.object,
  dispatchAction: PropTypes.func,
  filter: PropTypes.object,
  filterIndex: PropTypes.number,
  replaceFilter: PropTypes.func,
}

export default FilterComponent

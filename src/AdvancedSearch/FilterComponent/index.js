import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'

import FormError from 'shared/components/FormError'
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

    // if (this.props.condition.key !== '0' && !this.props.condition.filters.length) {
    //   this.props.dispatch(removeCondition(this.props.condition.key))
    // }
  }

  renderButtons(paramSet, key) {
    if (this.props.condition && !!paramSet.paramMaps.length && key === 'initial') {
      return (
        <div className="d-flex align-items-center">
          <RemoveFilterButton showPopups={this.props.showPopups} removeFilter={this.removeFilter} />
          {/* {this.props.allowNewCondition && (
            <AddInnerConditionButton
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
          variant="link"
        >
          <FontAwesomeIcon icon={faTimes} />
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
          <div className="filter align-content-center">
            {Object.keys(this.props.filter.paramSets).map((key, index) => {
              // Render all param sets in the filter
              const paramSet = this.props.filter.paramSets[key]

              return (
                <div
                  className={classnames('paramset-wrapper', { 'modifying-paramset': key !== 'initial' })}
                  key={`filter-paramset-${this.props.filter.resourceConstant}-${index}`}
                >
                  <div className="input-column">
                    {this.props.filter.paramSets[key].component({
                      dispatchAction: this.props.dispatchAction,
                      replaceFilter: this.props.replaceFilter,
                      filterIndex: this.props.filterIndex,
                      filter: this.props.filter,
                      paramSet: paramSet,
                      paramSetIndex: index,
                    })}
                  </div>
                  {
                    // Buttons
                  }
                  <div className="d-flex align-items-center">{this.renderButtons(paramSet, key)}</div>
                </div>
              )
            })}
            {
              // New Button
            }
            {Object.keys(this.props.filter.paramSets).length > 1 &&
              !Object.keys(this.props.filter.paramSets).every(
                k => !!this.props.filter.paramSets[k].paramMaps.length
              ) && <p className="paramset__label">Options</p>}
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
                      <Button
                        className="paramset--new-button"
                        variant="link"
                        onClick={() => paramSet.create({ dispatchAction: this.props.dispatchAction })}
                      >
                        {`${paramSet.label}`}
                      </Button>
                    </div>
                  </div>
                ) : null
              })}
          </div>
        </div>
        <div />
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

import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
import classnames from 'classnames'
import StandardizedInput from 'shared/classes/StandardizedInput'
import './style.scss'
import { updateAmountFilter } from 'Store/AppState/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import InfoModalButton from 'shared/components/InfoModalButton'

class AnnotatedResultFilterCard extends React.Component {
  constructor(props) {
    super(props)

    this.increaseAmount = this.increaseAmount.bind(this)
    this.decreaseAmount = this.decreaseAmount.bind(this)
  }

  handleFilterChange(e) {
    e = new StandardizedInput(e)
    this.props.amountFilter.value = e.value
  }

  increaseAmount() {
    this.props.amountFilter.value = this.props.amountFilter.value + 1
    this.props.dispatch(updateAmountFilter(this.props.amountFilter))
  }

  decreaseAmount() {
    this.props.amountFilter.value = this.props.amountFilter.value - 1
    this.props.dispatch(updateAmountFilter(this.props.amountFilter))
  }

  render() {
    return (
      <div className="amount-result-filter-card--container">
        <div className={classnames('amount-result-filter-card mb-2', { active: this.props.selected })}>
          <Card
            as={'div'}
            className={classnames(
              'amount-result-filter-card__body',
              { disabled: this.props.disabled },
              this.props.amountFilter.resourceModel.summaryBackgroundColorClass
            )}
            disabled={this.props.disabled}
          >
            <div
              onClick={this.props.handleClick}
              className={classnames('amount-result-filter-card__body--inner-wrapper')}
            >
              <div className="amount-result-filter-card__header">
                <h6 className="amount-result-filter-card__title">
                  {this.props.amountFilter.resourceModel.dashboardLabel || this.props.amountFilter.resourceModel.label}
                </h6>
                <span className="amount-result-filter--deselect">
                  <FontAwesomeIcon icon={faTimes} size="xl" />
                </span>
                <span className="amount-result-filter--select">
                  <FontAwesomeIcon icon={faPlus} size="xl" />
                </span>
              </div>
              <hr />
              <div className="amount-result-filter-card__filter">
                <div className="amount-result-filter-card__input--prefix">
                  at least: <span className="amount-result-filter-card__input">{this.props.amountFilter.value}</span>
                </div>
              </div>
              <div className="amount-result-filter-card__total">
                <div className="amount-result-filter-card__total--prefix">Properties:&nbsp;</div>
                <div className="amount-result-filter-card__total--value">{this.props.calculatedTotal}</div>
              </div>
            </div>
          </Card>
          <div className="amount-result-filter-card__controls">
            <div className="amount-result-filter-card__arrow" onClick={this.increaseAmount}>
              <FontAwesomeIcon icon={faArrowUp} />
            </div>
            <div className="amount-result-filter-card__arrow" onClick={this.decreaseAmount}>
              <FontAwesomeIcon icon={faArrowDown} />
            </div>
          </div>
        </div>
        <div className="amount-result-filter-card__info info-section">
          <InfoModalButton modalConstant={this.props.amountFilter.resourceModel.resourceConstant} />
        </div>
      </div>
    )
  }
}

AnnotatedResultFilterCard.propTypes = {
  amountField: PropTypes.object,
}

export default AnnotatedResultFilterCard

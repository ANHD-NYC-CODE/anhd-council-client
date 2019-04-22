import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'react-bootstrap'
import classnames from 'classnames'
import StandardizedInput from 'shared/classes/StandardizedInput'
import './style.scss'
import { updateAmountFilter } from 'Store/AppState/actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

class AmountResultFilterCard extends React.Component {
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
      <div className={classnames('amount-result-filter-card', this.props.summaryBackgroundColorClass, 'mb-2')}>
        <Card
          as={'div'}
          className="amount-result-filter-card__body"
          // bg={classnames({ primary: this.props.selected })}
          disabled={this.props.disabled}
        >
          <div className="amount-result-filter-card__header">
            <h6 className="amount-result-filter-card__title">{this.props.amountFilter.resourceModel.label}</h6>
          </div>
          <div
            onClick={this.props.handleClick}
            className={classnames('amount-result-filter-card__body--inner-wrapper', { active: this.props.selected })}
          >
            <div className="amount-result-filter-card__filter">
              <div className="amount-result-filter-card__input--prefix">at least </div>
              <div className="amount-result-filter-card__input">{this.props.amountFilter.value}</div>
            </div>
            <div className="amount-result-filter-card__total">
              <div className="amount-result-filter-card__total--prefix">Results:&nbsp;</div>
              <div className="amount-result-filter-card__total--value">{this.props.calculatedTotal}</div>
            </div>
          </div>

          {/* <div className="align-self-center summary-result-card__result">
            {this.props.loading ? (
              <SpinnerLoader />
            ) : (
              <h2 className={classnames('m-0', this.props.summaryTextColorClass)}>{this.props.results.length}</h2>
            )}
          </div> */}
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
    )
  }
}

AmountResultFilterCard.propTypes = {
  amountField: PropTypes.object,
}

export default AmountResultFilterCard

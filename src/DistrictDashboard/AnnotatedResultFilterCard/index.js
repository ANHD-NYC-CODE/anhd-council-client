import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'shared/constants'
import StandardizedInput from 'shared/classes/StandardizedInput'
import './style.scss'
import { updateAmountFilter } from 'Store/DashboardState/actions'

import AmountFilterInput from 'DistrictDashboard/AmountFilterInput'
import ModalContext from 'Modal/ModalContext'

import LoginModal from 'shared/components/modals/LoginModal'
import LoginModalFooter from 'shared/components/forms/LoginForm/LoginModalFooter'
import InfoModalButton from 'shared/components/InfoModalButton'
import { spaceEnterKeyDownHandler } from 'shared/utilities/accessibilityUtils'
import { grammaticalNoun } from 'shared/utilities/languageUtils'
import classnames from 'classnames'

import Toggle from 'react-bootstrap-toggle'

class AnnotatedResultFilterCard extends React.Component {
  constructor(props) {
    super(props)

    this.increaseAmount = this.increaseAmount.bind(this)
    this.decreaseAmount = this.decreaseAmount.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
  }

  handleClick(e, amountFilter) {
    e.preventDefault()
    this.props.handleClick(amountFilter)
  }

  handleFilterChange(e) {
    e = new StandardizedInput(e)
    if (e.value || e.value === 0) {
      if (e.value > 999) e.value = 999 // max
      this.props.amountFilter.value = e.value
      this.props.dispatch(updateAmountFilter(this.props.amountFilter))
    }
  }

  increaseAmount() {
    this.props.amountFilter.value = this.props.amountFilter.value + 1
    this.props.dispatch(updateAmountFilter(this.props.amountFilter))
  }

  decreaseAmount() {
    this.props.amountFilter.value = this.props.amountFilter.value - 1
    this.props.dispatch(updateAmountFilter(this.props.amountFilter))
  }

  handleLoginClick(e, modal) {
    e.preventDefault()
    modal.setModal({
      modalComponent: LoginModal,
      modalProps: {
        modalFooter: <LoginModalFooter modal={modal} />,
      },
    })
  }

  render() {
    const isUnauthorized =
      (this.props.amountFilter.resourceModel.resourceConstant === 'FORECLOSURE' ||
        this.props.amountFilter.resourceModel.resourceConstant === 'LISPENDEN') &&
      !this.props.auth.user
    return (
      <div className="amount-result-filter-card--container">
        <div className="amount-result-filter-card__header">
          <p className="amount-result-filter-card__label">
            {this.props.amountFilter.resourceModel.dashboardLabel || this.props.amountFilter.resourceModel.label}
            <span className="amount-result-filter-card__info info-section">
              <InfoModalButton modalConstant={this.props.amountFilter.resourceModel.resourceConstant} />
            </span>
          </p>
          <Toggle
            tabIndex={0}
            height={32}
            width={60}
            className="round-toggle"
            handleClassName="round-toggle-handle"
            on="On"
            off="Off"
            onClassName="round-toggle-on"
            offClassName="round-toggle-off"
            onKeyDown={e => spaceEnterKeyDownHandler(e, e => this.handleClick(e, this.props.amountFilter))}
            onClick={(target, value, e) => this.handleClick(e, this.props.amountFilter)}
            handlestyle="light"
            onstyle="primary"
            offstyle="light"
            active={!isUnauthorized && this.props.selected}
            disabled={isUnauthorized || this.props.disabled}
          />
        </div>
        {isUnauthorized ? (
          <ModalContext.Consumer>
            {modal => {
              return (
                <button
                  className="text-link"
                  onClick={e => this.handleLoginClick(e, modal)}
                  onKeyDown={e => spaceEnterKeyDownHandler(e, e => this.handleLoginClick(e, modal))}
                >
                  {c.LOGIN_CTA}
                </button>
              )
            }}
          </ModalContext.Consumer>
        ) : (
          <div className={classnames('amount-result-filter-card__filter', { active: this.props.selected })}>
            There are <span>{this.props.calculatedTotal}</span> properties with at least{' '}
            {this.props.selected ? (
              <AmountFilterInput onSubmit={this.handleFilterChange} value={this.props.amountFilter.value} />
            ) : (
              <span>{this.props.amountFilter.value}</span>
            )}{' '}
            <span>
              {grammaticalNoun(
                this.props.amountFilter.resourceModel.dashboardLabel || this.props.amountFilter.resourceModel.label,
                this.props.amountFilter.value
              )}
              .
            </span>
          </div>
        )}
      </div>
    )
  }
}

AnnotatedResultFilterCard.propTypes = {
  amountField: PropTypes.object,
}

export default AnnotatedResultFilterCard

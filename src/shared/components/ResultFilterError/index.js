import React from 'react'
import PropTypes from 'prop-types'
import { Card, Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'
import InfoModalButton from 'shared/components/InfoModalButton'

import './style.scss'

const ResultFilterError = props => {
  return (
    <div className="result-filter-error amount-result-filter-card--container">
      <div className={classnames('amount-result-filter-card mb-2')}>
        <Card
          className="amount-result-filter-card__body"
          onClick={e => {
            e.stopPropagation()
            props.errorAction(e)
          }}
        >
          <div className={classnames('amount-result-filter-card__body--inner-wrapper')}>
            <div className="amount-result-filter-card__header">
              <h6 className="amount-result-filter-card__title">{props.amountFilter.resourceModel.label}</h6>
            </div>
            <hr />
            <div className="amount-result-filter-card__filter">
              <div className="amount-result-filter-card__input--prefix">{props.error.message}</div>
            </div>
            <div className="amount-result-filter-card__total">
              <Badge variant="danger">
                <FontAwesomeIcon icon={faRedo} />
                <span> Retry</span>
              </Badge>
            </div>
          </div>
        </Card>
        <div className="amount-result-filter-card__controls">
          <div className="amount-result-filter-card__arrow" />
          <div className="amount-result-filter-card__arrow" />
        </div>
      </div>
      <div className="amount-result-filter-card__info">
        <InfoModalButton modalConstant={props.amountFilter.resourceModel.resourceConstant} />
      </div>
    </div>
  )
}

ResultFilterError.defaultProps = {
  error: {
    message: 'Oops, something went wrong.',
  },
}

ResultFilterError.propTypes = {
  error: PropTypes.object,
  errorAction: PropTypes.func,
}

export default ResultFilterError

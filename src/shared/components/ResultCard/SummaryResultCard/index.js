import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'react-bootstrap'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import classnames from 'classnames'

import './style.scss'

const SummaryResultCard = props => {
  return (
    <Card
      as={Button}
      bg={classnames({ primary: props.selected })}
      text={classnames({ light: props.selected, dark: !props.selected })}
      className={classnames('summary-result-card', 'result-card flex-row', props.summaryBackgroundColorClass, 'mb-2', {
        active: props.selected,
      })}
      onClick={props.handleClick}
    >
      <Card.Body className="d-flex flex-row p-0">
        <p className="d-flex flex-column align-content-center justify-content-center text-left m-0 pr-1 summary-result-card__label">
          {props.label}
        </p>
        <div className="align-self-center summary-result-card__result">
          {props.loading ? (
            <SpinnerLoader />
          ) : (
            <h2 className={classnames('m-0', props.summaryTextColorClass)}>{props.results.length}</h2>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

SummaryResultCard.defaultProps = {
  loading: false,
  error: undefined,
  results: [],
  selected: false,
}

SummaryResultCard.propTypes = {
  handleClick: PropTypes.func,
  onClick: PropTypes.func,
  resultsComponent: PropTypes.func,
  selected: PropTypes.bool,
  summaryTextColorClass: PropTypes.string,
  summaryBackgroundColorClass: PropTypes.string,
  results: PropTypes.array,
}
export default SummaryResultCard

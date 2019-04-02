import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'react-bootstrap'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'

import './style.scss'
import { Row, Col } from 'react-bootstrap'
const getLabel = props => {
  if (props.label) return props.label
  else {
    return (
      <Row>
        {props.resultsFilter && (
          <Col xs={2}>
            <FontAwesomeIcon icon={faHome} />
          </Col>
        )}
        {props.resultsFilter && <Col xs={10}>{props.resultsFilter.label}</Col>}
        {props.request && (
          <Col xs={2}>
            <FontAwesomeIcon icon={faChartBar} />
          </Col>
        )}
        {props.request && <Col xs={10}>{props.request.summaryCardLabel}</Col>}
      </Row>
    )
  }
}

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
        <div className="d-flex flex-column align-content-center justify-content-center text-left m-0 pr-1 summary-result-card__label">
          {getLabel(props)}
        </div>
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

import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Alert, Badge } from 'react-bootstrap'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

const SummaryResultCard = props => {
  return (
    <Card
      as={Button}
      bg={classnames({ primary: props.selected, light: !props.selected })}
      text={classnames({ light: props.selected, dark: !props.selected })}
      className={classnames('summary-result-card', 'result-card flex-row', 'mb-2', {
        active: props.selected,
      })}
      onClick={props.handleClick}
    >
      <Card.Body className="d-flex flex-row p-0">
        <p className="d-flex flex-column align-content-center justify-content-center text-left m-0 pr-1 summary-result-card__label">
          {props.request.label}
        </p>
        <div className="align-self-center summary-result-card__result">
          {props.errors ? (
            <Alert
              onClick={e => {
                e.stopPropagation()
                props.errorAction(e)
              }}
              variant="warning"
            >
              <p>Error</p>
              <Badge variant="success">
                <FontAwesomeIcon icon={faRedo} />
                <span> Refresh</span>
              </Badge>
            </Alert>
          ) : props.loading ? (
            <SpinnerLoader />
          ) : (
            <h2 className="m-0">{props.results.length}</h2>
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
  request: PropTypes.object,
  selected: PropTypes.bool,
  results: PropTypes.array,
}
export default SummaryResultCard

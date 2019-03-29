import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'react-bootstrap'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'

import classnames from 'classnames'
import './style.scss'
const HousingTypeResultCard = props => {
  const results = props.filter(props.results)
  return (
    <Card
      as={Button}
      bg={classnames({ primary: props.selected })}
      text={classnames({ light: props.selected, dark: !props.selected })}
      className={classnames('housingtype-summary-result-card', 'result-card flex-row', 'mb-2', {
        active: props.selected,
      })}
      onClick={props.handleClick}
    >
      <div className="housingtype-summary-result-card__wrapper">
        <h5 className="housingtype-summary-result-card__title font-weight-bold">
          {props.label || props.request.label}
        </h5>
        {props.loading ? (
          <SpinnerLoader />
        ) : (
          <div className="housingtype-summary-result-card__inner-wrapper d-flex flex-row justify-content-between w-100">
            <div className="d-flex flex-column align-items-flex-start h-100 text-left">
              <p>
                <span className="font-weight-bold">{results.length}</span>{' '}
                <span className="summary-units">properties</span>
              </p>
              <p>
                <span className="font-weight-bold">
                  {results.reduce((total, result) => parseInt(total) + parseInt(result['unitsres']), 0)}
                </span>{' '}
                <span className="summary-units">units</span>
              </p>
            </div>
            <div className="d-flex flex-column align-items-flex-end h-100 text-right">
              {props.totalResults && !!props.totalResults.length && (
                <h5 className="text-right font-weight-bold ">{`${(
                  (results.length / props.totalResults.length) *
                  100
                ).toFixed(2)}%`}</h5>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

HousingTypeResultCard.defaultProps = {
  loading: false,
  error: undefined,
  filter: results => results,
  results: [],
  totalResults: [],
  selected: false,
}

HousingTypeResultCard.propTypes = {
  handleClick: PropTypes.func,
  onClick: PropTypes.func,
  resultsComponent: PropTypes.func,
  totalRequest: PropTypes.object,
  request: PropTypes.object,
  selected: PropTypes.bool,
  results: PropTypes.array,
  totalResults: PropTypes.array,
}
export default HousingTypeResultCard

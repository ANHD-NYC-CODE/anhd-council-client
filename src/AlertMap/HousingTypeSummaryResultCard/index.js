import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'react-bootstrap'
import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import classnames from 'classnames'
import { Row, Col } from 'react-bootstrap'
import './style.scss'
const HousingTypeSummaryResultCard = props => {
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
        <p className="housingtype-summary-result-card__title font-weight-bold">{props.request.label}</p>
        {props.loading ? (
          <SpinnerLoader />
        ) : (
          <div className="housingtype-summary-result-card__inner-wrapper d-flex flex-row justify-content-between w-100">
            <div className="d-flex flex-column align-items-flex-start h-100 text-left">
              <p>{props.results.length} properties</p>
              <p>{props.results.reduce((total, result) => parseInt(total) + parseInt(result['unitsres']), 0)} units</p>
            </div>
            <div className="d-flex flex-column align-items-flex-end h-100 text-right">
              {props.totalResults && !!props.totalResults.length && (
                <h5 className="text-right font-weight-bold ">{`${(
                  (props.results.length / props.totalResults.length) *
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

HousingTypeSummaryResultCard.defaultProps = {
  loading: false,
  error: undefined,
  results: [],
  totalResults: [],
  selected: false,
}

HousingTypeSummaryResultCard.propTypes = {
  handleClick: PropTypes.func,
  onClick: PropTypes.func,
  resultsComponent: PropTypes.func,
  totalRequest: PropTypes.object,
  request: PropTypes.object,
  selected: PropTypes.bool,
  results: PropTypes.array,
  totalResults: PropTypes.array,
}
export default HousingTypeSummaryResultCard

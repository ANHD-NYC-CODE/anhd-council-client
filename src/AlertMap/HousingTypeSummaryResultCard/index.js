import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'react-bootstrap'
import CardLoaderMapIcon from 'shared/components/CardLoaderMapIcon'
import classnames from 'classnames'
import { Row, Col } from 'react-bootstrap'
import './style.scss'
const HousingTypeSummaryResultCard = props => {
  return (
    <Card
      as={Button}
      bg={classnames({ primary: props.selected, light: !props.selected })}
      text={classnames({ light: props.selected, dark: !props.selected })}
      className="housingtype-summary-result-card px-2 py-0 mb-2"
      onClick={props.handleClick}
    >
      <div className="housingtype-summary-result-card__wrapper">
        <p className="font-weight-bold">{props.request.label}</p>
        {props.loading ? (
          <CardLoaderMapIcon />
        ) : (
          <div>
            <Row className="housingtype-summary-result-card__top-row">
              <p>{props.results.length} properties</p>
              {props.totalResults && !!props.totalResults.length && (
                <p className="text-right font-weight-bold">{`${(
                  (props.results.length / props.totalResults.length) *
                  100
                ).toFixed(2)}%`}</p>
              )}
            </Row>
            <Row>
              <p>{props.results.reduce((total, result) => parseInt(total) + parseInt(result['unitsres']), 0)} units</p>
            </Row>
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

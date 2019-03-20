import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'react-bootstrap'
import CardLoader from 'shared/components/CardLoader'
import classnames from 'classnames'
const HousingTypeSummaryResultCard = props => {
  return (
    <Card
      as={Button}
      bg={classnames({ primary: props.selected, light: !props.selected })}
      text={classnames({ light: props.selected, dark: !props.selected })}
      className="summary-result-card"
      onClick={props.handleClick}
    >
      <Card.Body>
        <Card.Title>{props.request.label}</Card.Title>
        {props.loading ? (
          <CardLoader />
        ) : (
          <div>
            <Card.Text>{props.results.length} properties</Card.Text>
            <Card.Text>
              {props.results.reduce((total, result) => parseInt(total) + parseInt(result['unitsres']), 0)} units
            </Card.Text>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

HousingTypeSummaryResultCard.defaultProps = {
  loading: false,
  error: undefined,
  results: [],
  selected: false,
}

HousingTypeSummaryResultCard.propTypes = {
  handleClick: PropTypes.func,
  onClick: PropTypes.func,
  resultsComponent: PropTypes.func,
  request: PropTypes.object,
  selected: PropTypes.bool,
}
export default HousingTypeSummaryResultCard

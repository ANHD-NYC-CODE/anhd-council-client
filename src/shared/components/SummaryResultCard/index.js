import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'react-bootstrap'
import CardLoader from 'shared/components/CardLoader'

const SummaryResultCard = props => {
  return (
    <Card as={Button} variant="light" className="summary-result-card" onClick={props.handleClick}>
      <Card.Body>
        <Card.Title>{props.request.label}</Card.Title>
        {props.loading ? <CardLoader /> : <Card.Text>{props.results.length}</Card.Text>}
      </Card.Body>
    </Card>
  )
}

SummaryResultCard.defaultProps = {
  loading: false,
  error: undefined,
  results: [],
}

SummaryResultCard.propTypes = {
  handleClick: PropTypes.func,
  onClick: PropTypes.func,
  resultsComponent: PropTypes.func,
  request: PropTypes.object,
}
export default SummaryResultCard

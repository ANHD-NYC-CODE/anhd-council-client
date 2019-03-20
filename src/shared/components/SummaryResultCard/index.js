import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'react-bootstrap'
import CardLoader from 'shared/components/CardLoader'
import classnames from 'classnames'
const SummaryResultCard = props => {
  console.log(props)
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
        {props.loading ? <CardLoader /> : <Card.Text>{props.results.length}</Card.Text>}
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
}
export default SummaryResultCard

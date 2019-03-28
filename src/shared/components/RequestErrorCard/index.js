import React from 'react'
import PropTypes from 'prop-types'
import { Card, Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

import './style.scss'

const ResultCardError = props => {
  return (
    <Card
      className="result-card-error result-card flex-column text-left mb-2 p-2"
      onClick={e => {
        e.stopPropagation()
        props.errorAction(e)
      }}
    >
      <p className="text-left">{props.requestLabel}</p>
      <p className="result-card-error__message text-left">{props.error.message}</p>
      <Badge variant="danger">
        <FontAwesomeIcon icon={faRedo} />
        <span> Refresh</span>
      </Badge>
    </Card>
  )
}

ResultCardError.defaultProps = {
  error: {
    message: 'Oops, something went wrong.',
  },
}

ResultCardError.propTypes = {
  error: PropTypes.object,
  errorAction: PropTypes.func,
}

export default ResultCardError

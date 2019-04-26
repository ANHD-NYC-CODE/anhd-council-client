import React from 'react'
import PropTypes from 'prop-types'
import { Card, Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

import './style.scss'

const RequestErrorCard = props => {
  return (
    <Card
      className="request-card-error request-card flex-column text-left mb-2 p-2"
      onClick={e => {
        e.stopPropagation()
        props.errorAction(e)
      }}
    >
      <p className="text-left">{props.requestLabel}</p>
      <p className="request-card-error__message text-left">{props.error.message}</p>
      <Badge variant="danger">
        <FontAwesomeIcon icon={faRedo} />
        <span> Retry</span>
      </Badge>
    </Card>
  )
}

RequestErrorCard.defaultProps = {
  error: {
    message: 'Oops, something went wrong.',
  },
}

RequestErrorCard.propTypes = {
  error: PropTypes.object,
  errorAction: PropTypes.func,
}

export default RequestErrorCard

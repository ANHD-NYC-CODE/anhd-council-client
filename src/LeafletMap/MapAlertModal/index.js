import React, { useState } from 'react'
import PropTypes from 'prop-types'

import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import { Button, Alert } from 'react-bootstrap'
import { spaceEnterKeyDownHandler } from 'shared/utilities/accessibilityUtils'
import './style.scss'

const MapAlertModal = props => {
  const [isLoading, toggleLoading] = useState(false)

  const handleClick = e => {
    e.preventDefault()
    toggleLoading(true)
    props.action()
  }

  return (
    <div className="map-alert-modal">
      <Alert className="map-alert-modal__alert" variant={props.alertVariant}>
        <span className="map-alert-modal__text">{props.alertMessage}</span>
        <Button
          className="btn-loader"
          variant="primary"
          size="sm"
          onClick={handleClick}
          onKeyDown={e => spaceEnterKeyDownHandler(e, e => handleClick(e))}
        >
          {props.alertCta}
          <div className="button-loader__container">{isLoading && <SpinnerLoader size="20px" />}</div>
        </Button>
      </Alert>
    </div>
  )
}

MapAlertModal.propTypes = {
  action: PropTypes.func,
  alertMessage: PropTypes.string,
  alertVariant: PropTypes.string,
  alertCta: PropTypes.string,
}
MapAlertModal.defaultProps = {
  alertVarient: 'light',
  alertCta: 'Ok',
}

export default MapAlertModal
